import _ 								from 'lodash';
import React, { useEffect, useState } 	from 'react';
import theme from 'src/theme';

// Global Components
import Grid 							from '@mui/material/Unstable_Grid2';
import { Box, Paper, TextField } 				from '@mui/material';
import paletteColors 					from 'src/theme/paletteColors';
import StandaloneButton 				from 'src/components/buttons/standalone-button';
import { guid, obvuscate }              from 'src/utils/utils';
import JumpTag                          from '../../checkout/components/status-parts/jump-tag';
import ModalDialog, { ContentDialog, TwoButtonDialog } from 'src/components/display/modal-dialog/modal-dialog';
import { profileStyles } from './profile/profile-styles';

function DrawProfileField(props: { isEditable: boolean; profileField: IProfileField; onSave?: Function }) {
	const { isEditable, onSave } = props;
	const { fieldName, fieldTitle, fieldValue, placeholderText, validationRegex, helperText, inputType } = props.profileField;

	const [newFieldValue, setNewFieldValue] 		= useState(fieldValue);
	const [isEditing, setIsEditing] 				= useState(false);
	const [activeHelperText, setActiveHelperText]	= useState("");

	const setupEdit = () => {
		if (isEditing) {
			if(validationRegex) {
				const isValid = validationRegex.test(newFieldValue);
				if(isValid) {
					setIsEditing(false);
					onSave?.call(this, { fieldName: fieldName, fieldValue: newFieldValue });
				} else {
					setIsEditing(true)
					setActiveHelperText(helperText || "");
				}
			} else {
			setIsEditing(false);
			onSave?.call(this, { fieldName: fieldName, fieldValue: newFieldValue });
			}
		} else setIsEditing(true);
	};

	const validateUpdate = (event: any) => {
		setNewFieldValue(event.target.value);
	};

	return (
		<Grid container width="100%" sx={{display:"flex", alignItems:'start !important'}} className="whereThis">
			<Grid xs={3} sx={profileStyles.fieldTitleLabel} textAlign="start" justifyContent="start" display="flex">
				{fieldTitle}
			</Grid>
			<Grid xs={isEditable ? 7 : 9} display={'flex'} justifyContent={'start'} sx={profileStyles.fieldValue}>
				{isEditing
					? (<TextField
							variant		="outlined"
							fullWidth
							sx			={{ color: paletteColors.black }}
							type		={inputType || 'text'}
							placeholder	={placeholderText || fieldValue}
							label		={''}
							value		={newFieldValue}
							onChange	={(event: any) => validateUpdate(event)}
							helperText	={activeHelperText}
						/>)
					: (
						<Box sx = {profileStyles.fieldValue}>
							{inputType == 'password' ? obvuscate(newFieldValue) : newFieldValue}
						</Box>
					)
				}
			</Grid>
			{isEditable && (
				<Grid xs={2}>
					<StandaloneButton
						buttonText={isEditing ? 'Save' : 'Edit'}
						buttonColor={paletteColors.lightGrey}
						buttonClick={() => setupEdit()}
						sx={profileStyles.editSaveButton}
					/>
				</Grid>
			)}
		</Grid>
	);
}

export interface IProfileField {
	fieldName: string;
	fieldTitle: string;
	fieldValue: string;
	placeholderText?: string;
	validationRegex?: RegExp;
	helperText?:string;
	isEditable: boolean;
	inputType?: string;
}

const profileFields: IProfileField[] = [
	{
		fieldName: 'memberNumber',
		fieldValue: '6053 6500 1101 01822 681',
		fieldTitle: 'Member Number',
		isEditable: false,
	},
	{
		fieldName: 'memberName',
		fieldValue: 'Pete Sherman',
		fieldTitle: 'Name',
		isEditable: true,
	},
	{
		fieldName: 'memberEmail',
		fieldValue: 'pete.sherman@email.com',
		fieldTitle: 'Email',
		isEditable: true,
	},
	{
		fieldName: 'memberMobile',
		fieldValue: '0412 345 678',
		fieldTitle: 'Mobile Number',
		isEditable: true,
	},
	{
		fieldName: 'memberAddress',
		fieldValue: '42 Wallaby Way, Sydney NSW 2000',
		fieldTitle: 'Address',
		isEditable: true,
	},
	{
		fieldName: 'memberDOB',
		fieldValue: '01/04/2000',
		fieldTitle: 'Birthday',
		// validationRegex: /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/,
		// helperText: "DD/MM/YYYY",
		isEditable: false,
	},
	{
		fieldName: 'memberPassword',
		fieldValue: 'abc123',
		fieldTitle: 'Password',
		inputType: 'password',
		isEditable: true,
	},
];

export function DrawProfile() {
	const [deleteDialogOpen,setDeleteDialogOpen] = useState(false);
	/**
	 * Fires when the Save button is used after edit
	 * @param savedField {fieldName,fieldValue}
	 */
	function updateField(savedField: any) {
		console.log('sv: ', savedField);
	}
	/**
	 * Called when Logout Tag is clicked
	 */
	function doLogout() {
		console.log("Do Logout");
	}
	/* Called when Logout Tag is clicked
	*/
   function doDelete() {
		setDeleteDialogOpen(false);
		console.log("Do Delete");
   }

	return (
		<Grid container width={'100%'} className="theme" mt={2}>
			<Grid container width={'100%'} sx={profileStyles.gridContainer} className="profile">
				<Paper sx={{padding:{xs:"4px", sm:"12px"},borderRadius:"12px"}}>
					<Grid container width={'100%'}>
						{profileFields.map((fld) => {
							return (
								<Grid key={guid()} xs={12} width={'100%'} className="justifyGridCenter">
									<DrawProfileField isEditable={fld.isEditable} onSave={updateField} profileField={fld} />
								</Grid>
							);
						})}
					</Grid>
				</Paper>
			</Grid>
			<Grid container width={'100%'} sx={profileStyles.gridContainer}>
				<JumpTag text={'Logout'} onClick={()=>doLogout()} sxProps={{width:{xs:"100%",sm:"90%"}}}/>
			</Grid>
			<Grid container width={'100%'} sx={profileStyles.gridContainer}>
				<JumpTag text={'Delete'} onClick={()=>setDeleteDialogOpen(true)}  sxProps={{color:paletteColors.red, width:{xs:"100%", sm:"90%"}}}/>
			</Grid>
			<TwoButtonDialog 
				isOpen={deleteDialogOpen} 
				onClose={()=>setDeleteDialogOpen(false)} 
				title={'Confirm Delete'} 
				content={"Are you sure you want to delete your account?"} 
				buttonOneText={"Confirm"}
				buttonTwoText={"Cancel"}
				buttonOneClick={()=>doDelete()}
				buttonOneSxProps={{height:"50px !important",width:"200px !important"}}
				buttonTwoClick={()=>setDeleteDialogOpen(false)}
				buttonTwoSxProps={{height:"50px !important",width:"200px !important", backgroundColor:paletteColors.lightGrey, color:paletteColors.oportoBlack,"&:hover":{backgroundColor:paletteColors.grey}}}
			/>
		</Grid>
	);
}

// import _              from 'lodash';
// import React          from 'react';
// import {useState}     from 'react';
// import {useCallback}  from 'react';
// import {Autocomplete} from '@mui/material';
//
// interface ISearchInputProps
// {
//     items: ReadonlyArray<any>;
//     filter: (query: string) => void;
//     onSelect: (ctx: any) => void;
//     loading?: boolean;
//     loadingText?: string;
//     noResultsText?: string;
//     placeholder: string;
//     waitInterval?: number;
// }
//
// export default function SearchInput(props: ISearchInputProps) {
//     const [inputValue, setInputValue] = useState('');
//
//     const debouncedInput = useCallback(_.debounce((query) => {
//         return props.filter(query);
//     }, props.waitInterval || 500), []);
//
//     const updateValue = (value: string): void => {
//         setInputValue(value);
//         debouncedInput(value);
//     };
//
//     const content = props.loading
//         ? (<li>{props.loadingText || 'Loading...'}</li>)
//         : (
//             _.isEmpty(props.items)
//                 ? (<li>{props.noResultsText || 'No Results'}</li>)
//                 : props.items.map((value, index) => (
//                     <li
//                         key={`${value.API}-${index}`}
//                         onClick={() => props.onSelect(value.Link)}
//                     >
//                         {value.API}
//                     </li>
//                 ))
//         )
//     ;
//
//     return (
//         // <Autocomplete renderInput={} options={}/>
//         <div>
//             <input
//                 value={inputValue}
//                 onChange={(e: any) => updateValue(e.target.value)}
//                 placeholder={props.placeholder}
//             />
//
//             <div>
//                 <ul>
//                     {content}
//                 </ul>
//             </div>
//         </div>
//     );
// }

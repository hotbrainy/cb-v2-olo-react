import { Box } from "@mui/material";
import Grid                 from '@mui/material/Unstable_Grid2';
import _ from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Page from "src/components/page";
import useConfig from "src/components/useConfig";
import { useAppDispatch } from "src/store";
import { clearBasket, orderTypeToMenuType, setOrderType } from "src/store/basket";
import { apiGetCategories, clearCategories, selectCategories, selectCategoryProducts, setCurrentCategory } from "src/store/categories";
import { setCurrentProduct } from "src/store/products";
import { apiGetStores, setCurrentStore } from "src/store/stores";
import { messageService } from "src/utils/message-service-bus";

/*** FLAG to allow debugging to not jump off the page */
const DO_NAVIGATE = true;

export function DeepLinker(){
	const params = useParams();
    const config   = useConfig();
    const navigate = useNavigate();
    const { storeName, categoryName, orderType, productName } = params;

    const dispatch = useAppDispatch();
    // Redux states
    const appState          = useSelector((state: any) => state.app);
    const basketState       = useSelector((state: any) => state.basket);
    const categoriesState   = useSelector((state: any) => state.categories);
    const storesState       = useSelector((state: any) => state.stores);
    const categories        = useSelector((state: any) => selectCategories(state));

    const {stores, currentStore}   = storesState;
    const { currentCategory } = categoriesState;

    const products          = useSelector((state: any) => {
        const theProducts = currentCategory ? selectCategoryProducts(state, currentCategory.id) : null;
        return theProducts;
    });
    // const {currentProduct} = useSelector((state: any) => state.products);

    const [statusMessage,setStatusMessage] = useState("Looking for store...");

    const [foundStore,setFoundStore] = useState<IStore | null>(null);
    const [foundCategory,setFoundCategory] = useState<IProductCategory | null>(null);
    const [foundProduct,setFoundProduct] = useState<IProduct | null>(null);
    const [failed,setFailed] = useState(false);

    function clearStoreData(){
        dispatch(clearBasket(null));
        dispatch(clearCategories(null));
        dispatch(setOrderType(orderType || null));
    }

    useEffect(()=>{
        clearStoreData();
    },[])

    /*** region: select store */
    function setStore(store: IStore): void {
        setFoundStore(store);
        setStatusMessage("Looking through menu...")

        dispatch(setCurrentStore(store));

        const menuType = orderTypeToMenuType(orderType as OrderType);
        const storeId = store.id;
        console.log("gc: ", store);
        dispatch(apiGetCategories({config, storeId, menuType}));
    }

    function setCategory(category:IProductCategory) {
        setFoundCategory(category);
        if(!isSame(currentCategory.name,category.name)) dispatch(setCurrentCategory(category));
        setStatusMessage(!_.isEmpty(productName) ? "Finding product..." : "Opening menu...");
    }

    function isSame(str1:string, str2?:string) {
        return (str1 || "").toLowerCase() === (str2 || "").toLowerCase()
    }

	useEffect(()=>{
        if(currentStore) {
            if(isSame(currentStore.storeName,storeName)) setStore(currentStore);
        } else {
            if(_.isEmpty(foundStore)){
                if(stores) {
                    const result = stores.find((str:any)=>str.storeName===storeName);
                    if(!_.isEmpty(result)) setStore(result)
                }
                const fetchStore = async () => {
                    if (storeName) {
                        const result = await dispatch(apiGetStores({config}));
                    }
                };
                fetchStore();
            }
        }
	},[foundProduct, foundStore, foundCategory, orderType])

    useEffect(()=>{
        if(_.isEmpty(foundProduct) && !failed){
            if(_.isEmpty(foundStore)){
                if(stores) {
                    const result = stores.find((str:any)=>(isSame(str.storeName,storeName)));
                    if(!_.isEmpty(result)) {
                        setStore(result)
                        setStatusMessage("Store found...");
                    } else {
                        setFailed(true);
                        setStatusMessage("Store not found...");
                    }
                }
            } else {
                if(_.isEmpty(foundCategory)){
                    if(!_.isEmpty(categories)) {
                        const result = categories.find((cat:IProductCategory)=>(isSame(cat.name,categoryName)));
                        if(!_.isEmpty(result)) {
                            setStatusMessage("Category found...");
                            setCategory(result);
                            if(_.isEmpty(productName||"")) {
                                console.log("Found category, no product so go: ");
                                if(DO_NAVIGATE) navigate('/menu');
                            }
                        } else {
                            setFailed(true);
                            setStatusMessage("Category not found...");
                        }
                    }
                } else {
                    if(_.isEmpty(productName||"")) {
                        if(DO_NAVIGATE) navigate('/menu');
                    } else {
                        const result = ( products || []).find((prd:IProduct)=>isSame(prd.name,productName)) || null;
                        if(result){
                            setFoundProduct(result);
                            dispatch(setCurrentProduct(result));
                            // Broadcast a message to any subscribers
                            messageService.emit({
                                subject: "products/currentProduct.updated",
                                context: { result },
                            });
                            if(DO_NAVIGATE) navigate('/menu?dl=1');
                        } else {
                            setStatusMessage("Product Not Found...");
                            setFailed(true);
                        }
                    }
                }
            }
        }
    },[stores, products, categories])

	return (
        <Page>
            <Grid sx={{justifyContent: "center", display: "flex", alignItems: "center",fontFamily: 'Comic Book',fontSize: "32px"}}>
            {!_.isEmpty(foundProduct)
        		? <Box>{foundProduct.name}</Box>//<ProductWrapper prod={foundProduct} />
        		: <Box>{statusMessage}</Box>
            }
            </Grid>
        </Page>
    )
}
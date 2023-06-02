import * as React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import ProductButton from "src/components/buttons/product-button";
import { useSelector } from "react-redux";
import { fonts } from "src/shared/styles";
import paletteColors from "src/theme/paletteColors";
import { selectCategoryProducts } from "src/store/categories";
import { useAppDispatch } from "src/store";
import { messageService } from "src/utils/message-service-bus";
import { setCurrentProduct } from "src/store/products";

export interface IProductsViewProps {
  currentCategory: IProductCategory | null;
}
const styles = {
  sectionTitle: {
    ...fonts.portuguesa,
    fontWeight: 900,
    fontSize: "40px",
    lineHeight: "48px",
    color: paletteColors.black,
  },
  gridWrapper: {
    maxWidth              : "100vw",
    mpb                   : 0,
    marginLeft            : {xs:"auto",sm:"unset"},
    marginRight           : {xs:"auto",sm:"unset"},
    rowGap                : {xs:0, sm:0},
    height                : "100%",
  },
};

export default function ProductsView(props: IProductsViewProps) {
  const { currentCategory } = props;
  const dispatch = useAppDispatch();

  // const [products, setProducts] = React.useState<IProduct[]>([]);
  const products = useSelector((state: any) => {
    const theProducts = currentCategory ? selectCategoryProducts(state, currentCategory.id) : null;
    return theProducts;
  });

  // Selected Product
  // const {currentProduct} = useSelector((state: any) => state.products);

  function selectProduct(product: IProduct | null): void {
    dispatch(setCurrentProduct(product));

    // Broadcast a message to any subscribers
    messageService.emit({
      subject: "products/currentProduct.updated",
      context: { product },
    });
  }
  return (
    <Grid container spacing={4} sx={{ mpb: 0 }} justifyContent={{ xs: "center", sm: "start" }}>
      {(products || []).map((product: IProduct) => (
          <Grid
            display="flex"
            justifyContent={{ xs: "center" }}
            width={{ xs: "340px", sm: "290px" }}
            height={{ xs: "unset", sm: 480 }}
            key={product.id}
            xs={12}
            md={4}
          >
            <Box sx={{ cursor: "pointer" }} width={"100%"} onClick={() => selectProduct(product)}>
              <ProductButton
                product={product}
                sx={{
                  width: "100%",
                  height: "auto !important",
                }}
              />
            </Box>
          </Grid>
        ))}
    </Grid>
  );
}

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { ProductsView } from "../../../../components/views/products/ProductsView";
import { getData } from "../../../../services/getData";

const Products = async () => {
  const productsData = await getData("products");

  return (
    <PageWrapper pageName="Products" dataForExport={productsData}>
      <ProductsView products={productsData} />
    </PageWrapper>
  );
};

export default Products;

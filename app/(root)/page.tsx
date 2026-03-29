import ProductList from "@/components/product/product-list";
import sampleData from "@/lib/sampledata";

const HomePage = async () => {
  return (
    <div>
      <ProductList data={sampleData.products} title="new arrivals" limit={6} />
    </div>
  );
};

export default HomePage;

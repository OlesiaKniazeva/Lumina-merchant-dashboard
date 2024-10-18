import ProductCard from '../components/ProductCard';
import Layout from '../layouts/layout';

function HomePage() {
  return (
    <Layout>
      <ProductCard
        imageUrl="https://basket-03.wbbasket.ru/vol289/part28911/28911663/images/big/1.webp"
        title="Product 1 hjghjghjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
        originalPrice={100}
        viewCount={100}
        likeCount={100}
      />
    </Layout>
  );
}

export default HomePage;

import { NextPage } from 'next';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/product';
import db from '../utils/db';
import { Store } from '../utils/Store';

const Home: NextPage<{ products: any }> = ({ products }) => {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product: any) => {
    const existItem = state.cart.cartItems.find((x: any) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry, Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product,
        quantity,
      },
    });
    toast.success('Product added to the cart');
  };
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export default Home;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

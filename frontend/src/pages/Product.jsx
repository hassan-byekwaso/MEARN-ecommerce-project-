import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    const item = products.find(i => i._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  }

  useEffect(() => { fetchProductData(); }, [productId, products]);

  return productData ? (
    <div className='pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100'>
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
          <div className='flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img src={item} key={index} onClick={() => setImage(item)} className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${image === item ? 'border-2 border-orange-500' : ''}`} alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        
        <div className='flex-1'>
          <h1 className='mt-2 text-2xl font-medium'>{productData.name}</h1>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          
          <div className='flex flex-col gap-4 my-8'>
            <p className='font-bold'>Select Quantity / Weight</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button key={index} onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 rounded-md ${item === size ? 'border-orange-500 bg-orange-50' : ''}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <button onClick={() => addToCart(productData._id, size)} className='px-8 py-3 text-sm text-white bg-black active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='flex flex-col gap-1 mt-5 text-sm text-gray-500'>
            <p>100% Fresh & Quality Guaranteed.</p>
            <p>Cash on delivery available in Kibra.</p>
            <p>Easy 24-hour return policy for perishables.</p>
          </div>
        </div>
      </div>
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;
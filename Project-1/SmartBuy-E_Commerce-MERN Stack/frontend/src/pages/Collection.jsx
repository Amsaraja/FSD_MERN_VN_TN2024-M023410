import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Collection = () => {
  const {products, search, setSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    if(search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if(subcategory.length > 0){
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }
  useEffect(()=>{
    applyFilter();
  }, [category, subcategory, search, products])
  useEffect(()=>{
    sortProduct();
  }, sortType)
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/*Filter options */}
      <div className='min-w-60'> 
      <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p> 
      <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
      {/* Search Bar */}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>SEARCH</p>
        <div className='flex items-center border border-gray-400 px-3 py-2 rounded'>
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 outline-none bg-inherit text-sm' 
            type='text' 
            placeholder='Search products...'
          />
          <img className='w-4' src={assets.search_icon} alt='' />
        </div>
      </div>
      {/* Category Filter */} 
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}> 
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Electronics'}/>Electronics</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Home'}/>Home & Kitchen</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Men'}/>Men's Fashion</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Women'}/>Women's Fashion</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Books'}/>Books & Media</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Sports'}/>Sports & Outdoors</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Beauty'}/>Beauty & Care</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Automotive'}/>Automotive</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Pets'}/>Pet Supplies</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Baby'}/>Baby & Kids</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Toys'}/>Toys & Games</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Health'}/>Health & Wellness</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Office'}/>Office Supplies</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Garden'}/>Garden & Outdoor</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Music'}/>Musical Instruments</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Grocery'}/>Grocery & Gourmet</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleCategory} value={'Industrial'}/>Industrial & Scientific</p>
        </div>
      </div>
      {/* Subcategory filters */}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}> 
        <p className='mb-3 text-sm font-medium'>TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Smartphones'}/>Smartphones</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Laptops'}/>Laptops</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Audio'}/>Audio</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Kitchen'}/>Kitchen</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Cleaning'}/>Cleaning</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Topwear'}/>Topwear</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Bottomwear'}/>Bottomwear</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Footwear'}/>Footwear</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Accessories'}/>Accessories</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Fitness'}/>Fitness</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Outdoor'}/>Outdoor</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Skincare'}/>Skincare</p>
          <p className='flex gap-2'><input className='w-3' type="checkbox" onChange={toggleSubCategory} value={'Makeup'}/>Makeup</p>
        </div>
      </div>
      </div>
      {/*Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'PRODUCTS'}></Title>
          {/*Product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2" >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/*Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index)=>(
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.images} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection;

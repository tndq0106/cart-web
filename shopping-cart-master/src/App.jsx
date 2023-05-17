
import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Layout, Popover, Typography, Image, Row, Col, Select } from 'antd'
import { SearchOutlined, ShoppingCartOutlined, FrownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { fetchProduct } from './actions/productsAction'
import { isEmpty } from './functions/isEmpty'
import Product from './components/Products'
import './App.scss'

const Cart = lazy(() => import('./components/Cart'))

const { Header } = Layout;
const { Text } = Typography;
const { Option } = Select

const styleMid = {
   height: '100%',
   display: 'flex',
   alignItems: 'center'
}

const App = () => {
   const dispatch = useDispatch();
   const stateProducts = useSelector(state => state.productsReducer);
   const stateCart = useSelector(state => state.cartReducer);
   const [total, setTotal] = useState(null);
   const [productFilter, setProductFilter] = useState([]);
   const [isSearch, setIsSearch] = useState(false);

   const [valueOption, setValueOption] = useState('All');

   useEffect(() => {
      dispatch(fetchProduct());
      return () => { }
   }, [dispatch])


   useEffect(() => {
      const valueStorage = localStorage.getItem('carts');
      const reduceTotal = valueStorage
         ? JSON.parse(localStorage.getItem('carts')).reduce((acc, val) => {
            return acc + val.price;
         }, 0) : 0;

      setTotal(reduceTotal);
      return () => { }
   }, [dispatch, stateCart])

   useEffect(() => {
      setProductFilter(stateProducts);
      return () => { }
   }, [stateProducts])

   const handleChange = (e) => {
      setIsSearch(true);
      const value = e.target.value,
         res = stateProducts.filter(val => {
            const name = val.name.slice(0, val.name.indexOf(" "));
            return name.toLowerCase().includes(value.toLowerCase())
         });
      setProductFilter(res);
   }

   const changeOption = value => setValueOption(value);

   return (
      <Layout>
         <Header>
            <Row align='middle' justify='space-between'>
               <Col span={8}>
                  <Image
                     width={120}
                     src="./assets/Veggy.png"
                  />
               </Col>

               <Col span={8} style={styleMid}>
                  <Input onChange={handleChange} addonAfter={<SearchOutlined />} placeholder="Search Products" />
               </Col>

               <Col span={8} style={{
                  display: "flex",
                  justifyContent: "flex-end"
               }}>
                  <Popover placement="bottomRight"
                     title={stateCart.length === 0
                        ? <Text> Your Cart Is Empty <FrownOutlined /></Text>
                        : <Text>Total: {total} Vnd</Text>}
                     content={
                        <Suspense fallback={<p>Loading</p>}>
                           <Cart stateCart={stateCart} />
                        </Suspense>
                     } trigger="click">
                     <Button icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />} ghost />
                     <Button style={{
                        transform: 'translate(-2px, -16px)'
                     }} type='primary' danger shape="circle" size="small"> {stateCart.length}</Button>
                  </Popover>
               </Col>
            </Row>
         </Header>

         <div style={{
            display: "flex",
            justifyContent: "center"
         }}>
            <div style={{ width: 1125, marginTop: 16, marginLeft: 15 }}>
               <Select onChange={changeOption} defaultValue='All' style={{ width: 150, textAlign: "center" }}>
                  <Option value="All">All</Option>
                  <Option value="Vegetables">Vegetables</Option>
                  <Option value="Fruits">Fruits</Option>
                  <Option value="Nuts">Nuts</Option>
               </Select>
            </div>
         </div>

         {
            isEmpty(productFilter) && isSearch
               ? <Text style={{ textAlign: "center", padding: '20px 0' }}>No Result <FrownOutlined /></Text>
               : <Product products={productFilter} valueOption={valueOption} />

         }
      </Layout >
   )
}

export default App
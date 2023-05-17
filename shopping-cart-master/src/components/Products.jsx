
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../actions/cartAction'
import { Card, Layout, Row, Col, Button, Modal, Image, Typography } from 'antd'
import { isEmpty } from '../functions/isEmpty'
import Counter from './Counter'
import PropTypes from 'prop-types'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


const { Meta } = Card;
const { Content } = Layout;
const { Text } = Typography;

const Products = ({ products, valueOption }) => {
   const dispatch = useDispatch();
   const [loadingAddCart, setLoadingAddCart] = useState({
      loading: false,
      index: -1
   });
   const [propsProduct, setPropsProduct] = useState(null);
   const [valueModal, setValueModal] = useState({});
   const [valueInput, setValueInput] = useState(1);

   useEffect(() => {
      setPropsProduct(products)
      return () => { }
   }, [products])

   const handleShowModal = (obj) => setValueModal(obj);

   const handleAddCart = (product, price, index) => {
      if (valueInput * 1 === 0) {
         NotificationManager.error('Vui Long Dien So Luong San Pham', 'Them San Pham Loi', 5000)
      }
      else {
         dispatch(addCart(product, price, valueInput * price));
         setLoadingAddCart({
            loading: true,
            index
         });
      }
   }

   useEffect(() => {
      const res = valueOption === 'All' ? products : products.filter(val => val.category === valueOption.toLowerCase());
      setPropsProduct(res);
      return () => {
         const res = valueOption === 'All' ? products : products.filter(val => val.category === valueOption.toLowerCase());
         setPropsProduct(res);
      }
   }, [valueOption, products])

   return (
      <Layout>
         <Content>
            <Modal
               visible={!isEmpty(valueModal)}
               footer={false}
               onCancel={() => setValueModal({})}
               centered={true}
            >
               {
                  !isEmpty(valueModal) && <>
                     <Image style={{ width: '100%' }} src={valueModal.image} />
                     <Text>{valueModal.name}</Text>
                     <br />
                     <Text type='secondary'>{valueModal.price} Vnd</Text>
                  </>
               }
            </Modal>

            <div style={{
               display: "flex",
               justifyContent: "center"
            }}>

               <Row gutter={16} style={{
                  paddingTop: 16,
                  width: 1125,
               }}>

                  {
                     Array.isArray(propsProduct) && propsProduct.map((val, index) => (
                        <Col style={{ marginBottom: 18, flexBasis: '25%' }} key={val.id}>
                           <Card
                              hoverable
                              cover={<img alt={val.name} src={val.image} onClick={() => handleShowModal(val)} />}
                           >
                              <Meta style={{ textAlign: "center", marginBottom: 16 }} title={val.name} description={`${val.price} Vnd`} />

                              <Row>
                                 <Col span={24}>
                                    <Counter setValue={setValueInput} />
                                 </Col>
                              </Row>

                              <Button onClick={() => handleAddCart(val, val.price, index)} type="primary" danger block style={{ marginTop: 16 }}>
                                 {loadingAddCart.loading && loadingAddCart.index === index ? "Added" : "Add To Cart"}
                              </Button>
                           </Card>
                        </Col>
                     ))
                  }
               </Row>
            </div>

            <NotificationContainer />
         </Content>
      </Layout>
   )
}

Products.propTypes = {
   products: PropTypes.array,
   valueOption: PropTypes.string
}

export default React.memo(Products)
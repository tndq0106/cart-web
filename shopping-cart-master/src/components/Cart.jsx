
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCart, increCart, decreCart } from '../actions/cartAction'
import { Card, Typography, Avatar, Row, Col, Button } from 'antd'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const { Text } = Typography;

const Cart = ({ stateCart }) => {
   const dispatch = useDispatch();
   const stateProducts = useSelector(state => state.productsReducer);
   const indexProduct = (id) => stateProducts.findIndex(val => val.id === id);
   const handleRemoveCart = (id) => dispatch(removeCart(id));

   const handleIncre = (id) => dispatch(increCart(id, stateProducts[indexProduct(id)].price));
   const handleDecre = (id) => dispatch(decreCart(id, stateProducts[indexProduct(id)].price));

   return (
      <div>
         <Row>
            {
               stateCart.map((val) => (
                  <Col span={24} style={{ marginBottom: '10px' }} key={val.id}>
                     <Card hoverable>
                        <Row justify="space-between" align='middle'>
                           <Col span={15}>
                              <Row style={{ width: '100%' }}>
                                 <Col span={9}>
                                    <Avatar size='large' shape="square" src={val.image} />
                                 </Col>

                                 <Col span={15}>
                                    <Text>{val.name}</Text> <br />
                                    <Text type="secondary">{val.price} Vnd - {val.price / stateProducts[indexProduct(val.id)].price} Nos</Text>
                                 </Col>
                              </Row>
                           </Col>

                           <Col span={4}>
                              <Button onClick={() => handleDecre(val.id)} size='small' icon={< MinusOutlined />} />
                              <Button onClick={() => handleIncre(val.id)} size='small' icon={< PlusOutlined />} />
                           </Col>

                           <Col span={2}>
                              <Button type='text' danger onClick={() => handleRemoveCart(val.id)} icon={<CloseOutlined />} size='small' />
                           </Col>
                        </Row>
                     </Card>
                  </Col>
               ))
            }
         </Row>
      </div>
   )
}

Cart.propTypes = {
   stateCart: PropTypes.array
}

export default React.memo(Cart)

import React, { useState } from 'react'
import { Row, Col, Input } from 'antd'
import PropTypes from 'prop-types'

const Counter = ({ setValue }) => {
   const [valueInput, setValueInput] = useState(1);

   const changeInput = e => {
      const value = e.target.value;
      setValue(isNaN(value) ? '' : value);
      setValueInput(isNaN(value) ? '' : value);
   }

   return (
      <>
         <Row align='middle' justify='space-between'>
            <Col span={24}>
               <Input onChange={changeInput} value={valueInput} style={{ textAlign: "center" }} type='number' />
            </Col>
         </Row>
      </>
   )
}

Counter.propTypes = {
   setValue: PropTypes.func
}
export default Counter
import {
   ADD_CART,
   REMOVE_CART,
   INCRE_CART,
   DECRE_CART
} from './type'

export const addCart = (product, price, input) => {
   return dispatch => {
      dispatch({
         type: ADD_CART,
         product,
         price,
         input
      })
   }
}

export const increCart = (id, price) => {
   return dispatch => {
      dispatch({
         type: INCRE_CART,
         id,
         price
      })
   }
}

export const decreCart = (id, price) => {
   return dispatch => {
      dispatch({
         type: DECRE_CART,
         id,
         price
      })
   }
}

export const removeCart = (id) => {
   return dispatch => {
      dispatch({
         type: REMOVE_CART,
         id
      })
   }
}
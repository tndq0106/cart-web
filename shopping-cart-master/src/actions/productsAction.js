import axios from 'axios'
import {
   FETCH_PRODUCTS,
} from './type'

export const fetchProduct = () => {
   return async dispatch => {
      const api = "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
      const res = await axios.get(api);
      dispatch({
         type: FETCH_PRODUCTS,
         products: res
      })
   }
}
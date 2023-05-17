import {
   FETCH_PRODUCTS,
} from '../actions/type'

const initialState = {};

const productReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_PRODUCTS:
         return action.products.data;

      default:
         return state;
   }
}
export default productReducer
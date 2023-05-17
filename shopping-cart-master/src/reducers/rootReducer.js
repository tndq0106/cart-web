import {
   combineReducers
} from 'redux'
import productsReducer from './productReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
   productsReducer,
   cartReducer
})

export default rootReducer
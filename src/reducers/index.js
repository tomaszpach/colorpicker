import { combineReducers } from 'redux'
import colorsReducer from './colors'

export default combineReducers({
    colors: colorsReducer
})
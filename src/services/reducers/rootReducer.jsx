import { combineReducers } from 'redux';

// типы экшены
const GET_INGREDIENTS = 'GET_INGREDIENTS';
const ADD_INGREDIENT = 'ADD_INGREDIENT';
const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
const DELETE_INGREDIENTS_CONSTRUCTOR = 'DELETE_INGREDIENTS_CONSTRUCTOR';
const ADD_INGREDIENTS_CONSTRUCTOR = 'ADD_INGREDIENTS_CONSTRUCTOR';
const GET_ORDER = 'GET_ORDER';
const SET_TOTAL = 'SET_TOTAL';
const TOOGLE_INGREDIENTS_CONSTRUCTOR = "TOOGLE_INGREDIENTS_CONSTRUCTOR"


// начальные состояния
const ingredientsState = 
    { 
       productData : [],
       loading: true
    }
const ingredientState = 
    {
        data : [ ]
    }
const orderState = 
    {
        data : ""
    }
const ingredientsConstructorState = 
    {
        items : []
    }
const totalState = {
       total: 0
}
//экшены



// Редьюсеры
const totalReducer= (state = totalState, action) => { 
    switch(action.type) {
        case "SET_TOTAL":
            return {...state, total :  action.payload}
        default: return state
    } 
}
const  ingredientsReducer = (state = ingredientsState, action) => { 
    switch(action.type) {
        case "GET_INGREDIENTS":
            return {...state, productData: action.payload.productData, loading: action.payload.loading}
        
        default: return state
    } 
}
const  ingredientReducer = (state = ingredientState, action) => { 
    switch(action.type) {
        case "ADD_INGREDIENT":
            return {...state, data : action.payload}
        case "DELETE_INGREDIENT":
            return {...state, data : null}
        default: return state
    } 
}
const orderReducer = (state = orderState, action) => { 
    switch(action.type) {
        case 'GET_ORDER':
            return {...state, data : action.payload}
        default: return state
    } 
}
const ingredientsConstructorReducer = (state = ingredientsConstructorState , action) => { 
    switch(action.type) {
        case "ADD_INGREDIENTS_CONSTRUCTOR":
            return {...state, items :  action.payload}
        case "DELETE_INGREDIENTS_CONSTRUCTOR":
            return {...state, items :  action.payload}
        case "TOOGLE_INGREDIENTS_CONSTRUCTOR":
            return {...state, items :  action.payload}
        default: return state
    } 
}



export const RootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    ingredientsConstructor: ingredientsConstructorReducer,
    reducer: orderReducer,
    total: totalReducer,
}) 

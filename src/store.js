import { createStore } from "redux";
import cart from "./components/cart/cart";
import { saveState, loadState, sum } from './helpers'

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_BY_ID = "REMOVE_BY_ID";
export const ADD_TOPPING = "ADD_TOPPING";
export const REMOVE_TOPPING = "REMOVE_TOPPING";
export const CONFIRM_ORDER = "CONFIRM_ORDER";
export const REORDER = "REORDER";
export const CLEAR_CACHE = "CLEAR_CACHE";

const initialState = {
    restaurant: null,
    cart: [],
    order: []
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            return {
                ...state,
                restaurant: action.payload.restaurant.id,
                cart: [...state.cart, action.payload.menuItem]
            };
        }
        case REMOVE_FROM_CART: {
            if (state.cart.length >= 1) {
                return {
                    ...state,
                    restaurant: null,
                    cart: [
                        ...state.cart.slice(0, action.payload.index),
                        ...state.cart.slice(action.payload.index + 1),
                    ]
                };
            }

            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, action.payload.index),
                    ...state.cart.slice(action.payload.index + 1),
                ]
            };
        }
        case REMOVE_BY_ID: {
            let first = false
            if (state.cart.length >= 1) {
                return {
                    ...state,
                    restaurant: null,
                    cart: state.cart.filter(cartItem => {
                        if (cartItem.id !== action.payload.id) {
                            return cartItem
                        }

                        if (first && state.cart.length > 1) {
                            return cartItem
                        }

                        first = true
                    })
                };
            }

            return {
                ...state,
                cart: state.cart.filter(cartItem => {
                    if (cartItem.id !== action.payload.id) {
                        return cartItem
                    }

                    if (first && state.cart.length > 1) {
                        return cartItem
                    }

                    first = true
                })
            };
        }
        case ADD_TOPPING: {
            const updatedCart = state.cart.map((cartItem, index) => {
                if (index !== action.payload.index) {
                    return cartItem
                }

                return {
                    ...cartItem,
                    price: cartItem.price + action.payload.topping.price,
                    toppings: [
                        ...cartItem.toppings,
                        action.payload.topping
                    ]
                }
            })

            return {
                ...state,
                cart: updatedCart
            };
        }
        case REMOVE_TOPPING: {
            const updatedCart = state.cart.map((cartItem, index) => {
                if (index !== action.payload.cartIndex) {
                    return cartItem
                }

                return {
                    ...cartItem,
                    price: cartItem.price - action.payload.topping.price,
                    toppings:
                        [
                            ...cartItem.toppings.slice(0, action.payload.toppingIndex),
                            ...cartItem.toppings.slice(action.payload.toppingIndex + 1),
                        ]
                }
            })

            return {
                ...state,
                cart: updatedCart
            };
        }
        case CONFIRM_ORDER: {
            return {
                ...state,
                restaurant: null,
                cart: [],
                order: [
                    {
                        restaurant: state.restaurant,
                        cart: state.cart
                    }
                ]
            };
        }
        case REORDER: {
            return {
                ...state,
                restaurant: state.order[0].restaurant,
                cart: state.order[0].cart,
            };
        }
        case CLEAR_CACHE: {
            return {
                ...state,
                restaurant: null,
                cart: [],
                order: []
            };
        }
        default:
            return state;
    }
}


const persistedState = loadState()

const store = createStore(
    reducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    saveState(store.getState())
})

export default store

import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CLEAR_CART,
    CART_ADD_FAIL,
    CLEAR_ERRORS
} from "../constants/cartConstants";
import axios from "axios";
const proxy = process.env.REACT_APP_PROXY;

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: token
            }
        }
        const { data } = await axios.get(`${proxy}/api/v1/product/${id}`, config);

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity,
            },
        });

    } catch (error) {
        dispatch({
            type: CART_ADD_FAIL,
            payload: error.response.data.message,
        });
    }
};


// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => {
    localStorage.removeItem("cartItems");
    return {
        type: CLEAR_CART,
    };
};
// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemsByUserId, updateCart, deleteItemFromCart, resetCart } from './cartAPI';

const initialState = {
  cartItems: [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (productId) => {
    const response = await deleteItemFromCart(productId);
    return response.data;
  }
);


export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      //  const index = state.cartItems.findIndex(item => item.id === action.payload.id);
      //  if(index === -1){
      //    // item is not added to cart
      //    const newCart = {...action.payload, quantity:1};
      //    state.cartItems.push(newCart);
      //  }
      //  else{
      //    // item is already present in cart -> increase cart quantity
      //    state.cartItems[index].quantity += 1; 
      //  }
    },
   
    removeItem: (state, action) => {
      // state.cartItems = state.cartItems.filter((item)=> item.id!== action.payload);
    },
    updateQuantity: (state, action) => {
      // const{quantity, productId} = action.payload;

      // const index = state.cartItems.findIndex(item => item.id === productId);
      // state.cartItems[index].quantity = +quantity;
    
    },
    clearCart: (state, action)=>{
      state.cartItems = [];
    }
  },
  
  extraReducers: (builder) => {
    builder 
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.cartItems= action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.cartItems.findIndex(item=> item.id === action.payload.id);
        state.cartItems[index]= action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        const index = state.cartItems.findIndex(item=> item.id === action.payload.id);
        state.cartItems.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = [];
      });

  },
});

export const { addItem, removeItem, updateQuantity, clearCart} = cartSlice.actions;

export const selectCart = (state) => state.cart.cartItems;


export default cartSlice.reducer;

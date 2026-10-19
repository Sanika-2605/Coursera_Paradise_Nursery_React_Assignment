import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    checkoutMessage: '',
  },
  reducers: {
    // Coursera assignment standard action: addItem
    addItem: (state, action) => {
      const product = action.payload;
      const id = product.id || product.name;
      const existingItem = state.items.find(
        (item) => (item.id && item.id === id) || item.name === product.name
      );

      const numericPrice =
        typeof product.price === 'number'
          ? product.price
          : typeof product.cost === 'string'
          ? parseFloat(product.cost.replace('$', ''))
          : typeof product.price === 'string'
          ? parseFloat(product.price.replace('$', ''))
          : 0;

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          id: product.id || product.name,
          name: product.name,
          price: numericPrice,
          cost: product.cost || `$${numericPrice.toFixed(2)}`,
          quantity: 1,
        });
      }
      state.checkoutMessage = '';
    },

    // Coursera assignment standard action: removeItem
    removeItem: (state, action) => {
      const payload = action.payload;
      const target = typeof payload === 'object' ? payload.id || payload.name : payload;
      state.items = state.items.filter((item) => item.id !== target && item.name !== target);
      state.checkoutMessage = '';
    },

    // Coursera assignment standard action: updateQuantity
    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;
      const target = id || name;
      const item = state.items.find((entry) => entry.id === target || entry.name === target);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((entry) => entry.id !== target && entry.name !== target);
        } else {
          item.quantity = quantity;
        }
      }
      state.checkoutMessage = '';
    },

    // Convenience and alias actions for complete compatibility
    addToCart: (state, action) => {
      cartSlice.caseReducers.addItem(state, action);
    },
    removeFromCart: (state, action) => {
      cartSlice.caseReducers.removeItem(state, action);
    },
    increaseQuantity: (state, action) => {
      const payload = action.payload;
      const target = typeof payload === 'object' ? payload.id || payload.name : payload;
      const item = state.items.find((entry) => entry.id === target || entry.name === target);
      if (item) item.quantity += 1;
      state.checkoutMessage = '';
    },
    decreaseQuantity: (state, action) => {
      const payload = action.payload;
      const target = typeof payload === 'object' ? payload.id || payload.name : payload;
      const item = state.items.find((entry) => entry.id === target || entry.name === target);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((entry) => entry.id !== target && entry.name !== target);
        }
      }
      state.checkoutMessage = '';
    },
    clearCart: (state) => {
      state.items = [];
      state.checkoutMessage = '';
    },
    setCheckoutMessage: (state, action) => {
      state.checkoutMessage = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCheckoutMessage,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

export default cartSlice.reducer;

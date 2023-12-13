import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItemCartData } from "./Cart";

const initialState: { cart: IItemCartData[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IItemCartData>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      const itemIndex = state.cart.findIndex(
        (item) => item.pizzaId === action.payload,
      );
      state.cart.splice(itemIndex, 1);
    },
    incItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    claerCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  incItemQuantity,
  decItemQuantity,
  claerCart,
} = cartSlice.actions;

export default cartSlice.reducer;

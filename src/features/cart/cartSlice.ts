import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItemCartData } from './Cart';
import { RootStore } from '../../store';

const initialState: { cart: IItemCartData[] } = {
  cart: [],
};

// создание фрагмента глобольного состояния
const cartSlice = createSlice({
  name: 'cart', // имя фрагмента
  initialState,
  reducers: {
    // редьюсер ничего не возвращать. фишка Redux Toolkit
    // ! измененмя надо вносить проямо в !!state!!
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
      if (item.quantity === 0) {
        // * можно воспользоваться логикой удаления
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    claerCart(state) {
      state.cart = [];
    },
  },
});

// экспорт action creator
export const {
  addItem,
  deleteItem,
  incItemQuantity,
  decItemQuantity,
  claerCart,
} = cartSlice.actions;

// экспорт редьюсера
export default cartSlice.reducer;

// экспорт селекторов
// * когда селектор возвращает не примитив необходима мемоизация, иначе будет лишний ререндер
export const getSummary = createSelector(
  (state: RootStore) => state.cart.cart,
  (cart) =>
    cart.reduce(
      (total, item) => ({
        quantity: total.quantity + item.quantity,
        totalPrice: total.totalPrice + item.totalPrice,
      }),
      {
        quantity: 0,
        totalPrice: 0,
      },
    ),
);
export const getCart = (state: RootStore) => state.cart.cart;
export const getCartItem = (id: number) =>
  createSelector(
    (state: RootStore) => state.cart.cart,
    (cart) => cart.find((item) => item.pizzaId === id),
  );

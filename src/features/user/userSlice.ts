import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';
import { RootStore } from '../../store';

const initialState = {
  userName: '',
  status: 'idle',
  position: {
    latitude: 0,
    longitude: 0,
  },
  address: '',
  error: '',
};

function getPosition() {
  return new Promise<GeolocationPosition | GeolocationPositionError>(function (
    resolve,
    reject,
  ) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// создание асинхронного редьюсера
export const fetchAddress = createAsyncThunk(
  // тип действия 👇
  'user/fetchAddress',
  // асинхронная функция 👇
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    if (positionObj instanceof GeolocationPositionError) {
      throw positionObj;
    }
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);

// создание фрагмента глобольного состояния
const userSlice = createSlice({
  name: 'user', // имя фрагмента
  initialState,
  reducers: {
    // редьюсер ничего не возвращать. фишка Redux Toolkit
    // ! измененмя надо вносить проямо в !!state!!
    updateName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
      // редьюсер ничего не возвращать. фишка Redux Toolkit
    },
  },
  /**
   * extraReducers - это метод, который позволяет
   * добавлять редюсеры, которые будут обрабатывать
   * асинхронные действия.
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

// экспорт action creator
export const { updateName } = userSlice.actions;

// экспорт редьюсера
export default userSlice.reducer;

// экспорт селекторов
export const getName = (state: RootStore) => state.user.userName;
export const getUser = (state: RootStore) => state.user;

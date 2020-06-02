import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import destinationReducer from "./ducks/store/destinationSlice";

export const store = configureStore({
  reducer: {
    user: destinationReducer,
    destination: destinationReducer,
    stores: destinationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

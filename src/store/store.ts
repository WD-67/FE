// import authApi, { authReducer } from '@/api/auth';
import imageProductApi, { imageProductReducer } from "@/api/imageProduct";
import productApi, { productReducer } from "@/api/product";
import sizeApi, { sizeReducer } from "@/api/sizes";
import imagetintucApi, { ImagetintucReducer } from "@/api/imagetintuc";
import commentsApi, { CommentReducer } from "@/api/comment";
import tintucApi, { TintucReducer } from "@/api/tintuc";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import saleApi from "../api/sale/sale.api";
import paymentApi from "../api/payment";

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CommentApi from "@/api/comment";
import categoryApi, { categoryReducer } from "@/api/category";
import contactApi, { contactReducer } from "@/api/contact";
import informationApi, { informationReducer } from "@/api/information";
import roleApi, { roleReducer } from "@/api/role";
import customerApi, { customerReducer } from "@/api/customer";
import userApi, { userReducer } from "@/api/user";
import colorApi from "@/api/color";
import cartSlice from "./cart/cart.slice";
import orderApi from "@/api/order";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart", "auths"],
};
const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    [productApi.reducerPath]: productReducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [sizeApi.reducerPath]: sizeReducer,
    [imageProductApi.reducerPath]: imageProductReducer,
    [imagetintucApi.reducerPath]: ImagetintucReducer,
    [tintucApi.reducerPath]: TintucReducer,
    [commentsApi.reducerPath]: CommentReducer,
    [categoryApi.reducerPath]: categoryReducer,
    [contactApi.reducerPath]: contactReducer,
    [informationApi.reducerPath]: informationReducer,
    [userApi.reducerPath]: userReducer,
    [customerApi.reducerPath]: customerReducer,
    [roleApi.reducerPath]: roleReducer,
    [saleApi.reducerPath]: saleApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [colorApi.reducerPath]: colorApi.reducer,

    // [authApi.reducerPath]: authReducer
});
const middleware = [
    productApi.middleware,
    sizeApi.middleware,
    imageProductApi.middleware,
    imagetintucApi.middleware,
    tintucApi.middleware,
    commentsApi.middleware,
    categoryApi.middleware,
    contactApi.middleware,
    informationApi.middleware,
    userApi.middleware,
    customerApi.middleware,
    roleApi.middleware,
    paymentApi.middleware,
    saleApi.middleware,
    colorApi.middleware,
    orderApi.middleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middleware),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default persistStore(store);

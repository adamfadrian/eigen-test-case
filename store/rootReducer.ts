import { persistReducer, persistStore } from "redux-persist";
import detailArticleReducers from "./reducers/detailArticle"
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
}

// persist the reducer into browser storage
const rootReducer = persistReducer(persistConfig, detailArticleReducers)

// redux store with persisted reducer
const store = configureStore({
    reducer: rootReducer
})

const persistor = persistStore(store)

export { store, persistor };
//  type for useSelector
export type RootState = ReturnType<typeof store.getState>;
export default store;

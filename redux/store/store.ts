import { persistReducer, persistStore } from "redux-persist";
import detailArticleReducers from "../reducers/detailArticle"
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = persistReducer(persistConfig, detailArticleReducers)

const store = configureStore({
    reducer: rootReducer
})

const persistor = persistStore(store)

// Export both store and persistor
export { store, persistor };

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;

// Default export only store
export default store;

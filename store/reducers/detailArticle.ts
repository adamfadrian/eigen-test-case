import { Articles } from "lib/hooks/useArticle";
import { ReducerPayload } from "./../type/ReducerPayload";
import { createSlice } from "@reduxjs/toolkit";

interface detailArticleState {
  article?: Articles;
}

const detailArticleInitialState: detailArticleState = {
  article: undefined,
};

const detailArticleSlice = createSlice({
  name: "detail",
  initialState: detailArticleInitialState,
  reducers: {
    setDetail(state, { payload }: ReducerPayload<Articles>) {
      state.article = { ...payload };
    },
    clearDetail(state) {
      state.article = undefined;
    },
  },
});

const detailArticleReducers = detailArticleSlice.reducer;

export const { setDetail, clearDetail } = detailArticleSlice.actions;
export default detailArticleReducers;

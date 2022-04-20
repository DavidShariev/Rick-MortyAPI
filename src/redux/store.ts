import { applyMiddleware, createStore } from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import { reducer } from "./reducer";
import { TypeActions } from "./types/actionTypes";


export type TypeReducer = ReturnType<typeof reducer>;

export const store = createStore<TypeReducer, TypeActions, {}, {}>(
    reducer,
    applyMiddleware(thunk as ThunkMiddleware<TypeReducer, TypeActions>)
)
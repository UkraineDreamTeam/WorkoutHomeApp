import { configureStore } from '@reduxjs/toolkit';import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';import { reducer as exercises } from './exercises/exercises.slice';import { reducer as exerciseActions } from './exerciseActions/exerciseActions.slice';export const store = configureStore({  reducer: { exercises, exerciseActions },});// Infer the `RootState` and `AppDispatch` types from the store itselfexport type RootState = ReturnType<typeof store.getState>;// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}export type AppDispatch = typeof store.dispatch;export const useAppDispatch: () => AppDispatch = useDispatch;export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
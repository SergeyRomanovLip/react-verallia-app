import { SHOW_LOADER, UPDATE_DB_STATE, GET_DB_STATE, HIDE_LOADER } from './types'

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [UPDATE_DB_STATE]: (state, { payload }) => ({ ...state, payload }),
  [GET_DB_STATE]: (state, { payload }) => ({ ...state, payload }),
  DEFAULT: (state) => {
    return state
  },
}

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}

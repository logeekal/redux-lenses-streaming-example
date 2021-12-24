import { Reducer } from "redux";

import { SessionState } from "../config/state";
import { Action } from "../actions";

export const INITIAL_STATE: SessionState = {
  heartbeatCount: 0,
  messages: [],
  host: "localhost:3030",
  user: "",
  password: "",
  token: undefined,
  loginStatus: false,
  conn: undefined
};

export const sessionReducer: Reducer<SessionState, Action> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "UPDATE_HOST":
      return { ...state, host: action.payload };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "UPDATE_TOKEN":
      return { ...state, token: action.payload };
    case "UPDATE_LOGIN_STATUS":
      return { ...state, loginStatus: action.payload };
    case "CLEAR_MESSAGES":
      return { ...state, messages: [] };
    case "SHOW_ROW_DETAILS":
      return { ...state, message: action.payload };
    case "MESSAGE_RECEIVED":
      return { ...state, messages: [...state.messages, action.payload] };
    case "CONN":
      return {...state, conn: action.payload};
    case "LOGOUT":
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

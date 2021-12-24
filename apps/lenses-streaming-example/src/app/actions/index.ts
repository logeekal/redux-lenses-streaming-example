import { ThunkAction } from "redux-thunk";
import { Message, State } from "../config/state";

export const updateHost = (payload: string) =>
  ({
    type: "UPDATE_HOST",
    payload,
  } as const);

export const updateUser = (payload: string) =>
  ({
    type: "UPDATE_USER",
    payload,
  } as const);

export const updatePassword = (payload: string) =>
  ({
    type: "UPDATE_PASSWORD",
    payload,
  } as const);

export const clearMessages = () =>
  ({
    type: "CLEAR_MESSAGES",
  } as const);

export const showRowDetails = (payload: Message) =>
  ({
    type: "SHOW_ROW_DETAILS",
    payload,
  } as const);

export const messageReceived = (payload: Message) =>
  ({
    type: "MESSAGE_RECEIVED",
    payload,
  } as const);

export const updateToken = (token: string | undefined) =>
  ({
    type: "UPDATE_TOKEN",
    payload: token,
  } as const);

export const updateLoginState = (status: boolean) =>
  ({
    type: "UPDATE_LOGIN_STATUS",
    payload: status,
  } as const);

export const logout = () =>
  ({
    type: "LOGOUT",
    payload: "",
  } as const);

export const actions = {
  updateHost,
  updateUser,
  updatePassword,
  clearMessages,
  showRowDetails,
  messageReceived,
  updateToken,
  updateLoginState,
  logout,
};

export type Action = ReturnType<typeof actions[keyof typeof actions]>;

export const doLogin =
  (): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    const { session } = getState();
    try {
      const response = await fetch("http://localhost:3030/api/login", {
        method: "POST",
        body: JSON.stringify({
          user: session.user,
          password: session.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = await response.text();
      dispatch(updateToken(token));
      dispatch(updateLoginState(true))
    } catch (e) {
      dispatch(updateLoginState(false));
    }
  };

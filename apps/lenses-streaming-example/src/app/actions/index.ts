import { ThunkAction } from "redux-thunk";
import { AuthStatus, Message, State } from "../config/state";

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

export const updateLoginState = (
  status: AuthStatus["status"],
  error: AuthStatus["error"]
) =>
  ({
    type: "UPDATE_LOGIN_STATUS",
    payload: {
      status,
      error,
    },
  } as const);

export const logout = () =>
  ({
    type: "LOGOUT",
    payload: "",
  } as const);

export const setConnection = (payload: WebSocket) =>
  ({
    type: "CONN",
    payload,
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
  setConnection,
};

export type Action = ReturnType<typeof actions[keyof typeof actions]>;

// async action creators
export const openConnection =
  (path: string, payload: string): ThunkAction<void, State, unknown, Action> =>
  (dispatch, getState) => {
  const {
    session: { host, conn : mainConnection },
    } = getState();
    if(mainConnection) mainConnection.close()
    const conn = new WebSocket(`ws:\/\/${host}/${path}`);
    conn.onopen = () => {
      conn.send(payload);
    };
    conn.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "RECORD") {
        dispatch(messageReceived(data.data));
      }
    };
    dispatch(setConnection(conn));
  };

// async action creators
export const doLogin =
  (): ThunkAction<void, State, unknown, Action> =>
  async (dispatch, getState) => {
    const { session } = getState();
    try {
      const response = await fetch(`http:\/\/${session.host}/api/login`, {
        method: "POST",
        body: JSON.stringify({
          user: session.user,
          password: session.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const token = await response.text();
        dispatch(updateToken(token));
        dispatch(updateLoginState("SUCCESS", undefined));
      } else {
        switch (response.status) {
          case 401:
            dispatch(
              updateLoginState(
                "FAILED",
                "Invalid Credentials. Please try again"
              )
            );
            break;
          default:
            dispatch(updateLoginState("FAILED", "Unknown Error Occured"));
        }
      }
    } catch (e) {
      dispatch(updateLoginState("FAILED", "Unknown Error occured"));
    }
  };

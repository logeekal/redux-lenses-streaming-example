// Feel free to improve on the types, based on what the server is sending back
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Message = any;

export interface AuthStatus {
    status: "SUCCESS" | "FAILED" | "IDLE",
    error: undefined | string
}

export type SessionState = {
    heartbeatCount: number;
    messages: Message[];
    host: string;
    user: string;
    password: string;
    message?: Message;
    token: undefined | string,
    auth: AuthStatus,
    conn: undefined | WebSocket
}

export type State = {
    session: SessionState;
}


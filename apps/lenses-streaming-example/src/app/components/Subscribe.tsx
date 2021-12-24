import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import classnames from "classnames";
import { actions, openConnection } from "../actions";
import Button from "./Button";
import { Message, State } from "../config/state";

export type SubscribeStateProps = {
  messages: string[];
};

export type SubscribeProps = {
  clearMessages: () => void;
  path: string;
  maxRecords?: number;
};

const _Subscribe: React.FC<
  SubscribeProps & SubscribeStateProps & SubscribeReduxProps
> = ({
  messages,
  clearMessages,
  path,
  token,
  openConnection,
  conn,
  maxRecords = 10000,
}) => {
  const [sqls, setSqlState] = useState("");

  const onSqlsChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    const value = target.value;

    setSqlState(value);
  };

  const onSubscribe = (e: any) => {
    openConnection(
      path,
      JSON.stringify({
        sql: sqls,
        live: true,
        stats: 2,
        token: token,
      })
    );
  };

  useEffect(() => {
    if (messages.length >= maxRecords) {
      conn!.close();
    }
  }, [messages]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onUnsubscribe = (topic: string) => {
    console.log("Stopping :", conn);
    conn!.close();
  };

  const btnStyle = classnames("button is-small is-info");

  return (
    <nav className="ws-subscribe panel">
      <div className="panel-heading">
        <div className="field has-addons">
          <p className="control is-expanded">
            <textarea
              className="textarea is-small is-info"
              placeholder="SQLS"
              value={sqls}
              onChange={onSqlsChange}
            />
          </p>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <Button
            style={{ marginRight: "10px" }}
            onClick={onSubscribe}
            className={btnStyle}
            disabled={!sqls}
          >
            Subscribe
          </Button>
          <Button
            onClick={clearMessages}
            style={{ marginRight: "10px" }}
            className="button is-small is-danger"
          >
            Clear Messages
          </Button>
          <Button onClick={onUnsubscribe} className="button is-small is-danger">
            Stop Streaming
          </Button>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">Number of messages: {messages.length}</div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: State) => ({
  messages: state.session.messages,
  token: state.session.token,
  conn: state.session.conn,
});

const mapDispatchToProps = {
  ...actions,
  openConnection,
};

const subscribeConnector = connect(mapStateToProps, mapDispatchToProps);

type SubscribeReduxProps = ConnectedProps<typeof subscribeConnector>;

export default subscribeConnector(_Subscribe);

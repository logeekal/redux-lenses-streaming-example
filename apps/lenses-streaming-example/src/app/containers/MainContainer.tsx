import React from "react";
import { connect, ConnectedProps, MapStateToProps } from "react-redux";

import Connect from "../components/Connect";
import Subscribe from "../components/Subscribe";
import MessageList from "../components/MessageList";
import { Message, State } from "../config/state";
import {actions, doLogin} from "../actions";

export type MainContainerProps = {
  commit: (message: Message) => void;
};

export type MainContainerStateProps = {
  messages: Message[];
  loginStatus: boolean
};

const _MainContainer: React.FC<MainContainerProps & MainContainerReduxProps > =
  ({ messages, commit, doLogin }) => (
    <div className="container app">
      <div className="columns">
        <div className="column">
          <Connect onLogin={()=> doLogin()} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Subscribe />
          {messages.length ? (
            <MessageList messages={messages} onCommitMessage={commit} />
          ) : null}
        </div>
      </div>
    </div>
  );

  const mapDispatchToProps = {
    ...actions,
    doLogin
  }

const mapStateToProps: MapStateToProps<
  MainContainerStateProps,
  MainContainerProps,
  State
> = (state: State) => ({
  messages: state.session.messages,
  loginStatus: state.session.loginStatus
});

const connector = connect(mapStateToProps, mapDispatchToProps)

type MainContainerReduxProps = ConnectedProps<typeof connector>

export const MainContainer = connector(_MainContainer);

import React from "react";
import { connect, ConnectedProps } from "react-redux";
import classnames from "classnames";
import Button from "./Button";
import { actions } from "../actions";
import { State } from "../config/state";

export type ConnectStateProps = {
  updateHost: (payload: string) => Record<string, unknown>;
  updateUser: (payload: string) => Record<string, unknown>;
  updatePassword: (payload: string) => Record<string, unknown>;
  onLogin: any;
  host: string;
  user: string;
  password: string;
};

export type ConnectProps = {
  connection?: boolean;
  heartbeatCount?: number;
};

const _Connect: React.FC<ConnectProps & ConnectStateProps & ConnectReduxProps> =
  ({
    host,
    user,
    password,
    connection = false,
    heartbeatCount = 0,
    updateHost,
    updateUser,
    updatePassword,
    onLogin,
    auth,
    logout,
  }) => {
    const onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
      const target = event.currentTarget;
      const value = target.value;
      const name = target.name;

      switch (name) {
        case "host":
          updateHost(value);
          break;
        case "user":
          updateUser(value);
          break;
        case "password":
          updatePassword(value);
          break;
        default:
          break;
      }
    };
    const btnStyle = classnames("button is-fullwidth", {
      "is-primary": !connection,
      "is-danger": connection,
    });

    return (
      <nav className="panel">
        <p className="panel-heading">Connection Details</p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="host"
              value={host}
              name="host"
              onChange={onInputChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-server" />
            </span>
          </p>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            Heartbeat Count: {heartbeatCount}
          </p>
        </div>
        {auth.status == "SUCCESS" ? (
          <div className="panel-block">
            <Button
              onClick={() => logout()}
              className={btnStyle}
              data-testid="login-button"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <div>
              <div className="panel-block">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="User"
                    value={user}
                    name="user"
                    onChange={onInputChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user" />
                  </span>
                </p>
              </div>
              <div className="panel-block">
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    type="password"
                    placeholder="Password for Authentication"
                    value={password}
                    name="password"
                    onChange={onInputChange}
                    autoComplete="off"
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock" />
                  </span>
                </p>
              </div>
            </div>
            {auth.status === "FAILED" ? (
              <div
                className="panel-block"
                style={{ color: "red", fontSize: "0.8rem", marginLeft:"0.25em", paddingTop: "0px" }}
              >
                <p className="has-icons-left"> {auth.error} </p>
              </div>
            ) : (
              <></>
            )}
            <div className="panel-block">
              <Button
                onClick={onLogin}
                className={btnStyle}
                data-testid="login-button"
              >
                Login
              </Button>
            </div>
          </>
        )}
      </nav>
    );
  };

const mapDispatchToProps = {
  ...actions,
};

const mapStateToProps = (state: State) => ({
  host: state.session.host,
  user: state.session.user,
  password: state.session.password,
  auth: state.session.auth,
});

const reduxConnector = connect(mapStateToProps, mapDispatchToProps);

type ConnectReduxProps = ConnectedProps<typeof reduxConnector>;
const Connect = reduxConnector(_Connect);

export default Connect;

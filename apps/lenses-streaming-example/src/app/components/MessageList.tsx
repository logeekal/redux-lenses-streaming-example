import {
  FC,
  HTMLProps,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect, ConnectedProps } from "react-redux";
import { List, AutoSizer, ListRowRenderer } from "react-virtualized";
import { actions } from "../actions";
import ListItemDetails from "./ListItemDetails";
import { Message, State } from "../config/state";

interface MessageListProps {
  onCommitMessage: (message: any) => void;
  messages: Message[];
}

const MessageList: FC<MessageListProps & MessageListReduxProps> = ({
  messages,
  onCommitMessage,
}) => {
  const [message, setMessage] = useState();

  const list = useRef<List>() as MutableRefObject<List>;
  const onShowRowDetails = (message: any) => {
    setMessage(message);
  };

  useEffect(() => {
    if (!message) {
      list.current!.scrollToRow(messages.length);
    }
  }, [message, messages]);

  const rowRenderer =
    (messages: Message[]): ListRowRenderer =>
    ({
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style, // Style object to be applied to row (to position it)
    }) => {
      let arr: Array<{
          label: string;
          value: string;
        }> = [],
        keys = [];
      console.log(messages[index]);
      //Object.keys(JSON.parse(messages[index].key)).forEach(function(k) {
      //keys.push({ label: k, value: JSON.parse(messages[index].key)[k] });
      //});
      keys.push({ label: "key", value: messages[index].key });
      Object.keys(messages[index].value).forEach(function (k) {
        arr.push({ label: k, value: messages[index].value[k] });
      });
      return (
        <div
          key={key}
          style={style}
          className="message-row columns ws-message-list is-multiline"
          onClick={() => onShowRowDetails(messages[index])}
        >
          <div className="column is-2">
            <div>Index</div>
            {index}
          </div>
          {keys.map((item) => (
            <MessageListItem
              className="key"
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
          {arr.map((item) => (
            <MessageListItem
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      );
    };

  return (
    <div>
      <ListItemDetails
        message={message}
        onCommitMessage={onCommitMessage}
        onShowRowDetails={onShowRowDetails}
      />
      <nav className="panel">
        <div className="panel-block">
          <AutoSizer className="autosizer-bulma-fix">
            {({ width}) => (
              <List
                ref={list}
                width={width}
                height={290}
                rowCount={messages.length}
                rowHeight={160}
                rowRenderer={rowRenderer(messages)}
              />
            )}
          </AutoSizer>
        </div>
      </nav>
    </div>
  );
};

interface MessageListItemProps extends HTMLProps<HTMLDivElement> {
  label: string;
  value: string;
}

const MessageListItem: FC<MessageListItemProps> = (props) => {
  const { className, label, value } = props;
  return (
    <div className={`column is-2 ${className ? className : ""}`}>
      <div>{label}</div>
      {value}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  message: state.session.message,
});

const mapDispatchToProps = {
  ...actions,
};

const messageListConnecter = connect(mapStateToProps, mapDispatchToProps);

type MessageListReduxProps = ConnectedProps<typeof messageListConnecter>;

export default messageListConnecter(MessageList);

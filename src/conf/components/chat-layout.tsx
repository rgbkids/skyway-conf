import * as React from "react";
import { useState, useCallback } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import Modal from "../components/modal";
import { IconButton } from "../components/icon";
import ChatMessage from "../components/chat-message";
import { RoomChat } from "../utils/types";

interface Props {
  chats: RoomChat[];
  onClickSend: (text: string) => void;
  onClickCloser: () => void;
}
const ChatLayout: FunctionComponent<Props> = ({
  chats,
  onClickCloser,
  onClickSend
}: Props) => {
  const [buffer, setBuffer] = useState("");
  const onSend = useCallback(() => {
    onClickSend(buffer);
    setBuffer("");
  }, [buffer, onClickSend]);

  return (
    <Modal>
      <div css={wrapperStyle}>
        <div css={headStyle}>
          <IconButton name="close" onClick={onClickCloser} />
        </div>
        <div css={scrollerStyle}>
          {chats.map(chat => (
            <ChatMessage key={chat.id} chat={chat} />
          ))}
        </div>
        <div css={editorStyle}>
          <input
            type="text"
            value={buffer}
            onChange={ev => setBuffer(ev.target.value)}
            css={inputStyle}
          />
          <IconButton
            name="send"
            disabled={buffer.length === 0}
            onClick={onSend}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChatLayout;

const wrapperStyle = css({
  display: "grid",
  gridTemplateRows: "20px 1fr 20px",
  width: 300,
  height: "80%",
  margin: "10% auto 0",
  padding: 8,
  backgroundColor: globalColors.white
});

const headStyle = css({
  textAlign: "right"
});

const scrollerStyle = css({
  overflowY: "scroll"
});

const editorStyle = css({
  display: "flex",
  alignItems: "center"
});

const inputStyle = css({
  flex: "1 1 auto",
  marginRight: 8
});

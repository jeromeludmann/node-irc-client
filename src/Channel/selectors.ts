import { createSelector } from "reselect";
import { RootState } from "@app/reducers/rootReducer";
import { ChannelScope } from "@app/types";

export const getMessages = (
  state: RootState,
  { server, channel }: ChannelScope,
) => state.servers[server].channels[channel].messages;

export const getMessagesCount = createSelector(
  getMessages,
  messages => (messages ? messages.length : 0),
);

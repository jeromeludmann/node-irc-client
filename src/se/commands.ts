import { Middleware } from "redux";
import { SendInputValueAction, SEND_INPUT_VALUE } from "@app/actions/ui/input";
import { raw } from "@app/actions/commands";
import { connect, disconnect } from "@app/actions/socket";

export const commands: Middleware = () => next => (
  action: SendInputValueAction,
) => {
  next(action);

  if (action.type === SEND_INPUT_VALUE) {
    // TODO
    const value = action.payload.value;
    // const p = value.indexOf(" ");
    // const command = value.slice(0, p + 1);
    // const params = value.slice(p + 1);

    if (value.indexOf("connect") === 0) {
      next(connect("localhost"));
      return;
    }

    if (value.indexOf("disconnect") === 0) {
      next(disconnect());
      return;
    }

    next(raw(action.payload.value));
    return;
  }
};

import { Action } from "redux";
import reduceActiveRoute, {
  ActiveRouteState,
  ActiveRouteAction,
  activeInitialState,
} from "@app/state/active";
import reduceServers, {
  ServerRouterState,
  serversInitialState,
  ServerRouterAction,
} from "@app/state/server-router";
import { Routable } from "@app/state/Route";

export type RootState = {
  readonly servers: ServerRouterState;
  readonly active: ActiveRouteState;
};

type RootAction = Action;

export const rootInitialState = {
  servers: serversInitialState,
  active: activeInitialState,
};

export default function reduce(state: RootState, action: RootAction) {
  const route = (action as Routable).route || state.active;
  const extraParams = { route, active: state.active };

  return {
    servers: reduceServers(
      state.servers,
      action as ServerRouterAction,
      extraParams,
    ),
    active: reduceActiveRoute(state.active, action as ActiveRouteAction),
  };
}

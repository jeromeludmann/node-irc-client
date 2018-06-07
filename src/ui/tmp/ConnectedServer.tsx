import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import { ServerListTypes } from "@app/actions/server";
import { ChannelListTypes } from "@app/actions/channel";
import Channel from "@app/ui/Channel";

interface OwnProps {
  name: string;
}

interface StateProps {
  channelNames: string[];
}

interface DispatchProps {
  onClick: (channelName: string) => void;
  onServerRemoveClick: (channelName: string) => void;
}

class Server extends React.Component<
  OwnProps & StateProps & DispatchProps,
  {}
> {
  public render() {
    return (
      <div style={{ backgroundColor: "#eee", padding: "10px", margin: "10px" }}>
        <div>server: {this.props.name}</div>
        <button onClick={this.handleServerRemoveClick}>Remove server</button>
        <button onClick={this.handleClick}>Add channel</button>

        {this.props.channelNames.map(channelName => (
          <Channel
            key={channelName}
            scope={{ server: this.props.name, channel: channelName }}
          />
        ))}
      </div>
    );
  }

  private handleClick = () => {
    this.props.onClick(`#Chan_${Date.now()}`);
  };

  private handleServerRemoveClick = () => {
    this.props.onServerRemoveClick(this.props.name);
  };
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
  const channels = state.servers[ownProps.name].channels;
  return {
    channelNames: channels ? Object.keys(channels) : [],
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    onClick(channelName: string) {
      dispatch({
        type: ChannelListTypes.ADD,
        scope: { server: ownProps.name, channel: channelName },
      });
    },
    onServerRemoveClick() {
      dispatch({
        type: ServerListTypes.REMOVE,
        scope: { server: ownProps.name },
      });
    },
  };
}

export const ConnectedServer = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Server);
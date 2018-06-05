import React from "react";
import { CommandInput } from "@app/CommandInput/container";

interface Props {
  name: string;
  server: string;
  messages: string[];
  count: number;
}

export class Channel extends React.Component<Props, {}> {
  public render() {
    return (
      <div style={{ backgroundColor: "#ddd", padding: "10px", margin: "10px" }}>
        <span>{this.props.name}</span>

        <div>Messages: {this.props.count}</div>

        <ul>
          {this.props.messages.map(message => {
            return <li key={message}>{message}</li>;
          })}
        </ul>

        <CommandInput
          server={this.props.server}
          channel={this.props.name}
        />
      </div>
    );
  }
}

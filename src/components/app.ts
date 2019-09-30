import { Component, h } from "preact";

import { AppState } from "../view_model";

import { Box } from "./Layout";
import Root from "./Root";

if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug");
}

export default class App extends Component {
  private appState = new AppState();
  public render() {
    return h(Box, { vertical: true, root: true }, [
      h(Root, { appState: this.appState })
    ]);
  }
}

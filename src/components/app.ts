import { Component, h } from "preact";

import RootViewModel from "../view_model/RootViewModel";

import { Box } from "./Layout";
import Root from "./Root";

if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug");
}

export default class App extends Component {
  private root_view_model = new RootViewModel();
  public render() {
    return h(Box, { vertical: true, root: true }, [
      h(Root, { root_view_model: this.root_view_model })
    ]);
  }
}

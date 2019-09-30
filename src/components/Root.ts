import { observer } from "mobx-preact";
import { Component, h } from "preact";

import { Module } from "../model";
import { AppState } from "../view_model";

import CitedBy from "./CitedBy";
import CodeViewer from "./CodeViewer";
import Layout from "./Layout";

interface RootProps {
  appState: AppState;
}

@observer
export default class Root extends Component<RootProps> {
  public render() {
    const { state, go_to } = this.props.appState;

    if (state.stage === "failed") {
      return h("div", { id: "app" }, `Failed to load ${state.path}`);
    }

    if (!state.module) {
      return h("div", { id: "app" }, "Loading...");
    }

    return h(Layout, {
      main: h(CodeViewer, { module: state.module, go_to }),
      header_components: [state.module.path],
      sidebar_components: {
        "Cited By": h(CitedBy, { module: state.module, go_to })
      }
    });
  }
}

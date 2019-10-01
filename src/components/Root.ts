import { observer } from "mobx-preact";
import { Component, h } from "preact";

import { Module } from "../model";
import { AppState, State } from "../view_model";

import CitedBy from "./CitedBy";
import CodeViewer from "./CodeViewer";
import Layout, { LayoutProps } from "./Layout";

interface RootProps {
  appState: AppState;
}

@observer
export default class Root extends Component<RootProps> {
  public render() {
    return h(Layout, this.layout_props(this.props.appState));
  }

  private layout_props({ state, go_to }: AppState): LayoutProps {
    switch (state.stage) {
      case "failed":
        return {
          main: h("div", {}, `Failed to load ${state.path}`),
          header_components: [state.path],
          sidebar_components: []
        };
      case "loading":
        if (state.model)
          return layout_props({ stage: "success", model: state.model });

        return {
          main: h("div", {}, "Loading..."),
          header_components: [state.loading_path],
          sidebar_components: []
        };
      case "success":
        return {
          main: h(CodeViewer, { module: state.module, go_to }),
          header_components: [state.module.path],
          sidebar_components: [
            ["Cited By", h(CitedBy, { module: state.module, go_to })]
          ]
        };
    }
  }
}

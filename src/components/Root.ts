import { observer } from "mobx-preact";
import { Component, h } from "preact";

import { Module } from "../model";
import { RootViewModel, State } from "../view_model";

import CitedBy from "./CitedBy";
import CodeViewer from "./CodeViewer";
import Layout, { LayoutProps } from "./Layout";
import PathBar from "./PathBar";

interface RootProps {
  root_view_model: RootViewModel;
}

@observer
export default class Root extends Component<RootProps> {
  public render() {
    const { go_to } = this.props.root_view_model;
    const { main, path, sidebar_components } = this.per_state(
      this.props.root_view_model
    );

    const header_components = [h(PathBar, { path, go_to }), "💾"];

    return h(Layout, {
      main,
      header_components,
      sidebar_components: sidebar_components || []
    });
  }

  private per_state(app_state: RootViewModel): LayoutProps {
    const { state, go_to } = app_state;
    switch (state.stage) {
      case "failed":
        return {
          path: state.path,
          main: h("div", {}, `Failed to load ${state.path}`)
        };
      case "loading":
        return {
          path: state.loading_path,
          main: h("div", {}, "Loading...")
        };
      case "success":
        return {
          path: state.module.path,
          main: h(CodeViewer, { module: state.module, go_to }),
          sidebar_components: [
            ["Cited By", h(CitedBy, { module: state.module, go_to })]
          ]
        };
    }
  }
}

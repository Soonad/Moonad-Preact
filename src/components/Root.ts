import { observer } from "mobx-preact";
import { Component, JSX, h } from "preact";

import { Module } from "../model";
import { RootViewModel, ModuleState } from "../view_model";

import CitedBy from "./CitedBy";
import CodeViewer from "./CodeViewer";
import Layout, { LayoutProps, SidebarComponents } from "./Layout";
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

  private per_state(
    root_view_model: RootViewModel
  ): {
    main: JSX.Element;
    path: string;
    sidebar_components?: SidebarComponents;
  } {
    const { module_state, go_to } = root_view_model;
    switch (module_state.stage) {
      case "failed":
        return {
          path: module_state.path,
          main: h("div", {}, `Failed to load ${module_state.path}`)
        };
      case "loading":
        return {
          path: module_state.loading_path,
          main: h("div", {}, "Loading...")
        };
      case "success":
        return {
          path: module_state.module.path,
          main: h(CodeViewer, { module: module_state.module, go_to }),
          sidebar_components: [
            ["Cited By", h(CitedBy, { module: module_state.module, go_to })]
          ]
        };
    }
  }
}

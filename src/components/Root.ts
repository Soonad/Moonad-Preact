import { observer } from "mobx-preact";
import { Component, h, JSX } from "preact";

import { Module } from "../model";
import RootViewModel from "../view_model/RootViewModel";

import CitedBy from "./CitedBy";
import CodeEditor from "./CodeEditor";
import CodeViewer from "./CodeViewer";
import ErrorReport from "./ErrorReport";
import Layout, { LayoutProps, SidebarComponents } from "./Layout";
import PathBar from "./PathBar";

interface RootProps {
  root_view_model: RootViewModel;
}

@observer
export default class Root extends Component<RootProps> {
  public render() {
    return h(Layout, {
      main_components: this.main_components(this.props.root_view_model),
      header_components: this.header_components(this.props.root_view_model),
      sidebar_components: this.sidebar_components(this.props.root_view_model)
    });
  }

  private main_components(root_view_model: RootViewModel): JSX.Element[] {
    const error_component = this.error_component(root_view_model);
    const main_component = this.main_component(root_view_model);

    return error_component
      ? [main_component, error_component]
      : [main_component];
  }

  private error_component({
    module_state
  }: RootViewModel): JSX.Element | undefined {
    if (module_state.stage === "failed") {
      return h(ErrorReport, { error: module_state.error });
    }
  }

  private main_component(root_view_model: RootViewModel): JSX.Element {
    const { module_state, go_to, editing_state, edit, save } = root_view_model;

    if (editing_state.editing) {
      return h(CodeEditor, { editing_state });
    }

    switch (module_state.stage) {
      case "failed":
        return h("div", {}, `Failed to load ${module_state.path}`);
      case "loading":
        return h("div", {}, "Loading...");
      case "success":
        return h(CodeViewer, { module: module_state.module, go_to });
    }
  }

  private header_components(root_view_model: RootViewModel): JSX.Element[] {
    const path = this.path(root_view_model);
    const path_bar = h(PathBar, { path, go_to: root_view_model.go_to });
    const actions = this.actions(root_view_model);

    return [path_bar].concat(actions);
  }

  private path(root_view_model: RootViewModel): string {
    const { module_state, go_to, editing_state, edit, save } = root_view_model;

    if (editing_state.editing) {
      return "local";
    }

    switch (module_state.stage) {
      case "failed":
        return module_state.path;
      case "loading":
        return module_state.loading_path;
      case "success":
        return module_state.module.path;
    }
  }

  private actions({
    cancel_editing,
    edit,
    editing_state,
    module_state,
    publish,
    save
  }: RootViewModel): JSX.Element[] {
    if (editing_state.editing) {
      return [action("❌", cancel_editing), action("💾", save)];
    }

    if (module_state.stage === "success") {
      const edit_action = action("✏️", edit);
      const publish_action = action("📄", () => {
        // TODO: Use a proper modal input
        const name = prompt("Name:");
        if (name) {
          publish(name);
        }
      });

      if (module_state.module.path === "local") {
        return [publish_action, edit_action];
      }

      return [edit_action];
    }

    return [];
  }

  private sidebar_components({
    editing_state,
    module_state,
    go_to
  }: RootViewModel): SidebarComponents {
    if (editing_state.editing) {
      return [];
    }

    if (module_state.stage === "success") {
      return [["Cited By", h(CitedBy, { module: module_state.module, go_to })]];
    }

    return [];
  }
}

const action = (icon: string, onClick: () => any): JSX.Element =>
  h("span", { onClick, style: action_style }, [icon]);

const action_style = {
  cursor: "pointer"
};

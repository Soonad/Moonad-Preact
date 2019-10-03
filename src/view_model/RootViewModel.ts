import { observable } from "mobx";
import { Module, ModuleLoader } from "../model";
import EditingState from "./EditingState";

export interface LoadedState {
  stage: "success";
  module: Module;
}

export interface LoadingState {
  stage: "loading";
  loading_path: string;
}

export interface FailedState {
  stage: "failed";
  error: string;
  path: string;
}

export interface NotEditingState {
  editing: false;
}

const default_path = "Root@0";
const module_regex = /^[^@]+@\d+$/;
const term_regex = /^(?<mod>[^@]+@\d+)(\/.*)?$/;
const in_browser = typeof window !== "undefined";

const get_initial_path = () => {
  const path_from_location = in_browser
    ? window.location.pathname.substr(1)
    : "";

  return module_regex.test(path_from_location)
    ? path_from_location
    : default_path;
};

export default class RootViewModel {
  @observable public module_state: LoadingState | LoadedState | FailedState;
  @observable public editing_state: EditingState | NotEditingState = {
    editing: false
  };

  private module_loader = new ModuleLoader();

  constructor() {
    const initial_path = get_initial_path();
    this.module_state = { stage: "loading", loading_path: initial_path };

    if (in_browser) {
      window.history.replaceState(
        { path: initial_path },
        initial_path,
        initial_path
      );
      window.onpopstate = (e: PopStateEvent) => this.on_pop_state(e);
    }

    this.load(initial_path);
  }
  public go_to = async (path_or_term: string) => {
    const match = term_regex.exec(path_or_term);

    if (!match || !match.groups || !match.groups.mod) {
      return;
    }

    const path = match.groups.mod;

    await this.load(path);
    window.history.pushState({ path }, path, path);
  };

  public edit = () => {
    if (this.module_state.stage === "success") {
      this.editing_state = new EditingState(this.module_state.module.code);
    }
  };

  public cancel_editing = () => {
    this.editing_state = { editing: false };
  };

  public save = () => {
    if (!this.editing_state.editing) {
      return;
    }

    this.load_local(this.editing_state.code);
    this.editing_state = { editing: false };
  };

  private on_pop_state = (e: PopStateEvent) => {
    if (typeof e.state === "object" && typeof e.state.path === "string") {
      this.load(e.state.path);
    }
  };

  private async load(path: string) {
    await this.do_load(this.module_loader.load(path), path);
  }

  private async load_local(code: string) {
    await this.do_load(this.module_loader.load_local(code), "local", () => {
      // Go Back to editing when we have an error.
      this.editing_state = new EditingState(code);
    });
  }

  private async do_load(
    loader: Promise<Module>,
    path: string,
    on_error?: () => any
  ) {
    this.module_state = {
      stage: "loading",
      loading_path: path
    };

    try {
      const loaded_module = await loader;
      this.module_state = { stage: "success", module: loaded_module };
    } catch (e) {
      const error = e.toString();
      this.module_state = { stage: "failed", path, error };
      if (on_error) {
        on_error();
      }
    }
  }
}

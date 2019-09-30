import { observable } from "mobx";
import { Module, ModuleLoader } from "./model";

export interface LoadedState {
  stage: "success";
  module: Module;
}

export interface LoadingState {
  stage: "loading";
  loading_path: string;
  module?: Module; // Previous loaded module
}

export interface FailedState {
  stage: "failed";
  path: string;
}

type State = LoadingState | LoadedState | FailedState;

const default_path = "Root@0";

const module_loader = new ModuleLoader();

const module_regex = /^[^@]+@\d+$/;

export class AppState {
  @observable public state: State;

  constructor() {
    const in_browser = typeof window !== "undefined";

    const path_from_location = in_browser
      ? window.location.pathname.substr(1)
      : "";

    const initial_path = module_regex.test(path_from_location)
      ? path_from_location
      : default_path;

    this.state = { stage: "loading", loading_path: initial_path };
    this.load(initial_path);

    if (in_browser) {
      window.history.replaceState(
        { path: initial_path },
        initial_path,
        initial_path
      );
      window.onpopstate = (e: PopStateEvent) => this.on_pop_state(e);
    }
  }

  public go_to = async (path_or_term: string) => {
    const path = path_or_term.replace(new RegExp("/.*$"), "");

    if (this.state.stage !== "loading") {
      this.state = {
        stage: "loading",
        loading_path: path,
        ...(this.state.stage === "success" ? { module: this.state.module } : {})
      };
    }

    await this.load(path);
    window.history.pushState({ path }, path, path);
  };

  private on_pop_state = (e: PopStateEvent) => {
    if (typeof e.state === "object" && typeof e.state.path === "string") {
      this.load(e.state.path);
    }
  };

  private async load(path: string) {
    try {
      const loaded_module = await module_loader.load(path);
      this.state = { stage: "success", module: loaded_module };
    } catch {
      this.state = { stage: "failed", path };
    }
  }
}

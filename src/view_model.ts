import { observable } from "mobx";
import { Module, ModuleLoader } from "./model";

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
  path: string;
}

export type ModuleState = LoadingState | LoadedState | FailedState;

const default_path = "Root@0";
const module_regex = /^[^@]+@\d+$/;
const term_regex = /^(?<mod>[^@]+@\d+)(\/.*)?$/;

export class RootViewModel {
  @observable public module_state: ModuleState;

  private module_loader = new ModuleLoader();

  constructor() {
    const in_browser = typeof window !== "undefined";

    const path_from_location = in_browser
      ? window.location.pathname.substr(1)
      : "";

    const initial_path = module_regex.test(path_from_location)
      ? path_from_location
      : default_path;

    this.module_state = { stage: "loading", loading_path: initial_path };
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
    const match = term_regex.exec(path_or_term);

    if (!match || !match.groups || !match.groups.mod) return;

    const path = match.groups.mod;

    if (this.module_state.stage !== "loading") {
      this.module_state = {
        stage: "loading",
        loading_path: path
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
      const loaded_module = await this.module_loader.load(path);
      this.module_state = { stage: "success", module: loaded_module };
    } catch {
      this.module_state = { stage: "failed", path };
    }
  }
}

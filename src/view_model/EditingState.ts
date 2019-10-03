import { observable } from "mobx";

export default class EditingState {
  public editing: true = true;
  @observable public code: string;

  constructor(code: string) {
    this.code = code;
  }
}

export interface NotEditingState {
  editing: false;
}

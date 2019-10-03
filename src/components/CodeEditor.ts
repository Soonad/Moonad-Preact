import { observer } from "mobx-preact";
import { Component, h } from "preact";

import EditingState from "../view_model/EditingState";

interface Props {
  editing_state: EditingState;
}

@observer
export default class CodeEditor extends Component<Props> {
  public render() {
    return h("textarea", {
      style,
      value: this.props.editing_state.code,
      onInput: this.onInput
    });
  }

  private onInput = (e: Event) => {
    const evt = e as InputEvent;
    if (evt.target) {
      const element = evt.target as HTMLInputElement;
      this.props.editing_state.code = element.value;
    }
  };
}

const style = {
  fontFamily: "monospace",
  fontSize: "14px",
  padding: "0px",
  outline: "none",
  background: "transparent",
  width: "100%",
  height: "100%",
  border: "0"
};

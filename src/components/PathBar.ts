import { h } from "preact";
import { useRef, useState } from "preact/hooks";
import { Module, Token } from "../model";

type GoToCallback = (module_or_term: string) => any;

export interface Props {
  path: string;
  go_to: GoToCallback;
}

interface EditingState {
  editing: true;
  path: string;
}

interface NotEditingState {
  editing: false;
}

type State = EditingState | NotEditingState;

export default function PathBar({ path, go_to }: Props) {
  const [state, setState] = useState<State>({ editing: false });
  const input_ref = useRef<HTMLInputElement | undefined>(undefined);

  const onBlur = () => setState({ editing: false });
  const onClick = () => {
    setState({ editing: true, path: "" });
    window.setTimeout(() => input_ref.current && input_ref.current.focus());
  };

  const onInput = (e: Event) => {
    const evt = e as InputEvent;
    if (evt.target && state.editing) {
      const element = evt.target as HTMLInputElement;
      setState({ editing: true, path: element.value });
    }
  };

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.which === 13 && state.editing) {
      setState({ editing: false });
      go_to(state.path);
    }
  };

  if (state.editing) {
    return h("input", {
      style: input_style,
      value: state.path,
      ref: input_ref,
      placeholder: "Go To...",
      onBlur,
      onKeyPress,
      onInput
    });
  }

  return h("span", { style, onClick }, path);
}

const style = { flexGrow: 1 };

const input_style = {
  ...style,
  outline: "none",
  marginRight: "6px",
  padding: "0",
  fontFamily: "monospace",
  fontSize: "16px",
  border: "1px dashed #ddd"
};

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
      placeholder: "Go to...",
      onBlur,
      onKeyPress,
      onInput,
    });
  }

  return h("div", { style, onClick }, path);
}

const style = { 
  heigth: "30px", 
  width: "40%", 
  color: "#FFFFFF",
  marginLeft: "30px",
  marginTop: "35px",
  fontSize: "16px",
};

const input_style = {
  ...style,
  outline: "none",
  marginRight: "6px",
  padding: "5px",
  fontFamily: "monospace",
  border: "1px #ddd",
  marginLeft: "20px",
  marginTop: "20px",
  marginBottom: "20px",
};

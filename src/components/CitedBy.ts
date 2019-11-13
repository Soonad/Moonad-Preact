import { h } from "preact";
import { Module, Token } from "../model";

type GoToCallback = (module_or_term: string) => any;

export interface Props {
  module: Module;
  go_to: GoToCallback;
}

export default function CitedBy({ module: { parents }, go_to }: Props) {
  return h(
    "ul",
    { style: ul_style },
    parents.map((parent: string) =>
      h("li", { style: li_style, onClick: () => go_to(parent) }, parent)
    )
  );
}

const li_style = {
  listStyle: "none",
  textDecoration: "underline",
  cursor: "pointer"
};

const ul_style = {
  className: "Cited by component",
  padding: 0
};

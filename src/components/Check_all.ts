import { h } from "preact";
import { Module, Term, Token } from "../model";

export interface Props {
  module: Module;
}

export default function Check_all({ module}: Props) {

  return h(
    "ul",
    { style: ul_style }, 
      module.tokens.map((token: Token) => {
        if (token.type === "def") {
          const term = module.term(token.full_name);
          const full_name = module.path +"/"+token.content;
          return h("li", { style: li_style}, format_term(term, full_name));
        }
      })

  );
}

const format_term = ({ type }: Term, full_name: string): string => {
  return type.checked ? full_name + " ✔" : full_name + " ✘";
}

const li_style = {
  listStyle: "none"
};

const ul_style = {
  className: "Check all component",
  padding: 0
};
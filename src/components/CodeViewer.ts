import { h } from "preact";
import { Module, Token } from "../model";

type GoToCallback = (module_or_term: string) => any;

export interface Props {
  module: Module;
  go_to: GoToCallback;
}

export default function CodeViewer({ module, go_to }: Props) {
  return h(
    "code",
    { style: { padding: "8px", overflow: "scroll", flexGrow: 1 } },
    [
      h(
        "pre",
        {},
        module.tokens.map((token: Token) => {
          const style = token_styles[token.type];
          switch (token.type) {
            case "ref":
              return h(
                "span",
                { style, onClick: () => go_to(token.full_name) },
                token.content
              );
            case "imp":
              return h(
                "span",
                { style, onClick: () => go_to(token.content) },
                token.content
              );
            default:
              return h("span", { style }, token.content);
          }
        })
      )
    ]
  );
}

const token_styles = {
  txt: {
    color: "black"
  },

  sym: {
    color: "#15568f"
  },

  cmm: {
    color: "#A2A8D3"
  },

  num: {
    color: "green"
  },

  var: {
    color: "black"
  },

  doc: {
    color: "#A2A8D3"
  },

  imp: {
    color: "black",
    textDecoration: "underline",
    fontWeight: "bold",
    cursor: "pointer"
  },

  ref: {
    color: "#38598B",
    textDecoration: "underline",
    fontWeight: "bold",
    cursor: "pointer"
  },

  def: {
    color: "#4384e6",
    textDecoration: "underline",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

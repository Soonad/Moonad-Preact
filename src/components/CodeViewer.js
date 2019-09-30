import { h } from "preact";
export default function CodeViewer(_a) {
    var module = _a.module, go_to = _a.go_to;
    return h("code", { style: { padding: "8px", overflow: "scroll", flexGrow: 1 } }, [
        h("pre", {}, module.tokens.map(function (token) {
            var style = token_styles[token.type];
            switch (token.type) {
                case "ref":
                    return h("span", { style: style, onClick: function () { return go_to(token.full_name); } }, token.content);
                case "imp":
                    return h("span", { style: style, onClick: function () { return go_to(token.content); } }, token.content);
                default:
                    return h("span", { style: style }, token.content);
            }
        }))
    ]);
}
var token_styles = {
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

import { h } from "preact";
export default function CodeViewer(_a) {
    var parents = _a.module.parents, go_to = _a.go_to;
    return h("ul", { style: ul_style }, parents.map(function (parent) {
        return h("li", { style: li_style, onClick: function () { return go_to(parent); } }, parent);
    }));
}
var li_style = {
    listStyle: "none",
    textDecoration: "underline",
    cursor: "pointer"
};
var ul_style = {
    padding: 0,
    margin: "5px 0"
};

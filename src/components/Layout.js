var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { h } from "preact";
var flexContainer = function (_a) {
    var vertical = _a.vertical;
    return ({
        display: "flex",
        flexFlow: (vertical ? "column" : "row") + " nowrap"
    });
};
var spread = function (_a) {
    var root = _a.root, grow = _a.grow;
    return root ? { width: "100%", height: "100%" } : grow !== false ? { flex: 1 } : {};
};
// Container contains multiple divs
export var Box = function (props) {
    return h("div", {
        style: __assign({}, flexContainer(props), spread(props), props.style)
    }, props.children || []);
};
var Layout = function (props) {
    return h(Box, { vertical: true, style: base_style }, [
        h("div", { style: header_style }, props.header_components || []),
        h(Box, { vertical: false }, [
            props.main,
            h(Box, { vertical: true, style: sidebar_style, grow: false }, render_sidebar_components(props.sidebar_components || {}))
        ])
    ]);
};
var render_sidebar_components = function (components) {
    return Object.keys(components).map(function (key) {
        return h("div", {}, [
            h("h3", { style: sidebar_title_style }, key),
            components[key]
        ]);
    });
};
export default Layout;
var header_style = {
    background: "#f0f0f0",
    height: "26px",
    fontFamily: "monospace",
    fontSize: "16px",
    display: "flex",
    userSelect: "none",
    flexFlow: "row nowrap",
    alignItems: "center",
    borderBottom: "1px solid #b4b4b4",
    padding: "0 8px"
};
var sidebar_style = {
    background: "#f0f0f0",
    borderLeft: "1px dashed gray",
    padding: "8px",
    fontSize: "14px"
};
var sidebar_title_style = {
    margin: "5px 0"
};
var base_style = {
    fontFamily: "monospace"
};

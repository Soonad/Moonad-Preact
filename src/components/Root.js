var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observer } from "mobx-preact";
import { Component, h } from "preact";
import CitedBy from "./CitedBy";
import CodeViewer from "./CodeViewer";
import Layout from "./Layout";
var Root = /** @class */ (function (_super) {
    __extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.prototype.render = function () {
        var _a = this.props.appState, state = _a.state, go_to = _a.go_to;
        if (state.stage === "failed") {
            return h("div", { id: "app" }, "Failed to load " + state.path);
        }
        if (!state.module) {
            return h("div", { id: "app" }, "Loading...");
        }
        return h(Layout, {
            main: h(CodeViewer, { module: state.module, go_to: go_to }),
            header_components: [state.module.path],
            sidebar_components: {
                "Cited By": h(CitedBy, { module: state.module, go_to: go_to })
            }
        });
    };
    Root = __decorate([
        observer
    ], Root);
    return Root;
}(Component));
export default Root;

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
import { Component, h } from "preact";
import { AppState } from "../view_model";
import { Box } from "./Layout";
import Root from "./Root";
if (module.hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.appState = new AppState();
        return _this;
    }
    App.prototype.render = function () {
        return h(Box, { vertical: true, root: true }, [
            h(Root, { appState: this.appState })
        ]);
    };
    return App;
}(Component));
export default App;

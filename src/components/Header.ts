import { h } from "preact";
import LayoutConstants from "../assets/LayoutConstants";
import Button from "./Button";
import PathBar from "./PathBar";

import fork_icon from "../assets/icons/icon_fork.png";
import inspect_icon from "../assets/icons/icon_inspect.png";
import logo from "../assets/Moonad_WHITE_Symbol.png";

const default_path = "Base@0";

type GoToCallback = (module_or_term: string) => any;

export default function Header(callback: GoToCallback) {
  return h("div", {style: header_style},
    h("div", {style: {flexDirection: "row", display: "flex"}}, [
      h("img", {style: logo_style, src: logo, alt: "logo"}), 
      h(PathBar, { path: default_path, go_to: callback }),
    ]),
    h("div", {style: {display: "flex", flexDirection: "row"}}), [
      h(Button, {title: "INSPECT", icon: inspect_icon, onClick: () => {console.log("Open inspect!")}} ),
      h(Button, {title: "FORK", icon: fork_icon, onClick: () => {console.log("Now fork!")}} )
    ]
  );
}

const header_style = {
  width: "100%",
  height: "72px",
  backgroundColor: LayoutConstants.primary_color,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  position: "fixed"
}

const logo_style = {
  width: "50px",
  height: "40px",
  marginTop: 15,
  marginLeft: 30
}

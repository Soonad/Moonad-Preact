import { h } from "preact";
import { ElementsId, LayoutConstants } from "../assets/Constants";
import Button from "./Button";
import PathBar from "./PathBar";

import fork_icon from "../assets/icons/icon_fork.png";
import inspect_icon from "../assets/icons/icon_inspect.png";
import logo from "../assets/Moonad_WHITE_Symbol.png";

const default_path = "Base@0";

type GoToCallback = (module_or_term: string) => any;

export default function Header(go_to: GoToCallback) {
  return h("div", {style: header_style},
    h("div", {style: {flexDirection: "row", display: "flex"}}, [
      h("img", {style: logo_style, src: logo, alt: "logo", onClick: () => {go_to("Base@0")} }), 
      h(PathBar, { path: default_path, go_to }),
    ]),
    h("div", {clasName: "Buttons div", style: buttons_div_style}, [
      h(Button, {title: "INSPECT", icon: inspect_icon, onClick: inspect_file} ),
      h(Button, {title: "FORK", icon: fork_icon, onClick: () => {console.log("Now fork!")}} )
    ])
  );
}

const inspect_file = () => {
  const layout_element = document.getElementById(ElementsId.layout_id);
  // const console_element = document.getElementById(ElementsId.console_id);
  // const g = document.createElement();
  console.log("Header: inspect file");
  // if (layout_element && console_element) {
  //   console.log("Header: elements exist");
  //   layout_element.appendChild(console_element);
  // }
}

const buttons_div_style = {
  display: "flex",
  height: "100%", 
  width: "150px",
  flexDirection: "row",
  justifyContent: "space-between",
  marginRight: "50px",
  userSelect: "none"
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
  marginLeft: 50,
  cursor: "pointer"
}

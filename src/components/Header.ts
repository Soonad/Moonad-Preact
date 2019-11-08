import { Component, h, JSX } from "preact";
import LayoutConstants from "../assets/LayoutConstants";
import logo from "../assets/Moonad_WHITE.png";
import RootViewModel from "../view_model/RootViewModel";
import PathBar from "./PathBar";

const default_path = "Base@0";

type GoToCallback = (module_or_term: string) => any;

export default function Header(callback: GoToCallback) {
  return h("div", {style: header_style}, 
    h("img", {style: logo_style, src: logo, alt: "logo"}), 
    h("div", {style: {width: "50", backgroundColor: LayoutConstants.secondary_color}}),
    h(PathBar, { path: default_path, go_to: callback })
  );
}

const header_style = {
  width: "100%",
  height: "72px",
  backgroundColor: LayoutConstants.primary_color,
  display: "flex",
  flexDirection: "row"
}

const logo_style = {
  width: "50px",
  height: "30px",
  marginTop: 20,
  marginLeft: 30
}

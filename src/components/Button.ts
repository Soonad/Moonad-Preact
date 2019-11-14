import { h } from "preact";
import { useState } from "preact/hooks";
import { LayoutConstants } from "../assets/Constants";

interface Button {
  title: string,
  icon: string,
  onClick: () => any
}

export default function Button({ title, icon, onClick }: Button){
  const [hover, setHover] = useState(false);
  const style_btn = hover ? button_hover_style : button_style;
  return h("div", {style: style_btn, onClick, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false)}, [
    h("img", {src: icon, style: icon_style}),
    h("p", {style: button_text}, title)
  ]);
}

const button_style = {
  width: "70px",
  height: "100%",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer"
}

const button_hover_style = {
  ...button_style,
  backgroundColor: LayoutConstants.primary_shadow_color
}

const button_text = {
  color: "#FFFFFF",
  fontSize: "14px",
  fontFamily: "monospace",
  margin: "0px"
}

const button_text_hover = {
  color: "#FFFFFF",
  fontSize: "14px",
  fontFamily: "monospace",
  borderBottom: "1px solid black",
}

const icon_style = {
  width: "30px",
  height: "30px",
  marginTop: "09px"
}
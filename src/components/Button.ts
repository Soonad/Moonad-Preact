import { h } from "preact";

interface Button {
  title: string,
  icon: string,
  onClick: () => any
}

export default function Button(props: Button){

  return h("div", {style: button_style, onClick: props.onClick()}, [
    h("img", {src: props.icon, style: icon_style}),
    h("p", {style: button_text}, props.title)
  ]
  );
}

const button_style = {
  width: "70px",
  height: "60px",
  flexDirection: "column",
  justifyContent: "center",
  cursor: "pointer",
  marginTop: "15px"
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
  height: "30px"
}
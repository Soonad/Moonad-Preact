import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import CitedBy from "../components/CitedBy";
import { Module, Term } from "../model";
import Check_all from "./Check_all";
import Root from "./Root";

import { ElementsId, LayoutConstants } from "../assets/Constants";
import btn_close from "../assets/icons/btn_close.png";
import RootViewModel from "../view_model/RootViewModel";


type GoToCallback = (module_or_term: string) => any;
interface TabElement {tab: ConsoleTabs, view: View_type}
type ViewElement = (view_model: RootViewModel) => preact.VNode<any> | undefined;

export interface ConsoleProps {
  view_model: RootViewModel
}

type View_type = "cited_by" | "check_all" | "output";

export default function Console( props: ConsoleProps ){
  const [view_on_focus, setState] = useState("cited_by");

  const info: TabElement[] = [
    { tab: { is_on_focus: true, title: "Cited By", onClick: () => { 
        setState("cited_by"); 
        // view_on_focus === "cited_by" ? this.is_on_focus = true : this.is_on_focus = false;
      } }, 
      view: "cited_by"
    },
    { tab: { is_on_focus: false, title: "Check all", onClick: () => { 
        setState("check_all"); 
        // view_on_focus === "check_all" ? console.log(">>> view_on_focus is check all") : this.is_on_focus = false; 
      } },
      view: "check_all"
    },
    { tab: { is_on_focus: false, title: "Output", onClick: () => { 
        setState("output"); 
        // view_on_focus === "output" ? this.is_on_focus = true : this.is_on_focus = false; 
      } },
      view: "output"
    }
  ]
  // console.log("Console, on focus: "+view_on_focus);

  return h("div", {id: ElementsId.console_id, style: console_style}, [
    h(ConsoleHeader, {tabs: info.map( ({tab, view} : TabElement) => tab), view_on_focus}),
    h("div", {style: {marginLeft: "150px", marginRight: "150px", marginTop: "30px"}}, [
      h(ConsoleView, {view_type: view_on_focus, view_model: props.view_model})
    ])
  ]);
}

const console_style = {
  className: "Console",
  height: "180px",
  width: "100%",
  backgroundColor: LayoutConstants.light_gray_color,
  marginBottom: "0px",
  overflow: "scroll"
}

const console_header_style = {
  height: "30px",
  width: "100%",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderTop: `solid ${LayoutConstants.medium_gray_color} 0.5px`,
  borderBottom: `solid ${LayoutConstants.medium_gray_color} 0.5px`,
  position: "fixed"
}

const ConsoleHeader = (props : {tabs: ConsoleTabs[], view_on_focus: string}) => {
  const on_close_btn = () => {
    const console_div = document.getElementById(ElementsId.console_id);
    if (console_div) {
      console_div.parentNode.removeChild(console_div);
    }
  }

  return h("div", {className: "Console header", style: console_header_style}, [
    h("div", {className: "Console tabs div", style: tabs_div_style}, render_tabs_components(props.tabs)),
    h(CloseButton, {onClick: on_close_btn})
  ])
}

const render_tabs_components = (tabs: ConsoleTabs[]) =>
  tabs.map(( {is_on_focus, title, onClick}: ConsoleTabs ) => 
    h(ConsoleTab, { is_on_focus, title, onClick })
  );

export interface ConsoleTabs {
  is_on_focus: boolean;
  title: string;
  onClick: () => void;
}

const ConsoleTab = ( {is_on_focus, title, onClick}: ConsoleTabs) => {
  const [hover, setHover] = useState(false);
  const style_btn = hover ? console_tab_style_hover : console_tab_style;
  // console.log("Console tab "+title+" is_on_focus?"+is_on_focus);
  return is_on_focus ? h("div", {onClick, style: console_tab_style_focus}, title) : 
                       h("div", {onClick, style: style_btn, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false)}, title);
}

export interface CloseButton {
  onClick: () => any
}

const CloseButton = ({ onClick }: CloseButton) => {
  return h("div", {onClick, style: close_button_style}, [
    h("img", {src: btn_close, style: {width: "15px", height: "15px"}})
  ])
}

const close_button_style = {
  width: "15px", 
  height: "15px",
  alignSelf: "center",
  cursor: "pointer",
  marginRight: "150px"
}

const tabs_div_style = {
  alignSelf: "center",
  height: "100%",
  marginLeft: "150px",
  display: "flex", 
  flexDirection: "row",
  justifyContent: "space-between"
}

const console_tab_style = {
  alignSelf: "center",
  textAlign: "baseline",
  cursor: "pointer",
  paddingRight: "20px",
  paddingLeft: "20px",
  paddingTop: "5px",
  height: "100%",
  userSelect: "none",
  borderTop: `1px solid ${LayoutConstants.medium_gray_color}`,
  borderBottom: `1px solid ${LayoutConstants.medium_gray_color}`
}

const console_tab_style_focus = {
  ...console_tab_style,
  borderBottom: "2px solid "+ LayoutConstants.secondary_color
}

const console_tab_style_hover = {
  ...console_tab_style,
  backgroundColor: LayoutConstants.light_gray_shadow_color,
  height: "100%" 
}

export interface ConsoleView {
  view_type: string,
  view_model: RootViewModel
}

const ConsoleView = ( {view_type, view_model}: ConsoleView ) => {
  if (view_model.editing_state.editing) {
    return h("div", {});
  }

  const result_aux = h("span", {style: {color: LayoutConstants.secondary_color}}, "► ");
  const padding_top = "10px";

  if (view_model.module_state.stage === "success") {
    switch(view_type){
      case "cited_by":
        // This code is here because I'm unable to use it inside a function (?!)
          if (view_model.module_state.stage === "success") {
            const qtd = view_model.module_state.module.parents.length;
            const cited_by_msg = format_console_msg(qtd > 1? qtd + " results" : qtd + " result");
            const cited_by = h(CitedBy, { module: view_model.module_state.module, go_to: view_model.go_to });
        
            return h("div", {style: {paddingTop: padding_top}}, [
              result_aux, cited_by_msg,
              cited_by
            ]);
          }
        // return cited_by_view(view_model);
      case "check_all":
        const check_all = h(Check_all, {module: view_model.module_state.module} );
        const check_all_msg = format_console_msg("Check all terms in "+view_model.module_state.module.path);
        return h("div", {style: {paddingTop: padding_top}}, [
          result_aux, check_all_msg,
          check_all
        ]);
      case "output":
          return h("div", {style: {paddingTop: padding_top}}, [
            result_aux,
            h("span", {}, "Output view")
          ]);
    }
  }

  return h("div", {});
}

const format_console_msg = (msg: string) => {
  return  h("span", {style: {color: LayoutConstants.dark_gray_color, fontWeight: "bold"}}, msg);
}

// const cited_by_view  = ({ module_state, go_to}: RootViewModel) => {
//   if (module_state.stage === "success") {
//     const qtd = module_state.module.parents.length;
//     const qtd_result_aux = h("span", {style: {color: LayoutConstants.secondary_color}}, "► ");
//     const qtd_result = h("span", {style: {color: LayoutConstants.dark_gray_color, fontWeight: "bold"}}, qtd > 1? qtd + " results" : qtd + " result");
//     const cited_by = h(CitedBy, { module: module_state.module, go_to });

//     return h("div", {style: {paddingTop: "10px"}}, [
//       qtd_result_aux, qtd_result,
//       cited_by
//     ]);
//   }
// }
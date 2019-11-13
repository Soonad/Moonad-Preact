import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import CitedBy from "../components/CitedBy";
import { Module, Term } from "../model";

import LayoutConstants from "../assets/LayoutConstants";
import RootViewModel from "../view_model/RootViewModel";
import Check_all from "./Check_all";
import Root from "./Root";

type GoToCallback = (module_or_term: string) => any;
interface TabElement {tab: ConsoleTabs, view: ViewType}
type ViewElement = (view_model: RootViewModel) => preact.VNode<any> | undefined;

export interface ConsoleProps {
  view_model: RootViewModel
}

type ViewType = "cited_by" | "check_all" | "output";

export default function Console( props: ConsoleProps ){
  const [view_on_focus, setState] = useState("check_all");

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

  return h("div", {style: console_style}, [
    h(ConsoleHeader, {tabs: info.map( ({tab, view} : TabElement) => tab), view_on_focus}),
    h("div", {style: {marginLeft: "150px", marginRight: "150px", marginTop: "30px"}}, [
      h(ConsoleView, {viewType: view_on_focus, view_model: props.view_model})
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
  borderTop: "solid #A9A9A9 0.5px",
  borderBottom: "solid #A9A9A9 0.5px",
  position: "fixed"
}

const ConsoleHeader = (props : {tabs: ConsoleTabs[], view_on_focus: string}) => {
  return h("div", {className: "Console header", style: console_header_style}, [
    h("div", {className: "Console tabs div", style: tabs_div_style}, [
      render_tabs_components(props.tabs)
    ]),

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
  // console.log("Console tab "+title+" is_on_focus?"+is_on_focus);
  return is_on_focus ? h("div", {onClick, style: console_tab_style_focus}, title) : h("div", {onClick, style: console_tab_style}, title);
}

const CloseButton = (onClick: () => {}) => {
  return h("div", {onClick, style: {width: "15px", alignSelf: "center"}}, "x")
}

const tabs_div_style = {
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
  height: "100%"
}

const console_tab_style_focus = {
  ...console_tab_style,
  borderBottom: "2px solid "+ LayoutConstants.secondary_color
}

export interface ConsoleView {
  viewType: string,
  view_model: RootViewModel
}

const ConsoleView = ( {viewType, view_model}: ConsoleView ) => {
  if (view_model.editing_state.editing) {
    return h("div", {});
  }

  const result_aux = h("span", {style: {color: LayoutConstants.secondary_color}}, "► ");
  const padding_top = "10px";

  if (view_model.module_state.stage === "success") {
    switch(viewType){
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
        return h("div", {}, "Output div");
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
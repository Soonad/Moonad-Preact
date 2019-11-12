import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import CitedBy from "../components/CitedBy";
import { Module, Term } from "../model";

import LayoutConstants from "../assets/LayoutConstants";
import RootViewModel from "../view_model/RootViewModel";
import PathBar from "./PathBar";
import Root from "./Root";

type GoToCallback = (module_or_term: string) => any;
interface TabElement {tab: ConsoleTabs, view: ViewType}
type ViewElement = (view_model: RootViewModel) => preact.VNode<any> | undefined;

export interface ConsoleProps {
  view_model: RootViewModel
}

type ViewType = "cited_by" | "check_all" | "output";

export default function Console( props: ConsoleProps ){
  const info: TabElement[] = [
    { tab: { title: "Cited By", onClick: () => { setState("cited_by") } }, 
      view: "cited_by"
    },
    { tab: { title: "Check all", onClick: () => { setState("check_all") } },
      view: "check_all"
    }
  ]
  const [view_on_focus, setState] = useState("cited_by");

  return h("div", {style: console_style}, [
    h(ConsoleHeader, {tabs: info.map( ({tab, view} : TabElement) => tab)}),
    h("div", {style: {marginLeft: "150px", marginRight: "150px"}}, [
      h(ConsoleView, {viewType: view_on_focus, viewModel: props.view_model})
    ])  
  ]);
}

const console_style = {
  className: "Console",
  height: "180px",
  width: "100%",
  backgroundColor: LayoutConstants.light_gray_color,
  marginBottom: "0px"
}

const console_header_style = {
  height: "30px",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "row",
  border: "solid #F2F2F2"
}

const ConsoleHeader = (props : {tabs: ConsoleTabs[]}) => {
  return h("div", {className: "console header", style: console_header_style}, [
    h("div", {className: "Console tabs div", style: tabs_div_style}, [
      render_tabs_components(props.tabs)
    ])
  ])
}

const render_tabs_components = (tabs: ConsoleTabs[]) =>
  tabs.map(( {title, onClick}: ConsoleTabs ) =>
    h(ConsoleTab, { title, onClick } )
  );

const tabs_div_style = {
  marginLeft: "150px",
  display: "flex", 
  flexDirection: "row",
  justifyContent: "space-between"
}


export interface ConsoleTabs {
  title: string;
  onClick: () => void;
}

const ConsoleTab = ( {title, onClick}: ConsoleTabs) => {
  return h("div", {onClick, style: console_tab_style}, title)
}

const console_tab_style = {
  alignSelf: "center",
  cursor: "pointer",
  minWidth: "100px"
}


export interface ConsoleView {
  viewType: string,
  viewModel: RootViewModel
}

const ConsoleView = ( {viewType, viewModel}: ConsoleView ) => {
  if (viewModel.editing_state.editing) {
    return h("div", {});
  }

  if (viewModel.module_state.stage === "success") {
    switch(viewType){
      case "cited_by":
        return h(CitedBy, { module: viewModel.module_state.module, go_to: viewModel.go_to });
      case "check_all":
        return h("div", {}, "Check all div");
      case "output":
        return h("div", {}, "Output div");
    }
  }

  return h("div", {});
}

const cited_by_view = ({ module_state, go_to}: RootViewModel) => {
  if (module_state.stage === "success") {
    return h(CitedBy, { module: module_state.module, go_to });
  }
}


import { h, JSX} from "preact";
import CitedBy from "../components/CitedBy";
import { Module, Term } from "../model";

import LayoutConstants from "../assets/LayoutConstants";
import RootViewModel from "../view_model/RootViewModel";

type GoToCallback = (module_or_term: string) => any;
// type TabElement = {tab: ConsoleTabs, view: preact.VNode<any> | never[]}

export interface ConsoleProps {
  view_model: RootViewModel
}

export default function Console( {view_model}: ConsoleProps ){
  // const tabs: Array<TabElement> = [
  //   { tab: { title: "Cited By", onClick: () => {console.log("cited by beign called")} }, 
  //     view: cited_by_view(view_model)
  //   },
  //   { tab: { title: "Check all", onClick: () => {console.log("check all")}},
  //     view: cited_by_view(view_model)
  //   }
  // ]

  return h("div", {style: console_style}, [
    h(ConsoleHeader, {}), 
    h("div", {style: {marginLeft: "150px"}}, [
      cited_by_view(view_model)
    ])
    
  ])
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
  flexDirection: "row"
}

// TODO: passar tabs por parâmetro
const ConsoleHeader = () => {
  return h("div", {className: "console header", style: console_header_style}, [
    h("div", {className: "Console tabs div", style: tabs_div_style}, [
      h(ConsoleTab, {title: "Cited By", onClick: () => {console.log("Cited By")}} ),
      h(ConsoleTab, {title: "Check all", onClick: () => {console.log("Check all")}} )
      // render_tabs_components(tabs)
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

const ConsoleView = (cited_by : any) => {
  return h("div", {style: {marginLeft: "180px"}}, [
    cited_by
  ]);
}

export type CitedByComponents = Array<[string, JSX.Element]>;

const cited_by_view = ({ editing_state, module_state, go_to}: RootViewModel) => {
  if (editing_state.editing) {
    return [];
  }

  if (module_state.stage === "success") {
    return h(CitedBy, { module: module_state.module, go_to });
  }

  return [];
}
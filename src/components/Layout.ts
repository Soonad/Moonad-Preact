import { ComponentChildren, JSX, h } from "preact";

// Modules to help with layouting

interface StyleArgs {
  vertical?: boolean;
  root?: boolean;
  grow?: boolean;
}

const style = (args: StyleArgs) => ({
  display: "flex",
  flexFlow: `${args.vertical ? "column" : "row"} nowrap`,
  ...(args.root ? { width: "100%", height: "100%" } : {}),
  ...(!args.root && !args.grow ? { flex: "1" } : {})
});

interface BoxProps extends StyleArgs {
  children?: ComponentChildren;
  style?: {};
}

// Container contains multiple divs
export const Box = (props: BoxProps) =>
  h(
    "div",
    {
      style: { ...style(props), ...props.style }
    },
    props.children || []
  );

export type SidebarComponents = [string, JSX.Element][];

export interface LayoutProps {
  main: JSX.Element;
  sidebar_components: SidebarComponents;
  header_components: ComponentChildren;
}

const Layout = (props: LayoutProps) =>
  h(Box, { vertical: true, style: base_style }, [
    h("div", { style: header_style }, props.header_components),
    h(Box, { vertical: false }, [
      h(Box, { style: main_style }, [props.main]),
      h(
        Box,
        { vertical: true, style: sidebar_style, grow: false },
        render_sidebar_components(props.sidebar_components)
      )
    ])
  ]);

const render_sidebar_components = (components: SidebarComponents) =>
  components.map(([title, component]) =>
    h("div", {}, [h("h3", { style: sidebar_title_style }, title), component])
  );

export default Layout;

const header_style = {
  background: "#f0f0f0",
  height: "26px",
  fontFamily: "monospace",
  fontSize: "16px",
  display: "flex",
  userSelect: "none",
  flexFlow: "row nowrap",
  alignItems: "center",
  borderBottom: "1px solid #b4b4b4",
  padding: "0 8px"
};

const sidebar_style = {
  background: "#f0f0f0",
  borderLeft: "1px dashed gray",
  padding: "8px",
  flex: "0 1 auto",
  fontSize: "14px"
};

const main_style = {
  padding: "8px",
  overflow: "scroll",
  flexGrow: 1
};

const sidebar_title_style = {
  margin: "5px 0"
};

const base_style = {
  fontFamily: "monospace"
};

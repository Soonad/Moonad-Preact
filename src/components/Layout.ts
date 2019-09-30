import { ComponentChildren, h, PreactHTMLAttributes } from "preact";

// Modules to help with layouting

interface StyleArgs {
  vertical: boolean;
  root?: boolean;
  grow?: boolean;
}

const flexContainer = ({ vertical }: StyleArgs) => ({
  display: "flex",
  flexFlow: `${vertical ? "column" : "row"} nowrap`
});

const spread = ({ root, grow }: StyleArgs) =>
  root ? { width: "100%", height: "100%" } : grow !== false ? { flex: 1 } : {};

interface BoxProps extends StyleArgs {
  children?: ComponentChildren;
  style?: {};
}

// Container contains multiple divs
export const Box = (props: BoxProps) =>
  h(
    "div",
    {
      style: {
        ...flexContainer(props),
        ...spread(props),
        ...props.style
      }
    },
    props.children || []
  );

interface SidebarComponents {
  [key: string]: JSX.Element;
}

interface LayoutProps {
  main: JSX.Element;
  sidebar_components?: SidebarComponents;
  header_components?: ComponentChildren;
}

const Layout = (props: LayoutProps) =>
  h(Box, { vertical: true, style: base_style }, [
    h("div", { style: header_style }, props.header_components || []),
    h(Box, { vertical: false }, [
      props.main,
      h(
        Box,
        { vertical: true, style: sidebar_style, grow: false },
        render_sidebar_components(props.sidebar_components || {})
      )
    ])
  ]);

const render_sidebar_components = (components: SidebarComponents) =>
  Object.keys(components).map(key =>
    h("div", {}, [
      h("h3", { style: sidebar_title_style }, key),
      components[key]
    ])
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
  fontSize: "14px"
};

const sidebar_title_style = {
  margin: "5px 0"
};

const base_style = {
  fontFamily: "monospace"
};

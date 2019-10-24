import { ComponentChildren, h, JSX } from "preact";

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

export type SidebarComponents = Array<[string, JSX.Element]>;

export interface LayoutProps {
  main_components: JSX.Element[];
  sidebar_components: SidebarComponents;
  header_components: JSX.Element[];
}

const Layout = (props: LayoutProps) =>
  h(Box, { vertical: true, style: base_style }, [
    h("div", { style: header_style }, props.header_components),
    h(Box, { vertical: false, style: body_style }, [
      h(
        Box,
        { vertical: true, style: main_style },
        insert_dividers(props.main_components)
      ),
      h(
        Box,
        { vertical: true, style: sidebar_style, grow: false },
        render_sidebar_components(props.sidebar_components)
      )
    ])
  ]);

function* intersperse<T>(a: T[], delim: T): IterableIterator<T> {
  let first = true;
  for (const x of a) {
    if (!first) {
      yield delim;
    }
    first = false;
    yield x;
  }
}

const insert_dividers = (components: JSX.Element[]): JSX.Element[] =>
  Array.from(intersperse(components, h("hr", { style: divider_style })));

const render_sidebar_components = (components: SidebarComponents) =>
  components.map(([title, component]) =>
    h("div", {}, [h("h3", { style: sidebar_title_style }, title), component])
  );

export default Layout;

const padding = 8;

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
  padding: `0 ${padding}px`
};

const sidebar_style = {
  background: "#f0f0f0",
  borderLeft: "1px dashed gray",
  padding: `${padding}px`,
  flex: "0 1 auto",
  fontSize: "14px"
};

const divider_style = {
  borderTop: "1px dashed black",
  width: "100%",
  marginLeft: `-${padding}px`,
  paddingRight: `${padding * 2}px`,
  boxSizing: "content-box"
};

const main_style = {
  padding: `${padding}px`,
  overflow: "scroll",
  flexGrow: 1
};

const sidebar_title_style = {
  margin: "5px 0"
};

const base_style = {
  fontFamily: "monospace",
  maxHeight: "100%",
  maxWidth: "100%"
};

const body_style = {
  overflow: "hidden"
};

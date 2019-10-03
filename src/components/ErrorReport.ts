import { ansiToJson } from "anser";
import { h, JSX } from "preact";

export interface Props {
  error: string;
}

const ErrorReport = (props: Props): JSX.Element =>
  h(
    "pre",
    { style: error_style },
    ansiToJson(props.error).map(part =>
      h(
        "span",
        {
          style: {
            color: part.fg ? `rgb(${part.fg})` : "inherit",
            background: part.bg ? `rgb(${part.bg})` : "inherit",
            ...decoration(part.decoration)
          }
        },
        [part.content]
      )
    )
  );

const decoration = (value: string | null): { [key: string]: string } => {
  switch (value) {
    case "bold":
      return { fontWeight: "bold" };
    case "dim":
      return { opacity: "0.5" };
    case "italic":
      return { fontStyle: "italic" };
    case "underline":
      return { textDecoration: "underline" };
    case "blink":
      return { textDecoration: "blink" };
    case "reverse":
      return { direction: "rtl" };
    case "strikethrough":
      return { textDecoration: "strikethrough" };
    case "hidden":
      return { opacity: "0" };
    default:
      return {};
  }
};

export default ErrorReport;

const error_style = {
  margin: 0
};

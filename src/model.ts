import fm from "formality-lang";

export interface SimpleToken {
  type: "txt" | "sym" | "cmm" | "num" | "var" | "imp" | "doc";
  content: string;
}

export interface TermToken {
  type: "ref" | "def";
  content: string;
  full_name: string;
}

export type Token = SimpleToken | TermToken;

export interface Module {
  path: string;
  parents: string[];
  tokens: Token[];
  code: string;
}

export class ModuleLoader {
  public async load(path: string): Promise<Module> {
    const [{ code, defs, tokens }, parents] = await Promise.all([
      this.load_code(path),
      this.load_parents(path)
    ]);

    return {
      path,
      code,
      parents,
      tokens: tokens.map(
        ([type, content, full_name]): Token => {
          switch (type) {
            case "txt":
              return { type, content };
            case "sym":
              return { type, content };
            case "cmm":
              return { type, content };
            case "num":
              return { type, content };
            case "var":
              return { type, content };
            case "imp":
              return { type, content };
            case "doc":
              return { type, content };
            case "ref":
              return { type, content, full_name };
            case "def":
              return { type, content, full_name };
            // Fallback to txt token
            default:
              return { type: "txt", content };
          }
        }
      )
    };
  }

  private async load_code(path: string) {
    const code = await fm.lang.load_file(path);
    const { defs, tokens } = await fm.lang.parse(path, code, true);
    return { code, defs, tokens };
  }

  private async load_parents(path: string) {
    return await fm.lang.load_file_parents(path);
  }
}

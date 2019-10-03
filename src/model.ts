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

export interface TypeChecked {
  checked: true;
  value: string;
}

export interface TypeNotChecked {
  checked: false;
  error: string;
}

export interface Term {
  type: TypeChecked | TypeNotChecked;
  value: string;
}

export interface Module {
  path: string;
  parents: string[];
  tokens: Token[];
  code: string;
  term: (term_name: string) => Term;
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
      term: (name: string) => {
        // TODO: Model non type-checking results
        const value = fm.lang.show(defs[name]);
        const type = (() => {
          try {
            const value = fm.lang.show(fm.exec(name, defs, "TYPE", {}));
            return { checked: true, value };
          } catch (e) {
            const error = e
              .toString()
              .replace(/\[[0-9]m/g, "")
              .replace(/\[[0-9][0-9]m/g, "");
            return { checked: false, error };
          }
        })();
        return { value, type };
      },
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

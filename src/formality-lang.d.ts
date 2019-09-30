declare module "formality-lang" {
  module lang {
    // Do not type AST for now.
    type AST = {};

    interface Defs {
      [key: string]: AST;
    }

    function load_file(path: string): Promise<string>;
    function load_file_parents(path: string): Promise<string[]>;

    // Typing only what we use
    function parse(
      file: string,
      code: string,
      root: boolean
    ): Promise<{
      defs: Defs;
      tokens: string[][];
    }>;
  }
}

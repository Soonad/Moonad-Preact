import { async } from "q";
import { ModuleLoader, Token } from "../model";

describe("ModuleLoader", () => {
  let moduleLoader: ModuleLoader;

  beforeEach(async () => {
    moduleLoader = new ModuleLoader();
  });

  test("Can load local code with translated tokens", async () => {
    const result = await moduleLoader.load_local(`a : Word 1 b : Word 2`);

    const emptyToken: Token = { type: "txt", content: "" };
    const spaceToken: Token = { type: "txt", content: " " };
    const colonToken: Token = { type: "sym", content: ":" };
    const wordTypeToken: Token = { type: "sym", content: "Word" };

    const expectedTokens: Token[] = [
      emptyToken,
      { type: "def", content: "a", full_name: "local/a" },
      spaceToken,
      colonToken,
      spaceToken,
      wordTypeToken,
      spaceToken,
      { type: "num", content: "1" },
      spaceToken,
      { type: "def", content: "b", full_name: "local/b" },
      spaceToken,
      colonToken,
      spaceToken,
      wordTypeToken,
      spaceToken,
      { type: "num", content: "2" },
      emptyToken
    ];

    expect(result.tokens).toEqual(expectedTokens);
  });

  test("Can load Root file", async () => {
    const result = await moduleLoader.load('Root@0');
    expect(result.code).not.toBeNull();
  });

  test("Can publish file", async () => {
    const fm_code = {
      name: "testLocal",
      code: "the_answer_test : Word 42"
    }
    const result = await moduleLoader.publish(fm_code.name, fm_code.code);
    expect(result.isRight).toBe(true);
  });

  test("Can catch error when publishing file", async () => {
    const fm_code = {
      name: "",
      code: "the_answer_test : Word 42"
    }
    try {
      await moduleLoader.publish(fm_code.name, fm_code.code);
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  test("Can catch formatted error when publishing file", async () => {
    const fm_code = {
      name: "",
      code: "the_answer_test : Word 42"
    }
    const result = await moduleLoader.publish(fm_code.name, fm_code.code);
    expect(result.isRight).toBe(false);
  });


});

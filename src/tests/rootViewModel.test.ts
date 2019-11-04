import RootViewModel from '../view_model/RootViewModel';

describe("RootViewModel", () => {

  let rootVM: RootViewModel;
  const default_path = "Base@0";

  beforeAll(async () => {
    rootVM = new RootViewModel();
  });

  beforeEach(async () => {
    window.history.replaceState(
      { path: default_path },
      default_path,
      default_path
    );
  });

  test("Can change path", async () => {
    const path_to_go = "Bits@0"; // TODO: Change it to be Root@0
    const expected_result = {"path": path_to_go};
    const result = await rootVM.go_to(path_to_go);

    // TODO: must exist!
    // expect(rootVM.module_state.stage).toBe("success");
    expect(window.history.state).toEqual(expected_result);
  });

  // test("Can load previous path", async () => {
  //   let initial_path = "Array@0";
  //   let next_path = 'Array.Operation@0';
  //   let expected_result = {"path": initial_path};
  //   const go_to = await rootVM.go_to(initial_path);
  //   const then_go_to = await rootVM.go_to(next_path);

  //   window.history.back();
  //   expect(window.history.state).toEqual(expected_result);
  // });

  test("Can prevent loading unexisting path", async () => {
    // Initial state
    expect(window.history.state.path).toEqual(default_path);
    // expect(rootVM.module_state.stage).toEqual("success");

    // Non existing and not formatted path
    const example0 = "DogeToTheMoon";
    const result0 = await rootVM.go_to(example0);
    expect(window.history.state.path).toEqual(default_path);
    // expect(rootVM.module_state.stage).toEqual("success");

    // Empty path
    const example1 = "";
    const result1 = await rootVM.go_to(example1);
    expect(window.history.state.path).toEqual(default_path);
    // expect(rootVM.module_state.stage).toEqual("success");

    // Load non existing term
    const example2 = "Array@0/term";
    const result2 = await rootVM.go_to(example2);
    const expected_result = example2.split("/")[0];
    expect(window.history.state.path).toEqual(expected_result);
    // expect(rootVM.module_state.stage).toEqual("success");

    // Non existing version
    const example3 = "Array@1000000"
    const result3 = await rootVM.go_to(example3);
    expect(window.history.state.path).toEqual(example3);
    expect(rootVM.module_state.stage).toEqual("failed");
  });


});
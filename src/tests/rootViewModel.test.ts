import RootViewModel from '../view_model/RootViewModel';

describe("RootViewModel", () => {

  let rootVM: RootViewModel;
  const default_path = "Root@0";

  beforeAll(async () => {
    rootVM = new RootViewModel();
    window.history.replaceState(
      { path: default_path },
      default_path,
      default_path
    );
  });

  test("Can change path", async () => {
    const path_to_go = "Relation.Binary@0"; // TODO: Change it to be Root@0
    const expectResult = {"path": path_to_go};
    const result = await rootVM.go_to(path_to_go);

    expect(rootVM.module_state.stage).toBe("success");
    expect(window.history.state).toEqual(expectResult);
  });

  // test("Can load previous path", async () => {
  //   let initial_path = "Relation.Binary@0";
  //   let next_path = 'Algebra.Operation@0';
  //   let expectResult = {"path": initial_path};
  //   const go_to = await rootVM.go_to(initial_path);
  //   const then_go_to = await rootVM.go_to(next_path);

  //   window.history.back();
  //   expect(window.history.state).toEqual(expectResult);
  // });

  test("Can prevent loading unexisting path", async () => {
    const tests = ["DogeToTheMoon", "Relation.Binary@10000", "", "Relation.Binary@0/doge"];
    
    const promises = tests.map(async path_or_term => {
      const result = await rootVM.go_to(path_or_term);
      return {
        name: path_or_term,
        stage: rootVM.module_state.stage,
        result
      }
    })

    const results = await Promise.all(promises);
    // console.log(results.filter((aux) => {console.log(aux); aux.stage === "success"}));
    expect(rootVM.module_state.stage).toEqual("success");
    // expect(window.history.state.path).toEqual(default_path);
    
    // let path_to_go = "DogeToTheMoon";
    // const result = await rootVM.go_to(path_to_go);
    // expect(result).toEqual(undefined);

    // let example1 = "";
    // const result1 = await rootVM.go_to(example1);
    // expect(result1).toEqual(undefined);

    // let example2 = "";
    // const result2 = await rootVM.go_to(example2);
    // expect(result2).toEqual(undefined);

    // let example3 = "Relation.Binary@0/doge"
    // const result3 = await rootVM.go_to(example3);
    // expect(result3).toEqual(undefined);

    // expect(rootVM.module_state.stage).toEqual("success");
  });


});
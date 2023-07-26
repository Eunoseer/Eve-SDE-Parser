import fs from "fs";
import YAML from "yaml";
import filterYaml from "../../src/helpers/filterYaml";
import { LANGUAGES } from "../../src/types/languages";
import { type } from "../../src/types/entity";

describe("Filter YAML", () => {
  let mock: type;
  let filteredMock: type;
  beforeAll(() => {
    mock = YAML.parse(fs.readFileSync(`${__dirname}/mocks/bestower.yaml`, "utf-8")) as type;
    filteredMock = YAML.parse(fs.readFileSync(`${__dirname}/mocks/bestowerFiltered.yaml`, "utf-8")) as type;
  });

  it("should filter languages based on the given language code. e.g. en", async () => {
    const langKeys = [LANGUAGES.en];
    const response = filterYaml(mock, langKeys);

    expect(response).toEqual(filteredMock);
  });
});

import fs from 'fs';
import YAML from 'yaml';
import { filterYaml } from '../../src/helpers';
import { LANGUAGES } from '../../src/types/languages';
import { entityParent } from '../../src/types/entity';

describe('Filter YAML', () => {
  let mock: entityParent;
  let filteredMock: entityParent;
  beforeAll(() => {
    mock = YAML.parse(fs.readFileSync(`${__dirname}/mocks/bestower.yaml`, 'utf-8')) as entityParent;
    filteredMock = YAML.parse(
      fs.readFileSync(`${__dirname}/mocks/bestowerFiltered.yaml`, 'utf-8')
    ) as entityParent;
  });

  it('should filter languages based on the given language code. e.g. en', async () => {
    const langKeys = [LANGUAGES.EN];
    const response = filterYaml(mock, langKeys);

    expect(response).toEqual(filteredMock);
  });
});

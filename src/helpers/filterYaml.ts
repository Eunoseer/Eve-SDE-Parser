import { bonus, entity, entityParent } from '../types/entity';
import { LANGUAGES } from '../types/languages';

const filterDescription = (ent: entity, languages: LANGUAGES[]): void => {
  if (!ent.description) {
    return;
  }
  const descriptionsMap = new Map<string, string>();
  Object.keys(ent.description).forEach((langKey: LANGUAGES) => {
    if (languages.includes(langKey)) {
      descriptionsMap.set(langKey, ent.description[langKey]);
    }
  });
  ent.description = Object.fromEntries(descriptionsMap);
};

const filterNames = (ent: entity, languages: LANGUAGES[]): void => {
  const namesMap = new Map<string, string>();

  Object.keys(ent.name).forEach((langKey: LANGUAGES) => {
    if (languages.includes(langKey)) {
      namesMap.set(langKey, ent.name[langKey]);
    }
  });

  ent.name = Object.fromEntries(namesMap);
};

const filterRoleBonuses = (ent: entity, languages: LANGUAGES[]): void => {
  if (!ent.traits?.roleBonuses) {
    return;
  }

  ent.traits.roleBonuses.forEach((roleBonus: bonus, index: number) => {
    const roleBonusTextMap = new Map<string, string>();
    Object.keys(roleBonus.bonusText).forEach((langKey: LANGUAGES) => {
      if (languages.includes(langKey)) {
        roleBonusTextMap.set(langKey, roleBonus.bonusText[langKey]);
      }
    });
    ent.traits.roleBonuses[index].bonusText = Object.fromEntries(roleBonusTextMap);
  });
};

const filterTraitTypes = (ent: entity, languages: LANGUAGES[]): void => {
  if (!ent.traits?.types) {
    return;
  }

  Object.keys(ent.traits.types).forEach((bonusKey: string) => {
    const typeBonuses = ent.traits.types[bonusKey];
    typeBonuses.forEach((typeBonus: bonus, index: number) => {
      const typeBonusTextMap = new Map<String, string>();
      Object.keys(typeBonus.bonusText).forEach((langKey: LANGUAGES) => {
        if (languages.includes(langKey)) {
          typeBonusTextMap.set(langKey, typeBonus.bonusText[langKey]);
        }
      });
      ent.traits.types[bonusKey][index].bonusText = Object.fromEntries(typeBonusTextMap);
    });
  });
};

/**
 *
 * @param yaml incoming yaml object
 * @param languages list of supported languages
 * @returns formatted entityParent
 */
export const filterYaml = (yaml: entityParent, languages: LANGUAGES[]): entityParent => {
  const typesMap = new Map<number, entity>();

  Object.keys(yaml).forEach((key: string) => {
    const ent: entity = yaml[Number(key)];

    if (!ent.published) {
      return;
    }

    filterDescription(ent, languages);
    filterNames(ent, languages);
    filterRoleBonuses(ent, languages);
    filterTraitTypes(ent, languages);

    typesMap.set(Number(key), ent);
  });

  return Object.fromEntries(typesMap);
};

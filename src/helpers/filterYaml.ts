import { bonus, entity, type } from "../types/entity";
import { LANGUAGES } from "../types/languages";

const filterYaml = (yaml: type, languages: LANGUAGES[]): type => {
  const typesMap = new Map<number, entity>();

  Object.keys(yaml).forEach((key: string) => {
    const ent: entity = yaml[Number(key)];
    if (ent.published) {
      const namesMap = new Map<string, string>();

      if (ent.description) {
        const descriptionsMap = new Map<string, string>();
        Object.keys(ent.description).forEach((langKey: LANGUAGES) => {
          if (languages.includes(langKey)) {
            descriptionsMap.set(langKey, ent.description[langKey]);
          }
        });

        ent.description = Object.fromEntries(descriptionsMap);
      }

      if (ent.traits) {
        if (ent.traits.roleBonuses) {
          ent.traits.roleBonuses.forEach((roleBonus: bonus, index: number) => {
            const roleBonusTextMap = new Map<string, string>();
            Object.keys(roleBonus.bonusText).forEach((langKey: LANGUAGES) => {
              if (languages.includes(langKey)) {
                roleBonusTextMap.set(langKey, roleBonus.bonusText[langKey]);
              }
            });
            ent.traits.roleBonuses[index].bonusText = Object.fromEntries(roleBonusTextMap);
          });
        }

        if (ent.traits.types) {
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
        }
      }

      Object.keys(ent.name).forEach((langKey: LANGUAGES) => {
        if (languages.includes(langKey)) {
          namesMap.set(langKey, ent.name[langKey]);
        }
      });
      ent.name = Object.fromEntries(namesMap);
      typesMap.set(Number(key), ent);
    }
  });

  return Object.fromEntries(typesMap);
};

export default filterYaml;

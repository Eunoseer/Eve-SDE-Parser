export type description = {
  [key: string]: string;
};

export type masteries = {
  [key: string]: number[];
};

export type entityParent = {
  [key: number]: entity;
};

export type bonus = {
  bonus: number;
  bonusText: description;
  importance: number;
  unitID: number;
};

export type traits = {
  roleBonuses: bonus[];
  types: {
    [key: string]: bonus[];
  };
};

export type entity = {
  basePrice: number;
  capacity: number;
  description: description;
  factionID: number;
  graphicID: number;
  groupID: number;
  marketGroupID: number;
  mass: number;
  masteries: masteries;
  metaGroupID: number;
  name: description;
  portionSize: number;
  published: boolean;
  raceID: number;
  radius: number;
  sofFactionName: string;
  soundID: number;
  traits: traits;
  volume: number;
};

import heroes from '../data/heroes.json';

export class Hero {
  id: string;
  name: string;
  heroName: string;
  powers: Array<HeroPower>;
  backgroundImage: string;
  public constructor(json) {
    Object.assign(this, json);
    if (json && json.powers) {
      this.powers = json.powers.map(power => new HeroPower(power));
    }
  }

  public static findAll(): Array<Hero> {
    if (heroes && heroes.length) {
      return heroes.map(hero => new Hero(hero));
    }
    return [];
  }

  public static findById(id: string): Hero {
    return this.findAll().find(hero => hero.id === id);
  }
}

export class HeroPower {
  powerName: string;
  powerDescription: string;
  powerBackgroundImage: string;

  public constructor(json) {
    Object.assign(this, json);
  }
}

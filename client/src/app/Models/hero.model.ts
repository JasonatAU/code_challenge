export class HeroModel {
  public id: string;
  public name: string;
  public heroName: string;
  public description: string;
  public powers: Array<HeroPower>;
  public backgroundImageUrl: string;

  constructor(json?: any) {
    Object.assign(this, json);
    if (json.heroPowers) {
      this.powers = json.heroPowers.map((power) => new HeroPower(power));
    }
  }
}

export class HeroPower {
  public powerName: string;
  public powerDescription: string;
  public powerBackgroundImage: string;

  constructor(json: any) {
    Object.assign(this, json);
  }
}

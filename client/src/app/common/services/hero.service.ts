import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {HeroModel} from '../../Models/hero.model';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private _selectedHero: HeroModel;
  public get selectedHero(): HeroModel {
    return this._selectedHero;
  }
  public set selectedHero(selectedHero: HeroModel) {
    this._selectedHero = selectedHero;
  }

  private BASE_URL = 'https://7c0uyb00d1.execute-api.us-east-1.amazonaws.com/dev';
  constructor(private http: HttpClient) {}

  public findAll(): Observable<any> {
    return this.http.get(this.BASE_URL + '/heroes').pipe(map((json: any) => {
      if (json && json.heroes) {
        return json.heroes.map(hero => new HeroModel(hero));
      }
    }));
  }

  public findById(heroId: string): Observable<any> {
    return this.http.get(this.BASE_URL + '/heroes/' + heroId).pipe(map((json: any) => new HeroModel(json.hero)));
  }
}

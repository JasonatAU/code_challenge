import { Component, OnInit } from '@angular/core';
import { HeroService } from '../common/services/hero.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroModel} from '../Models/hero.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public heroes: Array<HeroModel>;

  constructor(private heroService: HeroService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.heroService.findAll().subscribe((heroes: Array<HeroModel>) => {
      this.heroes = heroes;
    });
  }

  public navigateToDetails(hero: HeroModel): void {
    this.heroService.selectedHero = hero;
    this.router.navigate([hero.id], {relativeTo: this.activatedRoute});
  }

}

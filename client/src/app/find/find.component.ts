import { Component, OnInit } from '@angular/core';
import { HeroService } from '../common/services/hero.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroModel} from '../Models/hero.model';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  public hero: HeroModel;
  constructor(private heroService: HeroService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.heroService.selectedHero) {
      this.hero = this.heroService.selectedHero;
    } else {
      const heroId = this.activatedRoute.snapshot.params.id;
      this.heroService.findById(heroId).subscribe((hero: HeroModel) => {
        this.hero = hero;
      });
    }

  }

  public navigateToList(): void {
    this.router.navigate(['./']);
  }
}

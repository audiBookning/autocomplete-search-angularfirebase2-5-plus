import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MoviesService } from '../movies.service';

@Component({
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<any[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');

  constructor(private moviesSvc: MoviesService) {}

  ngOnInit() {
    this.movies$ = this.moviesSvc
      .getMovies(this.startAt);
  }

  search(searchText) {
    this.startAt.next(searchText);
  }
}

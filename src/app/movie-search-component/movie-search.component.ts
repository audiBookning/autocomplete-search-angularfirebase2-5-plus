import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<any[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');

  constructor(private moviesSvc: MoviesService) {}

  ngOnInit() {
    this.movies$ = this.moviesSvc.getMovies(this.startAt);
  }

  search(searchText) {
    this.startAt.next(searchText);
  }
}

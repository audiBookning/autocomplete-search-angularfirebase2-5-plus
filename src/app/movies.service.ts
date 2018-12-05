import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private db: AngularFireDatabase) {}
  getMovies(start: BehaviorSubject<string>): Observable<any[]> {
    return start.pipe(
      switchMap(startText => {
        const endText = startText + '\uf8ff';
        return this.db
          .list('/movies', ref =>
            ref
              .orderByChild('Title')
              .limitToFirst(10)
              .startAt(startText)
              .endAt(endText)
          )
          .snapshotChanges()
          .pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(changes => {
              return changes.map(c => {
                return { key: c.payload.key, ...c.payload.val() };
              });
            })
          );
      })
    );
  }
}

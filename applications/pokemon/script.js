import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap,
  of,
  merge,
  from,
  filter,
  catchError,
  concat,
  take,
  EMPTY,
  pluck,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';

import {
  addResults,
  addResult,
  clearResults,
  endpointFor,
  search,
  form,
} from '../pokemon/utilities';

const endpoint = 'http://localhost:3333/api/pokemon/search/';

// autocomplete in rxjs
const search$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  // map(evt => evt.target.value),
  map((evt) => evt.target.value),
  distinctUntilChanged(),
  switchMap((searchTerm) => {
    return fromFetch(endpoint + searchTerm + '?delay=1000&chaos=true').pipe(
      mergeMap((res) => res.json()),
    );
  }),
  tap(clearResults),
  tap(console.log),
  pluck('pokemon'),
  tap(addResults),
);

search$.subscribe();

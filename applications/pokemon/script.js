import {
  first,
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
  renderPokemon,
} from '../pokemon/utilities';

const endpoint = 'http://localhost:3333/api/pokemon/';

const searchPokemon = (searchTerm) => {
  return fromFetch(
    endpoint + 'search/' + searchTerm + '?delay=1000&chaos=true',
  ).pipe(mergeMap((res) => res.json()));
};

const getPokemonData = (pokemon) => {
  return fromFetch(endpoint + pokemon.id).pipe(mergeMap((res) => res.json()));
};

const search$ = fromEvent(form, 'submit').pipe(
  map(() => search.value),
  switchMap(searchPokemon),
  pluck('pokemon'),
  mergeMap((pokemon) => pokemon),
  first(),
  tap(renderPokemon),
  switchMap((pokemon) => {
    const pokemon$ = of(pokemon);
    const additionalData$ = getPokemonData(pokemon).pipe(
      map((data) => ({
        ...pokemon,
        data,
      })),
    );
    return merge(pokemon$, additionalData$);
  }),
  tap(renderPokemon),
  tap(console.log),
);

// autocomplete in rxjs
const oldSearch$ = fromEvent(search, 'input').pipe(
  debounceTime(300),
  // map(evt => evt.target.value),
  map((evt) => evt.target.value),
  distinctUntilChanged(),
  searchPokemon,
  tap(clearResults),
  tap(console.log),
  pluck('pokemon'),
  tap(addResults),
);

// oldSearch$.subscribe();
search$.subscribe();

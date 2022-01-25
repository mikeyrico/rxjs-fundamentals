import { fromEvent, concat, of, race, timer } from 'rxjs';
import { tap, exhaustMap, delay, shareReplay, first } from 'rxjs/operators';

import {
  responseTimeField,
  showLoadingAfterField,
  showLoadingForAtLeastField,
  loadingStatus,
  showLoading,
  form,
  fetchData,
} from './utilities';

const loading$ = fromEvent(form, 'submit').pipe(
  // before
  // tap(() => showLoading(true)),
  // exhaustMap(() => fetchData()),
  // tap(() => showLoading(false))

  // after with show and hide loading observables above
  exhaustMap(() => {
    const data$ = fetchData().pipe(shareReplay(1));
    const showLoading$ = of(true).pipe(
      delay(+showLoadingAfterField.value),
      tap(() => showLoading(true)),
    );

    // const hideLoading$ = of(true).pipe(
    //   delay(+showLoadingForAtLeastField.value),
    //   tap(() => showLoading(false)),
    // );

    const timeToHideLoading$ = timer(+showLoadingForAtLeastField.value).pipe(first());

    const shouldShowLoading$ = concat(
      showLoading$,
      timeToHideLoading$,
      data$.pipe(tap(() => showLoading(false)))
    )
    // const shouldShowLoading$ = race(showLoading$, data$);
    // return concat(shouldShowLoading$, hideLoading$);
    return race(shouldShowLoading$, data$)
  }),
);

loading$.subscribe();

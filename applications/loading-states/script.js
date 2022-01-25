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

const showLoading$ = of(true).pipe(
  delay(+showLoadingAfterField.value),
  tap(() => showLoading(true)),
);

const hideLoading$ = of(true).pipe(
  delay(+showLoadingForAtLeastField.value),
  tap(() => showLoading(false)),
);

const loading$ = fromEvent(form, 'submit').pipe(
  // before
  // tap(() => showLoading(true)),
  // exhaustMap(() => fetchData()),
  // tap(() => showLoading(false))

  // after with show and hide loading observables above
  exhaustMap(() => concat(showLoading$, fetchData(), hideLoading$)),
);

loading$.subscribe();

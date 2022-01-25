import {
  switchMap,
  fromEvent,
  interval,
  merge,
  NEVER,
  skipUntil,
  takeUntil,
  scan,
  map,
  mapTo,
} from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

// observables created for dom nodes
const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));

// switchMap play and pause
// subscribe to timer when playing

const timer$ = merge(start$, pause$).pipe(
  switchMap((isRunning) => {
    console.log('isRunning', isRunning);
    return isRunning ? interval(1000) : NEVER;
  }),
  // must use scan to maintain the state
  // the interval will create a fresh interval every time
  scan((total) => total + 1, 0),
);

timer$.subscribe(setCount);

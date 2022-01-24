import {
  fromEvent,
  interval,
  merge,
  NEVER,
  skipUntil,
  takeUntil,
  scan,
  map,
} from 'rxjs';
import { setCount, startButton, pauseButton } from './utilities';

// observables created for dom nodes
const start$ = fromEvent(startButton, 'click');
const pause$ = fromEvent(pauseButton, 'click');

let timer$ = interval(1000).pipe(
  skipUntil(start$),
  scan((acc, curr) => {
    return acc + 1;
  }, 0),
  takeUntil(pause$),
);

timer$.subscribe(setCount);

// subscribe to start$
// -- create timer
// -- subscribe to cound

// pause, unsubscribe

// let timer$ = interval(1000);
// let tSub;
// start$.subscribe((x) => {
//   tSub = timer$.subscribe(setCount);
// });

// pause$.subscribe(() => {
//   tSub.unsubscribe()
// });

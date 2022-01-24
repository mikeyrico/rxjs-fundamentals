import { from, of } from 'rxjs';

describe('Basic Observables', () => {
  describe(of, () => {
    it('should create an observable from its arguments', () => {
      const result = [];

      const observable$ = of(1, 2, 3, 4)
      observable$.subscribe((val) => {
        result.push(val)
      })

      expect(result).toEqual([1, 2, 3, 4]);
    });
  });

  describe(from, () => {
    it('should create an observable', () => {
      const result = [];
      const obs$ = from([1, 2, 3, 4])
      obs$.subscribe(val => {
        result.push(val)
      })
      expect(result).toEqual([1, 2, 3, 4]);
    });
  });
});

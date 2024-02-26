import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

export class LoadingHandler {
  private _isLoading$ = new BehaviorSubject(false);

  isLoading$: Observable<boolean> = this._isLoading$.pipe(
    switchMap((isLoading) => {
      if (!isLoading) {
        return of(false);
      }
      return of(true);
    })
  );

  get isLoading(): boolean {
    return this._isLoading$.value;
  }

  start() {
    this._isLoading$.next(true);
  }

  stop() {
    this._isLoading$.next(false);
  }
}

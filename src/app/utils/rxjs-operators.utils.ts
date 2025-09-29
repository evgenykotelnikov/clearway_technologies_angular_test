import { WritableSignal } from "@angular/core";
import { defer, finalize, Observable, pipe } from "rxjs";

export function indicateLoading<T>(
  indicator: WritableSignal<boolean> | null
): (source: Observable<T>) => Observable<T> {
  return pipe(
    (source$: Observable<T>) =>
      defer(() => {
        indicator?.set(true);
        return source$;
      }),
    finalize(() => indicator?.set(false))
  );
}
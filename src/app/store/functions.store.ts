import { cloneDeep, isEqual } from 'lodash-es';
import { Observable, filter, map, pairwise, startWith } from 'rxjs';

export function newStateWithAction<TState>(
  state: TState,
  action: (state: TState) => void
): TState {
  const result = cloneDeep(state);
  action(result);
  return result;
}

export function distinctUntilValueChanged<T>(
  source: Observable<T>
): Observable<T> {
  const result = source.pipe(
    startWith(null),
    pairwise(),
    filter((pairs) => pairs[0] == null || !isEqual(pairs[0], pairs[1])),
    map((pairs) => pairs[1]!)
  );
  return result;
}

export function GuidGenerator(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const emptyGuid = '00000000-0000-0000-0000-000000000000';

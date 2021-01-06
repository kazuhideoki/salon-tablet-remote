type ReducerLogger<T> = {
  state: T;
  newState: T;
  func: any;
  action: any;
};
export function reducerLogger<T>({
  state,
  newState,
  func,
  action,
}: ReducerLogger<T>): void {
  if (process.env.NODE_ENV === 'production') return;

  console.group('Action ' + func.name);
  console.info('%cprev state', 'color: grey; font-weight: bold', state);
  console.info('%caction', 'color: blue; font-weight: bold', action);
  console.info('%cnext state', 'color: green; font-weight: bold', newState);
  console.groupEnd();
}

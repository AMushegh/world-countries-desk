import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";

type StoreType = Record<string, Record<string, BehaviorSubject<unknown>>>;
export type SliceType = { [key: string]: BehaviorSubject<unknown> };
export type SliceTypeGeneric<T> = { [key in keyof T]: BehaviorSubject<T[key]> };

@singleton()
class Store {
  private store: StoreType = {};

  public createSlice<
    T extends { [key: string]: unknown },
    U extends { [key in keyof T]: BehaviorSubject<T[key]> }
  >(sliceName: string, initialState: T): U {
    const initialStateKeys = Object.keys(initialState);

    this.store[sliceName] = {};

    initialStateKeys.forEach((initialStateKey) => {
      this.store[sliceName][initialStateKey] = new BehaviorSubject(
        initialState[initialStateKey]
      );

      this.store[sliceName][initialStateKey].subscribe();
    });

    return this.store[sliceName] as U;
  }

  public emptySlice(sliceName: string) {
    this.store[sliceName] = {};
  }
}

export default Store;

import { useEffect, useMemo, useState } from "react";
import { Observable, Subject, takeUntil } from "rxjs";
import { container } from "tsyringe";

import StoreSlice from "../utils/store/Slice";
import { SliceType } from "../utils/store/Store";

type extractGeneric<Type> = Type extends Observable<infer X> ? X : null;

const useStore = <
  T extends { new (...args: any[]): StoreSlice },
  U extends keyof InstanceType<T>["data"]
>(
  Slice: T,
  propertyNames: Array<U>
): {
  [K in U]: extractGeneric<InstanceType<T>["data"][K]>;
} => {
  const initialProperties = useMemo(() => {
    let initialPropertiesCollector: {
      [K in U]: extractGeneric<InstanceType<T>["data"][K]>;
    };

    propertyNames.forEach((propertyName) => {
      const sliceData = container.resolve(Slice).data;
      if (typeof initialPropertiesCollector === "undefined") {
        initialPropertiesCollector = {
          [propertyName]: sliceData[propertyName as keyof SliceType].value,
        } as {
          [K in U]: extractGeneric<InstanceType<T>["data"][K]>;
        };
      } else {
        initialPropertiesCollector[propertyName] = sliceData[
          propertyName as keyof SliceType
        ].value as extractGeneric<InstanceType<T>["data"][U]>;
      }
    });

    return initialPropertiesCollector;
  }, []);

  const [state, setState] = useState<{
    [K in U]: extractGeneric<InstanceType<T>["data"][U]>;
  }>(initialProperties);

  useEffect(() => {
    const unsubscriber = new Subject<void>();

    propertyNames.forEach((propertyName) => {
      container
        .resolve(Slice)
        .data[propertyName as keyof SliceType].pipe(takeUntil(unsubscriber))
        .subscribe((value) => {
          setState((prevState) => ({ ...prevState, [propertyName]: value }));
        });
    });

    return () => {
      unsubscriber.next();
      unsubscriber.complete();
    };
  }, []);

  return state;
};

export default useStore;

import { useMemo } from "react";
import { container, InjectionToken } from "tsyringe";

const useController = <T>(controller: InjectionToken<T>) =>
  useMemo(() => container.resolve(controller), []);

export default useController;

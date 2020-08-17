import {useCallback, useEffect, useRef, useState} from "react";

import {Handler, UseDebounce, DebounceOpts, defaultOpts} from "./debounce.types";
import {isPersistable} from "./persistable";
import {noop} from "./utils";

export const useDebounce: UseDebounce = <T extends Handler>(
  fn: T,
  overrideOpts?: number | Partial<DebounceOpts>,
) => {
  const callback = useCallback(fn, []);
  const opts = Object.assign(
    defaultOpts,
    Number.isInteger(overrideOpts) ? {delay: overrideOpts} : overrideOpts,
  );

  const [ready, setReady] = useState(false);
  const timeout = useRef(0);
  const wrapper = useRef<(...params: Parameters<T>) => void>(noop);
  const abort = useRef(noop);
  const terminate = useRef(noop);

  useEffect(() => {
    wrapper.current = (...params: Parameters<T>) => {
      if (opts.persist && isPersistable(params)) {
        params.persist();
      }

      const wrapper = () => {
        callback(...params);
        timeout.current = 0;
      };

      abort.current = () => {
        window.clearTimeout(timeout.current);
        abort.current = noop;
        terminate.current = noop;
      };

      terminate.current = () => {
        if (timeout.current) {
          window.clearTimeout(timeout.current);
          terminate.current = noop;
          abort.current = noop;
          wrapper();
        }
      };

      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(wrapper, opts.delay);
    };

    setReady(true);
  }, [ready, callback, opts.delay, opts.persist]);

  return Object.assign(wrapper.current, {
    abort: () => abort.current(),
    terminate: () => terminate.current(),
  });
};

export default useDebounce;

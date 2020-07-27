import { useReducer, useEffect } from 'react';
import produce from 'immer';

const DEFAULT_ERROR = 'There was an error!';

export interface State<E> {
  data: E;
  isLoading: boolean;
  error: any;
}

export interface RequestResult<E> {
  data: E;
  isLoading: boolean;
  error: any;
  run: (req: () => Promise<any>, transformFn?: any) => void;
  setData: (data: E) => void;
}

enum Action {
  Success = 'SET_SUCCESS',
  Error = 'SET_ERROR',
  Update = 'SET_DATA',
}

const reducer = produce((draft, action) => {
  switch (action.type) {
    case Action.Success:
      draft.isLoading = false;
      draft.data = action.data;
      draft.error = null;
      return;
    case Action.Error:
      draft.isLoading = false;
      draft.error = action.message || DEFAULT_ERROR;
    case Action.Update:
      draft.data = action.data;
  }
});

async function resolve<R, E>(dispatch: React.Dispatch<any>, req: () => Promise<any>, transformFn?: (response: R) => E): Promise<void> {
  try {
    const response: any = await req();
    if (response.status === 'OK') {
      dispatch({
        type: Action.Success,
        data: transformFn ? transformFn(response) : response,
      });
    } else {
      dispatch({
        type: Action.Error,
        message: response.message,
      });
    }
  } catch (err) {
    console.info(err);
    dispatch({
      type: Action.Error,
      message: err.message,
    });
  }
}

/**
 * Used to hook an AJAX request into a component's render lifecycle
 * 
 * run: allows for running the same or a different query based on an action, like an onClick
 * setData: allows for updating state.data
 * 
 * @param request a function that returns a PostJSON / GetJSON promise call, usually wrapped in React.useCallback
 * @param transformFn a function that transforms the response from the PostJSON / GetJSON call
 * @param enabled use this boolean to enable / disable the useEffect hook from running
 */
function useRequestJSON<R, E>(request: () => Promise<any>, transformFn?: (response: R) => E, enabled = true): RequestResult<E> {
  const initialState: State<E> = {
    data: null,
    isLoading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (enabled) {
      resolve<R, E>(dispatch, request, transformFn);
    }
  }, [request, transformFn]);

  return {
    ...state,
    run(req: () => Promise<any>, transformFn: any) {
      resolve<R, E>(dispatch, req, transformFn);
    },
    setData(data: E) {
      dispatch({
        type: Action.Update,
        data,
      });
    }
  };
}

/**
 * Used for AJAX requests that occur exclusively via an event,
 * such as a click handler.
 * 
 * The difference from the above hook is that there is no useEffect,
 * so the AJAX request won't fire until run() is called explicitly.
 */
export function useRequestOnEvent<R, E>(): RequestResult<E> {
  const initialState: State<E> = {
    data: null,
    isLoading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    ...state,
    run(req: () => Promise<any>, transformFn?: any) {
      resolve<R, E>(dispatch, req, transformFn);
    }
  };
}

export default useRequestJSON;

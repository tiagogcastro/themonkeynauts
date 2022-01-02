import { useState } from 'react'

export type UseBooleanTypes = {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  changeToTrue: () => void;
  changeToFalse: () => void;
}

export function useBoolean(initialState?: boolean) {
  const [state, setState] = useState(initialState || false);

  function changeToTrue() {
    setState(true);
  }

  function changeToFalse() {
    setState(false);
  }

  return {
    setState,
    state,
    changeToTrue,
    changeToFalse
  }
}
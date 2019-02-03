import { Action } from '@ngrx/store';


export interface State {
  sessions:string[];
}

export const initialState: State = {
  sessions:["hello","world"]
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}

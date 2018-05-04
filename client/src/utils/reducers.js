import { createAsyncActionsConf } from './actions';

const FETCH_INITIAL_STATE = {loading: false, _meta: {}, errors: [], data: []};

export function createCombinedFetchReducer(initialData, configs, extra={}) {
  const callbacksConf = {};
  configs.forEach(conf => {
    const { event, initialData, dataProcessor, successProcessor, failProcessor, callbacks } = conf;
    Object.assign(callbacksConf, {
      ...createFetchReducerCallbacks(event, initialData, {dataProcessor, successProcessor, failProcessor}),
      ...callbacks
    });
  });
  Object.assign(callbacksConf, extra.callbacks);
  return createReducer({...FETCH_INITIAL_STATE, data: initialData}, callbacksConf);
}


export function createReducer(initialState, handlers) {
  function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
  reducer.handlers = handlers;
  reducer.initialState = initialState;
  return reducer;
}

export const createFetchReducerCallbacks = (event, initialData, {dataProcessor, successProcessor, startProcessor, failProcessor}) => {
  let conf = event;
  if (typeof event === 'string') {
    conf = createAsyncActionsConf(event);
  }
  return {
    [conf.startEvent](state, action) {
      let extraState = {};
      if (startProcessor) {
        extraState = startProcessor(state, action);
      }
      return {...state, errors: [], loading: true, ...extraState};
    },
    [conf.successEvent](state, action) {
      let data = action.data;
      let extraState = {};
      if (successProcessor) {
        extraState = successProcessor(state, action);
      }
      if (dataProcessor) {
        data = dataProcessor(data, state);
      }
      return {...state, errors: [], loading: false, data, ...extraState};
    },
    [conf.failEvent](state, action) {
      let errors = [];
      if (action.data && action.data.errors) {
        errors = action.data.errors;
      }
      return {...state, errors, loading: false, ...(failProcessor && failProcessor(state, action))};
    }
  }
}


export const createFetchReducer = (event, initialData = [], callbacks = {}, dataProcessor = null) => {
  return createReducer({...FETCH_INITIAL_STATE, errors: [], data: initialData}, {
    ...createFetchReducerCallbacks(event, initialData, dataProcessor),
    ...callbacks
  });
}

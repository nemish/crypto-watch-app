import { store } from '@/index';


export function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    })
    return action;
  }
}


function makeQuery(payload) {
    const esc = encodeURIComponent;
    return Object.keys(payload || {})
        .map(k => `${esc(k)}=${esc(payload[k])}`)
        .join('&');
}


export function createAsyncAction(conf) {
  const startActionCreator = makeActionCreator(conf.startEvent || conf.event + '__START', 'data');
  const successActionCreator = makeActionCreator(conf.successEvent || conf.event + '__SUCCESS', 'data', 'payload');
  let failActionCreator = null;

  let failEvent = conf.failEvent;
  if (!failEvent) {
    failEvent = conf.event + '__FAIL';
  }

  if (failEvent) {
    failActionCreator = makeActionCreator(failEvent, 'data', 'payload');
  }

  function makeRequest(payload) {
    return function (dispatch) {
      dispatch(startActionCreator(payload));
      let url = conf.url;
      let method = conf.method;
      if (typeof url === "function") {
        url = url(payload);
      }

      if (typeof method === "function") {
        method = method(payload);
      }

      const query = makeQuery(payload);
      let params = {
          credentials: 'same-origin'
      }
      let headers = {};
      if (method == 'post') {
        headers['Content-Type'] = 'application/json; charset=utf-8';
      }
      if (conf.authorized) {
        const data = store.getState().user._meta || {};
        const { token } = data;
        if (token && token.length) {
          headers['Authorization'] = 'Bearer ' + token;
        }
      }
      if (method == 'post') {
        params = {
            ...params,
            method: 'POST',
            body: JSON.stringify(payload),
        }
      } else if (!method || method === 'get') {
        url = url + (query.length ? '?' + query : '');
      }

      params.headers = headers;
      return fetch(url, params)
        .then(resp => {
            if (!resp.ok) {
              if (resp.status === 404) {
                return Promise.reject();
              }
              return resp.json().then(err => {throw err});
            }
            if (resp.status === 401) {
                window.location = '/';
            }
            return resp;
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch(successActionCreator(data));
            return data;
        })
        .catch(err => {
            if (failEvent) {
                dispatch(failActionCreator(err));
            }
            return Promise.reject(err);
        });
    }
  }
  makeRequest.successAction = successActionCreator
  makeRequest.conf = conf;
  return makeRequest;
}


export const createAsyncActionsConf = actionName => {
    return {
        actionName,
        startEvent: actionName + '__START',
        successEvent: actionName + '__SUCCESS',
        failEvent: actionName + '__FAIL',
    }
}

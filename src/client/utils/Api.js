const { fetch, Headers } = require('fetch-ponyfill')();

export default class Api {
  static createHeaders(overrides = {}) {
    // setup headers
    return new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      ...overrides,
    });
  }

  static get({ path, headers = {}, payload = {} }) {
    let updatedPath = path;

    const keys = Object.keys(payload);
    if (keys.length > 0) {
      const qs = [];
      for (let i = 0; i < keys.length; i += 1) {
        qs.push(`${keys[i]}=${encodeURIComponent(payload[keys[i]])}`);
      }

      updatedPath += `?${qs.join('&')}`;
    }

    return Api.makeRequest({
      method: 'GET',
      path: updatedPath,
      headers,
    });
  }

  static post({ path, headers = {}, payload = {} }) {
    return Api.makeRequest({
      method: 'POST',
      path,
      payload,
      headers,
    });
  }

  static put({ path, headers = {}, payload = {} }) {
    return Api.makeRequest({
      method: 'PUT',
      path,
      payload,
      headers,
    });
  }

  static patch({ path, headers = {}, payload = {} }) {
    return Api.makeRequest({
      method: 'PATCH',
      path,
      payload,
      headers,
    });
  }

  static delete({ path, headers = {}, payload = {} }) {
    return Api.makeRequest({
      method: 'DELETE',
      path,
      payload,
      headers,
    });
  }

  static makeRequest({ method, path, headers = {}, payload = {} }) {
    const opts = {
      method,
      headers: Api.createHeaders(headers),
    };

    if (Object.keys(payload).length > 0) {
      opts.body = JSON.stringify(payload);
    }

    return fetch(path, opts);
  }
}

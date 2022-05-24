import { Http } from '@capacitor-community/http';
import type { HttpOptions } from '@capacitor-community/http';

export function fetchProxy (url:string, options:RequestInit): Promise<Response> {
  return new Promise((resolve, reject) => {
    const {
      body,
      method = 'GET',
      headers,
    } = options;

    const request = {} as HttpOptions;
    request.url = url;
    body && (request.data = body);
    method && (request.method = method);
    headers && Array.isArray(headers) === false && (request.headers = headers as Record<string, string>);

    Http.request(request)
      .then(({ data, status, headers }) => {
        resolve(new Response(
          JSON.stringify(data),
          {
            status,
            headers,
          },
        ));
      })
      .catch(reject);
  });
}

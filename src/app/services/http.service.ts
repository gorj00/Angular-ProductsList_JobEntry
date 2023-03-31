import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable()
export class HttpService {
  private api = '';

  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private apiUrl?: string
  ) {
    if (apiUrl) (this.api = apiUrl)
  }

  /**
   * GET request
   * @param {string} endPoint end point of the api
   * @param {Object} params of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.api + endPoint, options);
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} body body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, body: Object, options?: IRequestOptions): Observable<T> {
    return this.http.post<T>(this.api + endPoint, body, options);
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} body body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, body?: Object, options?: IRequestOptions): Observable<T> {
    return this.http.put<T>(this.api + endPoint, body, options);
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(this.api + endPoint, options);
  }

}

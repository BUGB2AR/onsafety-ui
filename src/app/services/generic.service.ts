import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export abstract class ApiService<T, ID> {
  protected baseURL = environment.apiUrl;

  protected constructor(
    protected http: HttpClient,
    protected path: string,
    protected errorService: any
  ) {}

  protected options(httpParams: HttpParams = new HttpParams()) {
    return {
      headers: this.headers(),
      params: httpParams
    };
  }

  protected headers(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return headers;
  }

  toPromise<R>(request: Observable<Object>): Promise<R> {
    return new Promise((resolve, reject) => {
      request.subscribe({
        next: (data) => {
          resolve(data as R);
        },
        error: (error) => {
          this.errorService.capture(error);
          reject(error);
        }
      });
    });
  }

  add(entity: T): Observable<T> {
    return this.http.post<T>(`${this.baseURL}/${this.path}`, entity, this.options());
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseURL}/${this.path}`, this.options());
  }

  findById(id: ID): Observable<T> {
    return this.http.get<T>(`${this.baseURL}/${this.path}/${id}`, this.options());
  }

  update(id: ID, entity: T): Observable<T> {
    return this.http.put<T>(`${this.baseURL}/${this.path}/${id}`, entity, this.options());
  }

  delete(id: ID): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${this.path}/${id}`, this.options());
  }
}

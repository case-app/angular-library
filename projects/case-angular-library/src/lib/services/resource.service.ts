import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { CaseConfig } from '../interfaces/case-config.interface'
import { SelectOption } from '../interfaces/select-option.interface'

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(
    private http: HttpClient,
    @Inject('CASE_CONFIG_TOKEN') private config: CaseConfig
  ) {}

  list(resourceName: string, refineParams?: object): Observable<any> {
    let httpParams = new HttpParams()

    if (refineParams) {
      Object.keys(refineParams).forEach((key: string) => {
        if (Array.isArray(refineParams[key])) {
          refineParams[key].forEach((value: string) => {
            httpParams = httpParams.append(key, value)
          })
        } else {
          httpParams = httpParams.set(key, refineParams[key])
        }
      })
    }

    return this.http
      .get(`${this.config.apiBaseUrl}/${resourceName}`, {
        params: httpParams
      })
      .pipe(
        map((res) => {
          return res
        })
      )
  }

  listSelectOptions(
    resourceName: string,
    refineParams?: object
  ): Promise<SelectOption[]> {
    return this.list(`${resourceName}/select-options`, refineParams).toPromise()
  }

  show(
    resourceName: string,
    id: number | string,
    suffix?: string
  ): Observable<any> {
    return this.http
      .get(
        `${this.config.apiBaseUrl}/${resourceName}/${id}` +
          (suffix ? `/${suffix}` : '')
      )
      .pipe(
        map((res) => {
          return res
        })
      )
  }

  store(resourceName: string, body: any): Observable<any> {
    return this.http
      .post(`${this.config.apiBaseUrl}/${resourceName}`, body)
      .pipe(
        map((response) => {
          return response
        })
      )
  }

  duplicate(resourceName: string, id: number | string): Observable<any> {
    return this.http
      .post(`${this.config.apiBaseUrl}/${resourceName}/${id}/duplicate`, {})
      .pipe(
        map((res) => {
          return res
        })
      )
  }

  update(
    resourceName: string,
    id: number | string,
    body: any
  ): Observable<any> {
    return this.http
      .put(`${this.config.apiBaseUrl}/${resourceName}/${id}`, body)
      .pipe(
        map((res) => {
          return res
        })
      )
  }

  patch(path: string, formData?: FormData): Observable<any> {
    return this.http.patch(`${this.config.apiBaseUrl}${path}`, formData).pipe(
      map((res) => {
        return res
      })
    )
  }

  delete(resourceName: string, id: number | string): Observable<any> {
    return this.http
      .delete(`${this.config.apiBaseUrl}/${resourceName}/${id}`)
      .pipe(
        map((res) => {
          return res
        })
      )
  }
}

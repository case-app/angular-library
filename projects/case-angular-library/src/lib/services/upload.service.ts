import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AbacusConfig } from '../interfaces/abacus-config.interface'

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private http: HttpClient,
    @Inject('ABACUS_CONFIG_TOKEN') private config: AbacusConfig
  ) {}

  uploadImage(resourceName: string, fileContent: any): Observable<any> {
    return this.upload('image', resourceName, fileContent)
  }

  uploadFile(resourceName: string, fileContent: any): Observable<any> {
    return this.upload('file', resourceName, fileContent)
  }

  private upload(
    uploadType: string,
    resourceName: string,
    fileContent: any
  ): Observable<any> {
    const formData = new FormData()

    formData.append('file', fileContent)
    formData.append('resourceName', resourceName)

    return this.http
      .post(`${this.config.apiBaseUrl}/upload/${uploadType}`, formData)
      .pipe(
        map((response: { path: string }) => {
          return response
        })
      )
  }
}

import { Component, Inject, Input } from '@angular/core'
import { AbacusConfig } from '../../../interfaces/abacus-config.interface'

@Component({
  selector: 'abc-download-yield',
  templateUrl: './download-yield.component.html',
  styleUrls: ['./download-yield.component.scss']
})
export class DownloadYieldComponent {
  @Input() filePath: string
  storagePath: string = this.config.storagePath

  constructor(@Inject('ABACUS_CONFIG_TOKEN') private config: AbacusConfig) {}
}

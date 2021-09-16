import { Component } from '@angular/core'
import { BreadcrumbService } from '../../services/breadcrumb.service'
import { MetaService } from '../../services/meta.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(breadcrumbService: BreadcrumbService, metaService: MetaService) {
    breadcrumbService.breadcrumbLinks.next([])
    metaService.setTags({
      title: 'Accueil',
      path: ''
    })
  }
}

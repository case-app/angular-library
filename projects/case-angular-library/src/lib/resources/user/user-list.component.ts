import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { CaseListComponent } from '../../components/case-list.component'
import { CaseConfig } from '../../interfaces/case-config.interface'
import { ResourceDefinition } from '../../interfaces/resource-definition.interface'
import { Yield } from '../../interfaces/yield.interface'
import { BreadcrumbService } from '../../services/breadcrumb.service'
import { FlashMessageService } from '../../services/flash-message.service'
import { ResourceService } from '../../services/resource.service'
import { caseListTemplate } from '../../templates/case-list.template'
import { userDefinition } from './user.definition'
import { userYields } from './user.yields'

@Component({
  template: caseListTemplate
})
export class UserListComponent extends CaseListComponent implements OnInit {
  definition: ResourceDefinition = userDefinition
  yields: Yield[] = userYields

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    breadcrumbService: BreadcrumbService,
    resourceService: ResourceService,
    flashMessageService: FlashMessageService,
    @Inject('CASE_CONFIG_TOKEN') config: CaseConfig
  ) {
    super(
      router,
      activatedRoute,
      breadcrumbService,
      resourceService,
      flashMessageService,
      config
    )
  }

  ngOnInit(): void {
    this.initListView()
  }
}

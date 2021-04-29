import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { AbcListComponent } from '../../../components/abc-list.component'
import { AbacusConfig } from '../../../interfaces/abacus-config.interface'
import { ResourceDefinition } from '../../../interfaces/resource-definition.interface'
import { Yield } from '../../../interfaces/yield.interface'
import { BreadcrumbService } from '../../../services/breadcrumb.service'
import { FlashMessageService } from '../../../services/flash-message.service'
import { ResourceService } from '../../../services/resource.service'
import { abcListTemplate } from '../../../templates/abc-list.template'
import { roleDefinition } from '../role.definition'
import { roleYields } from '../role.yields'

@Component({ template: abcListTemplate })
export class RoleListComponent extends AbcListComponent implements OnInit {
  definition: ResourceDefinition = roleDefinition
  yields: Yield[] = roleYields

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService,
    @Inject('ABACUS_CONFIG_TOKEN') config: AbacusConfig
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

  ngOnInit() {
    this.initListView()
  }
}

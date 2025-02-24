import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

import { Breadcrumb } from '../../model/breadcrumb.model';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @ContentChild('buttons') buttonsTemplate!: TemplateRef<any>;
  @Input() breadcrumbs!: Breadcrumb[];

  ngOnInit() {
    if (!this.breadcrumbs) {
      throw new Error('Breadcrumbs is required');
    }
  }
}

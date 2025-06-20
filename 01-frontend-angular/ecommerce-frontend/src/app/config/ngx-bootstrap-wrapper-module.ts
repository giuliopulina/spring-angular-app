import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    PaginationModule.forRoot() 
  ],
  exports: [
    PaginationModule
  ]
})
export class NgxBootstrapWrapperModule {}
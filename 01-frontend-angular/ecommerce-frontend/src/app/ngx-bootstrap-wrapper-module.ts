import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    PaginationModule.forRoot() // ✅ QUI SI PUÒ
  ],
  exports: [
    PaginationModule // ✅ Rendi disponibile a chi importa questo modulo
  ]
})
export class NgxBootstrapWrapperModule {}
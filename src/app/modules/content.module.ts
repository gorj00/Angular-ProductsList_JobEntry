import { ContentRoutingModule } from './content-routing.module'
import { NgModule } from '@angular/core';
import { ContentComponent } from '../layout/content/content.component'

@NgModule({
  declarations: [
    ContentComponent,
  ],
  imports: [
    ContentRoutingModule,
  ],
  providers: [],
  bootstrap: []
})
export class ContentModule { }

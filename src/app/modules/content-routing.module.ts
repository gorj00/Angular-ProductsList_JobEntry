import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from '../layout/content/content.component';
// import { BlogModule } from '../containers/blog/blog.module';
const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: '', component: ContentComponent, children: [
    {
      path: 'products',
      loadChildren: () => import('../features/products/products.module').then(m => m.ProductsFeatureModule),
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }

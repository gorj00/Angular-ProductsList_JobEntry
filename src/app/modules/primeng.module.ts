import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule}  from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  imports: [CommonModule],
  exports: [
    AutoCompleteModule,
    ButtonModule,
    ListboxModule,
    DropdownModule,
    TabMenuModule,
    InputTextModule,
    CardModule,
    DividerModule,
    TableModule,
    KeyFilterModule,
  ],
})
export class PrimeNgModule {}

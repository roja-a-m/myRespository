import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SidebarComponent, MenuComponent, MenuItemComponent],
  providers: [],
  exports: [SidebarComponent]
})
export class SidebarModule { }

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  // Inputs
  @Input() menuItems: any;
  @Input() collapsible: boolean;

  @Output() hoverItem: EventEmitter<string> = new EventEmitter<string>();

  // Instance Variables
  sidebarHoverBoundaryStyles:any = {};

  constructor() { }

  ngOnInit() {
  }

  onHoverItem(top: string) {
    this.hoverItem.emit(top);
  }
}

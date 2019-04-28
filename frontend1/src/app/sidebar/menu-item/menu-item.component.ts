import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToggleSidebarService } from '../broadcasters/ham-press-broadcaster.service';
import { Router } from '@angular/router';
import {trigger, state, style, animate, transition } from  '@angular/animations';

@Component({
  selector: 'rc-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    trigger('listState', [
      state('hidden', style({
        height: 0
      })),
      state('visible', style({
        height: '*'
      })),
      transition('hidden => visible', animate('600ms ease')),
      transition('visible => hidden', animate('600ms ease'))
    ]),
    trigger('sidebarState', [
      state('expanded', style({
        opacity: '1'
      })),
      state('collapsed', style({
        opacity: '0'
      })),
      transition('expanded => collapsed', animate('200ms ease')),
      transition('collapsed => expanded', animate('200ms 400ms ease'))
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  // Inputs
  @Input() menuItem: any;
  // Outputs
  @Output() hoverItem: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('item') itemElement: ElementRef;
  @ViewChild('caretIcon') caretIcon: ElementRef;
  @ViewChild('listItemSpan') listItemSpan: ElementRef;

  sidebarExpanded: boolean = false;
  collapsibleListState: string = "hidden";
  collapsibleListSavedState: string = "hidden";
  caretClasses: any;

  constructor(private router: Router, private tss: ToggleSidebarService) { }

  ngOnInit() {
    this.tss.expansionAnnouncement$.subscribe((expansionState) => {
      if (!expansionState) {
        this.collapsibleListSavedState = this.collapsibleListState;
        this.collapsibleListState = "hidden";
      } else {
        this.collapsibleListState = this.collapsibleListSavedState;
      }
      this.sidebarExpanded = expansionState;
    });
  }

  ngAfterViewInit() {
    let that = this;

    if (this.menuItem.url && this.itemElement) {
      this.itemElement.nativeElement.onclick = function () {
        that.router.navigate([that.menuItem.url]);
      }
    }
  }

  // A replacement of routerLinkActive when routed using router.navigate
  isActive(instruction: any[]): boolean {
      return this.router.isActive(this.router.createUrlTree(instruction), true);
  }
  onMouseEnterOverItem(event) {
    this.hoverItem.emit(String(event.target.getBoundingClientRect().top));
  }

  onMouseLeaveFromItem($event) {
    this.hoverItem.emit(String(-200));
  }

  onClickItemIcon(event) {
    this.tss.expandSidebarAnnouncement();
  }

  anyChildren(menuItem) {
    return menuItem.children && menuItem.children.length > 0;
  }

  onClickListItem(event) {
    this.toggleChildrenList();
  }

  toggleChildrenList() {
    this.collapsibleListState = (this.collapsibleListState == "hidden" ? "visible" : "hidden");
  }

  onHoverItem(event) {
    this.hoverItem.emit(event);
  }

  translateSidebarState(sidebarExpanded): string {
    return sidebarExpanded ? 'expanded' : 'collapsed';
  }

  sidebarAnimationStarted(event) {
    if (event.toState == "expanded") {
      this.caretIcon && (this.caretIcon.nativeElement.style.display = "inline-block");
      this.listItemSpan && (this.listItemSpan.nativeElement.style.display = "inline-block");
    }
  }

  sidebarAnimationEnded(event) {
    if (event.toState != "expanded") {
      this.caretIcon && (this.caretIcon.nativeElement.style.display = "none");
      this.listItemSpan && (this.listItemSpan.nativeElement.style.display = "none");
    }
  }
}
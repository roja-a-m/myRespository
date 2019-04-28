import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { ToggleSidebarService } from '../broadcasters/ham-press-broadcaster.service';
import {trigger, state, style, animate, transition } from  '@angular/animations';
@Component({
  selector: 'rc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('userSectionState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden => visible', animate('200ms 400ms ease')),
      transition('visible => hidden', animate('200ms ease'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  //Inputs
  @Input() menuItems: any;

  //ViewChild
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('navProfileImage') navProfileImage: ElementRef;
  @ViewChild('navProfileInfo') navProfileInfo: ElementRef;

  //Outputs
  @Output() changeWidth: EventEmitter<string> = new EventEmitter<string>();

  ngClasses: any = {}
  ngStyles: any = {}
  collapsible:string;

  // Instance Variables
  isSidebarExpanded: boolean = false;
  sidebarHoverBoundaryStyles: any = {};

  constructor(private tss: ToggleSidebarService, private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.tss.expansionAnnouncement$.subscribe((expansionState) => {
      this.toggleSidebar(expansionState);
      this.changeWidth.emit(expansionState ? "expanded" : "collapsed");
    });
    
    setTimeout(() => {
      
    }, 0)
  }

  ngAfterViewInit() {
    this.tss.expandSidebarAnnouncement();
    this.cdr.detectChanges();
  }

  toggleSidebar(expansionState) {
    this.isSidebarExpanded = expansionState;
    this.sidebarHoverBoundaryStyles["left"] = expansionState ? "196px" : "46px";
  }

  onHoverItem(top: string) {
    this.sidebarHoverBoundaryStyles["top"] = top + 'px';
  }

  translateSidebarState(isSidebarExpanded) {
    return isSidebarExpanded ? 'visible' : 'hidden';
  }

  userSectionAnimationStarted(event) {
    if (event.toState == "visible") {
      this.navProfileImage && (this.navProfileImage.nativeElement.style.display = "block");
      this.navProfileInfo && (this.navProfileInfo.nativeElement.style.display = "block");
    }
  }

  userSectionAnimationEnded(event) {
    if (event.toState != "visible") {
      this.navProfileImage && (this.navProfileImage.nativeElement.style.display = "none");
      this.navProfileInfo && (this.navProfileInfo.nativeElement.style.display = "none");
    }
  }
}

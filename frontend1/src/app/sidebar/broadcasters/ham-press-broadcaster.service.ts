import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ToggleSidebarService {

  // Observable string sources
  private inExpandedState: boolean;
  private expansionAnnouncementSource = new Subject<boolean>();

  // Observable string streams
  expansionAnnouncement$ = this.expansionAnnouncementSource.asObservable();

  // Service message commands
  toggleSidebarAnnouncement() {
    this.inExpandedState = !this.inExpandedState;
    this.expansionAnnouncementSource.next(this.inExpandedState);
  }

  expandSidebarAnnouncement() {
    this.inExpandedState = true;
    this.expansionAnnouncementSource.next(this.inExpandedState);
  }

  shrinkSidebarAnnouncement() {
    this.inExpandedState = false;
    this.expansionAnnouncementSource.next(this.inExpandedState);
  }
}

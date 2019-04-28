import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
// import { ConfirmDialogModule, FileUploadModule, PanelModule, GrowlModule, MenubarModule, DialogModule, ButtonModule, AutoCompleteModule, DataTableModule, SharedModule, DropdownModule, PickListModule, CheckboxModule, TriStateCheckboxModule, InputTextModule, InputTextareaModule, CalendarModule, PasswordModule, TabViewModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
// import { FileUploadModule } from 'primeng/primeng';
// import { ConfirmationService } from 'primeng/primeng';
import { AuthService } from './service/auth.service';
import { MessageService } from './service/message.service';
import { routing } from './app.routes';
import { EmailValidator } from './support/email.validator';
// import { SidebarModule } from './sidebar/sidebar.module';
import { ToggleSidebarService } from './sidebar/broadcasters/ham-press-broadcaster.service';


//ng2-bootstrap


//for jwt support
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from './auth/token.interceptor';
//toaster
// import {ToastyModule} from 'ng2-toasty';


//material modules
import { SharedMaterialModule } from './shared-modules/shared.module';
// import { ToastrModule } from 'ngx-toastr';
// import { QuestionAnswerComponent } from './entities/discussionforum/question-answer/question-answer.component';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { FileSaverModule } from 'ngx-filesaver';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatDialogModule } from '../../node_modules/@angular/material';
import { McBreadcrumbsService } from '../../node_modules/ngx-breadcrumbs';


import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//import {ForumModule} from '../../projects/forum/src/public_api';
import { environment } from '../environments/environment';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
        wheelPropagation: true
};


@NgModule({
        declarations: [
                AppComponent,
               
                // QuestionAnswerComponent
        ],
        imports: [

                //application modules
               
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                HttpModule,
                // angular material,
                SharedMaterialModule,
                //ng2-bootstrap


                // AngularMultiSelectModule,
                //     ToastyModule.forRoot(),

                // prime-ng
                // FileUploadModule,
                // DialogModule,

                // our application routes
                routing,
                //sidebar
                // SidebarModule,
                // ToastrModule.forRoot(),
                // FroalaEditorModule.forRoot(),
                // FroalaViewModule.forRoot(),
                FileSaverModule,
                PerfectScrollbarModule,
                McBreadcrumbsModule.forRoot(),
                RouterModule,
                BrowserModule.withServerTransition({ appId: 'my-app' })
        ],
        providers: [
                McBreadcrumbsService,
                // our application services
                AuthService,
                MessageService,
                //prime ng services
                // ConfirmationService,
                //sidebar
                ToggleSidebarService,
                {
                        provide: PERFECT_SCROLLBAR_CONFIG,
                        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                },
                {
                        provide: 'environment', useValue: environment.baseUrl
                }

        ],
        bootstrap: [AppComponent]
})
export class AppModule {
        constructor(
                @Inject(PLATFORM_ID) private platformId: Object,
                @Inject(APP_ID) private appId: string) {
                const platform = isPlatformBrowser(platformId) ?
                        'in the browser' : 'on the server';
        }
}

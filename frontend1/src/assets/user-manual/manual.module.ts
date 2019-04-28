//
// Copyright © 2016-2017 Infosys Limited, Bangalore, India. All Rights Reserved.
// * Except for any open source software components embedded in this
// * Infosys proprietary software program (Program), this Program is protected
// * by copyright laws, international treaties and other pending or existing
// * intellectual property rights in India, the United States and other countries.
// * Except as expressly permitted, any unauthorized reproduction, storage,
// * transmission in any form or by any means (including without limitation
// * electronic, mechanical, printing, photocopying, recording or otherwise),
// * or any distribution of this Program, or any portion of it,
// * may result in severe civil and criminal penalties, and
// * will be prosecuted to the maximum extent possible under the law.
// Template pack-angular:web/src/app/modules/entity.module.ts.e.vm
//

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//material module
import { SharedMaterialModule } from '../../app/shared-modules/shared.module';


import {ManualComponent} from '../user-manual/manual/manual.component';



// import { HelperService } from '../../service/helper.service';




@NgModule({
    declarations: [
       ManualComponent
    ],
    imports: [
        //material
        SharedMaterialModule,

        //angular
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        BrowserModule,

        //ng2 bootstrap

        //prime-ng
        // FileUploadModule,
        // AngularMultiSelectModule,

    ],
    exports: [
        ManualComponent
    ],
    providers: [
        // ConfirmationService,
        // HelperService
    ],
})
export class ManualModule { }
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
// Template pack-angular:web/src/app/app.routes.ts.p.vm
//
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AppComponent } from 'app/app.component';
import { from } from 'rxjs/internal/observable/from';

//import { ProjectCreateComponent } from 'app/entities/project/project-create.component';
export const routes: Routes = [
  { path: "#", component: AppComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});

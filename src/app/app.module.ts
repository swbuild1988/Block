import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlockComponent } from './component/block/block.component';
import { SceneComponent } from './component/scene/scene.component';

@NgModule({
    declarations: [
        AppComponent,
        BlockComponent,
        SceneComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

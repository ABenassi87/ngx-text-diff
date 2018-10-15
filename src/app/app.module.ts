import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxTextDiffModule } from '../../projects/ngx-text-diff/src/lib/ngx-text-diff.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, ComponentsModule, NgxTextDiffModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

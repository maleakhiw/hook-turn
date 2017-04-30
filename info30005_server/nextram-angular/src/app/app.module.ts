import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar.component';

import { KeysPipe } from './keys.pipe';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, NavbarComponent, KeysPipe ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }

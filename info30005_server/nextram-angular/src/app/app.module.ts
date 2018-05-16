import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { DepartureComponent } from './departure.component';
import { SmallDepartureComponent } from './small-departure.component';

import { KeysPipe } from './keys.pipe';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ AppComponent,
                  DepartureComponent, SmallDepartureComponent,
                  KeysPipe ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }

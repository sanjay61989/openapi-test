import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as MdiIcons from '@mdi/js';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JqxtableComponent } from './jqxtable/jqxtable.component';
import { jqxDomService } from './jqxtable/jqx-dom.service';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
   declarations: [AppComponent, JqxtableComponent],
   imports: [BrowserModule, AppRoutingModule, MatIconModule, BrowserAnimationsModule, jqxButtonModule, jqxGridModule],
   providers: [jqxDomService, provideAnimationsAsync('noop')],
   bootstrap: [AppComponent],
})
export class AppModule {
   constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
      Object.entries(MdiIcons).forEach(([iconName, pathData]) => {
         if (typeof pathData === 'string') {
            const safeSvg = domSanitizer.bypassSecurityTrustHtml(
               `<svg viewBox="0 0 24 24"><path d="${pathData}" /></svg>`
            );
            matIconRegistry.addSvgIconLiteral(iconName, safeSvg);
         }
      });
   }
}

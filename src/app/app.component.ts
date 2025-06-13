import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
})
export class AppComponent {
   title = 'openapi-test';
   safeHtml: any;
   constructor(private dom: DomSanitizer) {
      this.safeHtml = this.dom.bypassSecurityTrustHtml('<img src=x onerror=alert(1)>');
   }
   greet() {
      let unusedVar = 123; // Sonar should flag this as unused variable
      console.log('Hello World');
   }
   printLength(str?: string) {
      // Potential null or undefined dereference
      console.log(str!.length); // If str is undefined, this breaks
   }
   processData(data: any) {
      // Sonar should warn about any type usage
      console.log(data.value);
   }
   example() {
      return true;
      console.log('This will never run'); // Sonar should flag unreachable code
   }
   add(a: number, b: number) {
      return a + b;
   }

   sum(x: number, y: number) {
      return x + y; // Sonar might detect duplication depending on configuration
   }
   password = 'SuperSecret123'; // Sonar should flag hardcoded secrets
}

import { Injectable, Injector, EmbeddedViewRef, ComponentFactoryResolver, ApplicationRef } from '@angular/core';

@Injectable()
export class jqxDomService {
   componentRef: any;

   constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector
   ) {}

   loadComponent(component: any, ownerElement: HTMLElement) {
      const componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

      this.appRef.attachView(componentRef.hostView);

      const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

      ownerElement?.appendChild(domElement);

      this.componentRef = componentRef;

      return { componentRef, domElement };
   }

   destroy() {
      if (this.componentRef) {
         this.appRef.detachView(this.componentRef.hostView);
         this.componentRef.destroy();
      }
   }
}

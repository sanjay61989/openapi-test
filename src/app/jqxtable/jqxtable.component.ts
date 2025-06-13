import { Component, ViewChild } from '@angular/core';
import { jqxDomService } from './jqx-dom.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

export interface Hero {
   id: number;
   name: string;
}

@Component({
   selector: 'app-jqxtable',
   templateUrl: './jqxtable.component.html',
   styleUrls: ['./jqxtable.component.scss'],
})
export class JqxtableComponent {
   @ViewChild('grid', { static: true }) myGrid!: jqxGridComponent;

   HEROES: Hero[] = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
   ];

   clickMessage = '';
   columns: jqwidgets.GridColumn[] = [];
   source: any;
   dataAdapter: any;

   constructor(private readonly jqxDomService: jqxDomService) {}

   ngOnInit() {
      this.source = {
         localdata: this.HEROES,
         datatype: 'array',
         datafields: [
            { name: 'id', type: 'number' },
            { name: 'name', type: 'string' },
         ],
      };

      this.dataAdapter = new jqx.dataAdapter(this.source);

      this.columns = [
         {
            text: 'Id',
            width: 110,
            datafield: 'id',
         },
         {
            text: 'Name',
            datafield: 'name',
         },
         {
            text: 'Action',
            datafield: 'action', // <-- no need to exist in the data, just a dummy field
            width: 80,
            sortable: false,
            filterable: false,
            createwidget: (row: any, column: any, value: string, htmlElement: HTMLElement): void => {
               const button = document.createElement('button');
               button.className = 'material-icons';
               button.innerText = 'edit';
               button.title = 'Edit Row';

               button.style.border = 'none';
               button.style.background = 'transparent';
               button.style.cursor = 'pointer';
               button.style.fontSize = '20px';
               button.style.width = '100%';
               button.style.height = '100%';

               button.onclick = () => {
                  this.onClickMe(row);
               };

               htmlElement.appendChild(button);
            },
            initwidget: (row: any, column: any, value: string, htmlElement: HTMLElement): void => {},
         },
      ];
   }

   onClickMe(rowData: any) {
      console.log('Clicked row data:', rowData.bounddata);
      // this.clickMessage = 'You are my hero ' + rowData.name;
   }
}

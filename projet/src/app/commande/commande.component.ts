import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {
  @ViewChild('dataTable', { static: false })table!: ElementRef;
  tab:any;  
  id!:number;
  idc!:number;
  nc!:string;
  liste:any;
  total!:number;
  constructor(private cs:CommandeService){
    this.initiateTable();
  }
  initiateTable(){
    this.cs.getCommandes().subscribe((data)=>{
      console.log(data);
      
      this.tab=data;
      const dataTableElement = this.table.nativeElement;
      $(dataTableElement).DataTable().destroy();
    $(dataTableElement).DataTable({
      data: data, 
      columns: [
        { title: 'Id', data: 'id' }, 
        { title: 'Id du client', data: 'client.id' },
        { title: 'Nom du client', data: 'client.firstname' },
        { title: 'Total', 
        data: 'liste', 
        render: function (data, type, row) {
          let v=data.reduce((a: number,c: { quantity: number; price: number; })=>{return a+c.quantity*c.price;},0);
          return "<p>"+v+"</p>";
        }
      },
        
        {
          title: 'Actions',
          render: function (data, type, row) {
            return `
              <button type="button" class="btn btn-secondary btn-sm" data-id="${row.id}" data-bs-toggle="modal" data-bs-target="#detailModal">Details</button>
            `;
          }
        }
      ]
    });
    $(dataTableElement).on('click', '.btn-secondary', (event) => {
      const button = $(event.target);
      this.id = button.data('id');
      let table=this.tab.find((e:any)=>e.id==this.id);
      this.idc=table.client.id;
      this.nc=table.client.firstname;
      this.liste=table.liste;
      this.total=this.liste.reduce((a: number,c: { quantity: number; price: number; })=>{return a+c.quantity*c.price;},0);
    });
    });
  }
}


import {Component,OnInit} from '@angular/core';


@Component({
    selector : 'evidence-table',
    templateUrl : './evidence-table.template.html',
    styleUrls : ['./evidence-table.component.css']
})
export class EvidenceTable implements OnInit{

    heading = {
        tableHeading : 'Evidence',
        headings : ["Select","Item Number", "Item Name" ]
    };
    evidenceDetails;
    constructor(){

    }

    ngOnInit(){
        this.evidenceDetails =  [
            {
                selected : false,
                itemId : 1,
                itemName : "Item Name 1"
            },
            {
                selected : true,
                itemId : 2,
                itemName : "Item Name 2"
            },
            {
                selected : true,
                itemId : 3,
                itemName : "Item Name 3"
            },
            {
                selected : false,
                itemId : 4,
                itemName : "Item Name 4"
            }
        ]
    }
}
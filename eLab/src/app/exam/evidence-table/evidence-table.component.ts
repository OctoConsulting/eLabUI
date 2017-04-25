import {Component,OnInit,Input, Output,EventEmitter} from '@angular/core';


@Component({
    selector : 'evidence-table',
    templateUrl : './evidence-table.template.html',
    styleUrls : ['./evidence-table.component.css']
})
export class EvidenceTable implements OnInit{

     @Input() EvidenceDetails;

     @Output() evidencesSelected : EventEmitter<any> = new EventEmitter<any>();

    heading = {
        tableHeading : 'Evidence',
        headings : ["Select","Item Number", "Item Name" ]
    };
    evidenceDetails;

    flag : boolean = false;

    constructor(){

    }

    ngOnInit(){
        /*this.evidenceDetails =  [
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
        ]*/
    }

    checkFlag(){
        this.flag = !this.flag;
        return this.flag;
    }

    OnSelected(){
        //console.log("checked");
        let checked = [];
        this.EvidenceDetails.forEach( ev => {
            if(ev.isSelected === true){
                checked.push(ev.value);
            }
        });
        //console.log(checked);
        this.evidencesSelected.emit(checked);
    }
}
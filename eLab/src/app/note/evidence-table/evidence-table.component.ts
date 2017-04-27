import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector : 'evidence-table',
    templateUrl : './evidence-table.template.html',
    styleUrls : ['evidence-table.component.css']
})
export class EvidenceTable implements OnInit{

    evidenceDetails = [];
    constructor(){

    }

    @Input() path;
    @Input() details;

    ngOnInit(){

        this.evidenceDetails = [
            {
                selected : false,
                id : 1,
                name : "Evidence Name 1",
                isktype : false,
                isShoe : false,
            },
            {
                selected : false,
                id : 2,
                name : "Evidence Name 2",
                isktype : false,
                isShoe : true,
            },
            {
                selected : true,
                id : 3,
                name : "Evidence Name 3",
                isktype : true,
                isShoe : false,
            },
            {
                selected : false,
                id : 4,
                name : "Evidence Name 4",
                isktype : false,
                isShoe : true,
            }
        ]

    }

    showTypeLabels(content) {
        var shoeTireLabel = document.getElementById("shoeTireLabel" + content.id)
        var typeLabel = document.getElementById("typeLabel" + content.id)
        if(content.isktype === true) {
            //if it has a class of hidden
            //remove class on element with id [attr.id]="'typeLabel' + content.id"
            //otherwise add it
            //then show the label k label and shoe if shoe and tire if tire
            //for shoetire label element
            console.log("Is a k type");
        } else {
            //if it has a class of hidden
            //remove class on element with id [attr.id]="'typeLabel' + content.id"
            //to show that it is qtype button
            console.log("isn't k type");
        }
    }    

}
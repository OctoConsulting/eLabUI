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
                selected : false,
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
        var shoeTireLabel = $("#shoeTireLabel" + content.id)
        var typeLabel = $("#typeLabel" + content.id);
        shoeTireLabel.toggleClass('hidden');
        typeLabel.toggleClass('hidden');
    }    

}
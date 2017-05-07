import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector : 'note-main-table',
    templateUrl : './note-main-table.template.html',
    styleUrls : ['./note-main-table.component.css'] 
})
export class NoteMainTable implements OnInit{

    @Input() type;
    @Input() knowns;
    @Input() ques;
    @Input() viewMode;
    
    
    dropDownFlag : boolean = false;
    examId;
    initialId;

    @Output() buttonClicked : EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router, private route: ActivatedRoute){

    }

    ngOnInit(){
        this.route.params.subscribe(param => {
            //this.id = param['id'];
            this.examId = param['examId'];
            this.initialId = param['id'];
            
        });
    }

    dropDown(){
        this.dropDownFlag = !this.dropDownFlag;
    }

    onKDetail(){
        if(this.viewMode == false){
            this.dropDownFlag = false;
            this.buttonClicked.emit('ktype');
        }
        
    }

    onQDetail(){
        if(this.viewMode == false){
            this.dropDownFlag = false;
            this.buttonClicked.emit('qtype');
        }
        
    }

    kNote(event){
        this.router.navigate(['./notes/'+this.type.toLowerCase()+'/kdetails/view/',this.examId,event]);
        window.scrollTo(0,0);
    }

    qNote(event){
        this.router.navigate(['./notes/qdetails/view/',this.examId,event]);
        window.scrollTo(0,0);
    }
}
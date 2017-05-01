import {Component,OnInit,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FbiNotesService } from "../../api-kit/notes/fbi-notes.service";

@Component({
    selector : 'note-table',
    templateUrl : './note-table.template.html',
    styleUrls : ['./note-table.component.css']
})
export class NoteTable implements OnInit{
    
    path : 'view' | 'new' = 'view'; 
    noteDetails = [];
    dropDownFlag : boolean = false;

    shoeDetails = [];
    tireDetails = [];
    @Output() buttonClicked : EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router, private route: ActivatedRoute, private notes : FbiNotesService){

    }
    id : number;
    ngOnInit(){
        

        this.route.params.subscribe(param => {
            this.id = param['id'];
            console.log(this.id);
        })
        this.determinePath();
        this.getAllNotes();
    }

    shoeNote(){
        this.dropDownFlag = false;
        this.buttonClicked.emit('shoe');
        
    }
    
    tireNote(){                  
        this.dropDownFlag = false;
        this.buttonClicked.emit('tire');       
    }

    dropDown(){
        this.dropDownFlag = !this.dropDownFlag;
    }

    getAllNotes(){
        if(this.path == 'view'){
            this.notes.getNoteDetails(this.id,1).subscribe(res => {
                if(res.length > 0){
                    this.shoeDetails = res[0].shoeNotes;
                    this.tireDetails = res[0].tireNotes;
                }                
                //console.log(res[0].shoeNotes);            
            });
        }
        
    }

    determinePath() {
        if (/\/new/.test(this.router.url)) {
            this.path = 'new';
        }
    }


    viewShoeNote(event){
        this.router.navigate(['./notes/shoe/view/',this.id,event]);
        window.scrollTo(0,0);
    }

    viewShoeKNote(event){
        this.router.navigate(['./notes/shoe/kdetails/view/',this.id,event]);
        window.scrollTo(0,0);
    }
    viewQuesNote(event){
        this.router.navigate(['/notes/qdetails/view/',this.id,event]);
        window.scrollTo(0,0);
    } 
    viewTireNote(event){
        this.router.navigate(['/notes/tire/view/',this.id,event]);
        window.scrollTo(0,0);
    }
    viewTireKNote(event){
        this.router.navigate(['/notes/tire/kdetails/view/',this.id,event]);
        window.scrollTo(0,0);
    }
}
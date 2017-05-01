import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { FbiNotesService } from '../../api-kit/notes/fbi-notes.service';

@Component({
    selector : 'k-details',
    templateUrl : './k-details.page.html',
    styleUrls : ['./k-details.component.css']
})
export class KDetailsPage implements OnInit{
    path : 'view' | 'new' = 'new';
    type : 'shoe' | 'tire' = 'tire';

    KtypeModel : number = 0;
    Ktype = [];

    KstyleModel : number = 0;
    Kstyle = [];
    brandName = '';
    size = '';
    model = '';
    DOT = '';
    POV : number = 0;
    PovType =[];
    textArea = '';
    textArea1 = '';
    constructor(private router: Router, private route: ActivatedRoute, private location: Location,private notes: FbiNotesService){

    }

    ngOnInit(){
        this.determinePath();
                    
        this.populateForm();          

                        
    }        

    determinePath(){
        if (/\/view/.test(this.router.url)) {
            this.path = 'view';
        }

        if (/\/shoe/.test(this.router.url)){
            this.type = 'shoe';
        }
    }

    mapLabelAndValue(val){
        return {label: val.value, value: val.id};
    }

    onSave(){
        this.location.back();
        window.scrollTo(0,0);
    }

    onCancel(){
        this.location.back();
        window.scrollTo(0,0);
    }

    populateForm(){
        if(this.type == 'shoe'){
            this.notes.getDropDown('K Item Type','Shoe').subscribe(res =>{
                this.Ktype = res.map(this.mapLabelAndValue);
                this.Ktype.unshift({value : 0 , label : "Select Option"});
            });

            this.notes.getDropDown('Style','Shoe').subscribe( res => {
                this.Kstyle = res.map(this.mapLabelAndValue);
                this.Kstyle.unshift({value : 0 , label : "Select Option"});
            });
        }
        else{
            this.notes.getDropDown('K Item Type','Tire').subscribe(res => {
                this.Ktype = res.map(this.mapLabelAndValue);
                this.Ktype.unshift({value : 0 , label : "Select Option"});
            });

            this.notes.getDropDown('Vehicle Position').subscribe(res =>{
                this.PovType = res.map(this.mapLabelAndValue);
                this.PovType.unshift({value : 0 , label : "Select Option"});
            })
        }
    }
}
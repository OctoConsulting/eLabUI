import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from 'moment-timezone';
import { FbiExamService } from '../api-kit/exam/fbi-exam.service';

@Component({
    selector: 'fbi-exam',
    templateUrl: "./fbi-exam.page.html",
    styleUrls: ["./fbi-exam.component.css"]
})
export class FBIExamPage implements OnInit {
   
    path: 'new' | 'view' = 'view';

    nameError: boolean = false;
    NameInput: string = '';

    examType: Array<Object>;
    examiners: Array<Object>;
    selectModel: number = 0;
    examinerModel: number = 0;

    assignDate = { date: '', month: '', year: '', hours: '', mins: '', zone: '' };
    assignDateError: boolean = false;

    startDate = { date: '', month: '', year: '', hours: '', mins: '', zone: '' };
    startDateError: boolean = false;

    completedDate = { date: '', month: '', year: '', hours: '', mins: '', zone: '' };
    completedDateError: boolean = false;
    
    initAssign;
    initStart;
    initEnd;

    now = moment();
    evidences = [];
    selectedEvidence = [];  
    id : number;  
    constructor(private router: Router, private route: ActivatedRoute,private exam : FbiExamService) {

    }

    ngOnInit() {
        console.log(this.router.url);
        
        this.determinePath();

        this.route.params.subscribe(param => {
            this.id = param['id'];
            console.log(this.id);
        })

        this.getExamDetails();

        /*this.examType = [
            { label: "Shoe Prints/Tire Tread", value: "Shoe Prints/Tire Tread" },
            { label: "Chemistry - Toxicology", value: "Chemistry - Toxicology" },
            { label: "Firearms", value: "Firearms" },
            { label: "Question Documents", value: "Question Documents" }
        ];*/

        /*this.examiners = [
            { label: "Juliette Fitzsimmons", value: "Juliette Fitzsimmons" },
            { label: "Marcus Stanton", value: "Marcus Stanton" },
            { label: "Tim Miller", value: "Tim Miller" },
            { label: "Barb McCullen", value: "Barb McCullen" }
        ];*/

        

        /*this.assignDate = {
            date: (now._d.getDate() - 1),
            month: now._d.getMonth() + 1,
            year: now._d.getFullYear(),
            hours: now._d.getHours(),
            mins: now._d.getMinutes(),
            zone: moment().format('Z')
        }*/

        /*this.startDate = {
            date: now._d.getDate(),
            month: now._d.getMonth() + 1,
            year: now._d.getFullYear(),
            hours: now._d.getHours(),
            mins: now._d.getMinutes(),
            zone: moment().format('Z')
        }*/
    }

    mapLabelAndValue(val){
        return {value : val.id, label : val.val};
    }

    mapEvidences(val){
        return {value : val.id, label : val.val, isSelected : val.isSelected };
    }

    determinePath() {
        if (/\/new/.test(this.router.url)) {
            this.path = 'new';
        }
    }

    
    validateDate() {
        if(this.assignDate.year != '' || this.assignDate.month != '' || this.assignDate.date != ''){
            this.assignDate.hours = this.now._d.getHours();
            this.assignDate.mins =  this.now._d.getMinutes();
            this.assignDate.zone =  moment().format('Z'); 
            if (!moment(this.assignDate.year + '-' + this.assignDate.month + '-' + this.assignDate.date + 'T' + this.assignDate.hours + ":" + this.assignDate.mins + this.assignDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
                this.assignDateError = true;
            }
            else {
                this.assignDateError = false;
            }
        }
        if(this.startDate.year != '' || this.startDate.month != '' || this.startDate.date != ''){
            this.startDate.hours = this.now._d.getHours();
            this.startDate.mins = this.now._d.getMinutes();
            this.startDate.zone = moment().format('Z');

            if (!moment(this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins + this.startDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
                this.startDateError = true;
            }
            else {
                this.startDateError = false;
            }


        }       

    }

    validateCompleteDate() {
        if(this.completedDate.year != '' || this.completedDate.month != '' || this.completedDate.date != ''){
            this.completedDate.hours = this.now._d.getHours();
            this.completedDate.mins = this.now._d.getMinutes();
            this.completedDate.zone = moment().format('Z'); 

            if (!moment(this.completedDate.year + '-' + this.completedDate.month + '-' + this.completedDate.date + 'T' + this.completedDate.hours + ":" + this.completedDate.mins + this.completedDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
                this.completedDateError = true;
            }
            else {
                this.completedDateError = false;
            }
        }
        
        
    }

    validateForm() {
        if (this.NameInput === '') {
            this.nameError = true;
        }
        else {
            this.nameError = false;
        }
    }



    OnSave() {
        this.validateDate();
        this.validateCompleteDate();
        //this.validateForm();
        console.log(this.assignDate.year + '-' + this.assignDate.month + '-' + this.assignDate.date + 'T' + this.assignDate.hours + ":" + this.assignDate.mins + this.assignDate.zone);
        console.log(this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins + this.startDate.zone);
        console.log(this.completedDate.year + '-' + this.completedDate.month + '-' + this.completedDate.date + 'T' + this.completedDate.hours + ":" + this.completedDate.mins + this.completedDate.zone);
        
        
        if (!this.startDateError && !this.assignDateError && !this.completedDateError) {
            this.router.navigate(['./']);
            window.scrollTo(0, 0);
        }
    }

    OnCancel() {
        this.router.navigate(['./']);
        window.scrollTo(0, 0);
    }

    onAnother() {
        console.log("Another");
        this.validateDate();
        //this.validateForm();
        
        if (!this.nameError && !this.startDateError && !this.assignDateError) {
            this.router.navigate(['./exam/new']);
            window.scrollTo(0, 0);
        }  
            
    }

    getExamDetails(){
        if(this.path == 'new'){
            this.exam.getExamPageDetails(this.path).subscribe(res => {
                //console.log(res);
                this.examType = res.examType.map(this.mapLabelAndValue);
                this.examType.unshift({value : 0, label : "Select Option"});
                this.examiners = res.examiners.map(this.mapLabelAndValue);
                this.examiners.unshift({value : 0 , label : "Select Option"});
                this.evidences = res.evidences.map(this.mapEvidences);
                //console.log(this.evidences);
            });
        }
        else{
            this.exam.getExamPageDetails('edit',this.id,1).subscribe(res => {
                this.examType = res.examType.map(this.mapLabelAndValue);
                this.examType.unshift({value : 0, label : "Select Option"});
                this.examiners = res.examiners.map(this.mapLabelAndValue);
                this.examiners.unshift({value : 0 , label : "Select Option"});
                this.evidences = res.evidences.map(this.mapEvidences);

                res.examType.forEach( exam =>{
                    if(exam.isSelected == true){
                        this.selectModel = exam.id;
                    }
                });

                res.examiners.forEach(ex =>{
                    if(ex.isSelected == true){
                        this.examinerModel = ex.id;
                    }
                });


                this.NameInput = res.name;
                this.assignDate.date = moment(res.assignedDate).format("DD");
                this.assignDate.month = moment(res.assignedDate).format("MM");
                this.assignDate.year = moment(res.assignDate).format("YYYY");
            });
        }
    }

    evidencesSelected(event){
        this.selectedEvidence = event;
        console.log(this.selectedEvidence);
    }
    

}
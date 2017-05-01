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

    assignDate = { date: '', month: '', year: '', hours: '', mins: '',secs : '', zone: '' };
    assignDateError: boolean = false;

    startDate = { date: '', month: '', year: '', hours: '', mins: '',secs : '', zone: '' };
    startDateError: boolean = false;

    completedDate = { date: '', month: '', year: '', hours: '', mins: '',secs:'',zone: '' };
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
        //console.log(this.router.url);
        
        this.determinePath();

        this.route.params.subscribe(param => {
            this.id = param['id'];
            //console.log(this.id);
        })

        this.getExamDetails();

        
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
            this.assignDate.secs = this.now._d.getSeconds();
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
            this.startDate.secs = this.now._d.getSeconds();
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
            this.completedDate.secs = this.now._d.getSeconds();
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
        //console.log(this.assignDate.year + '-' + this.assignDate.month + '-' + this.assignDate.date + 'T' + this.assignDate.hours + ":" + this.assignDate.mins+":"+this.assignDate.secs + this.assignDate.zone);
        //console.log(this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins +":" +this.startDate.secs + this.startDate.zone);
        //console.log(this.completedDate.year + '-' + this.completedDate.month + '-' + this.completedDate.date + 'T' + this.completedDate.hours + ":" + this.completedDate.mins+ ":" + this.completedDate.secs + this.completedDate.zone);
        
        
              
        if (!this.startDateError && !this.assignDateError && !this.completedDateError) {
            //location.reload();
            
            this.createExam('save');           
        }
    }

    OnCancel() {
        this.router.navigate(['./']);
        window.scrollTo(0, 0);
    }

    onCreateAnother() {
        //console.log("Another");
        this.validateDate();
        //this.validateForm();
        
        if (!this.startDateError && !this.assignDateError && !this.completedDateError) {
            this.createExam('another');
        }  
            
    }

    getExamDetails(){
        if(this.path == 'new'){
            this.exam.getExamPageDetails(this.path).subscribe(res => {
                //console.log(res);
                this.examType = res.examType.map(this.mapLabelAndValue);
                //this.examType.unshift({value : 0, label : "Select Option"});
                this.examiners = res.examiners.map(this.mapLabelAndValue);
                //this.examiners.unshift({value : 0 , label : "Select Option"});
                this.evidences = res.evidences.map(this.mapEvidences);
                //console.log(this.evidences);
            });
        }
        else{
            this.exam.getExamPageDetails('edit',this.id,1).subscribe(res => {
                this.examType = res.examType.map(this.mapLabelAndValue);
                //this.examType.unshift({value : 0, label : "Select Option"});
                this.examiners = res.examiners.map(this.mapLabelAndValue);
                //this.examiners.unshift({value : 0 , label : "Select Option"});
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

                res.evidences.forEach(ev=> {
                    if(ev.isSelected == true){
                        this.selectedEvidence.push(ev.id);
                    }
                });
                //console.log(this.selectedEvidence);

                this.NameInput = res.name;
                if(res.assignedDate != null){
                    this.assignDate.date = moment(res.assignedDate).format("DD");
                    this.assignDate.month = moment(res.assignedDate).format("MM");
                    this.assignDate.year = moment(res.assignDate).format("YYYY");
                }
                if(res.startDate != null){
                    this.startDate.date = moment(res.startDate).format("DD");
                    this.startDate.month = moment(res.startDate).format("MM");
                    this.startDate.year = moment(res.startDate).format("YYYY");
                }
                if(res.endDate){
                    this.completedDate.date = moment(res.endDate).format("DD");
                    this.completedDate.month = moment(res.endDate).format("MM");
                    this.completedDate.year = moment(res.endDate).format("YYYY");  
                }
                
            });
        }
    }

    evidencesSelected(event){
        this.selectedEvidence = event;
        //console.log(this.selectedEvidence);
    }
    
    createExam(enter : string){
        
        let obj :any =  {
            caseId : 1,
            examName : this.NameInput,
            examType : this.selectModel,
            examinerId : this.examinerModel,
            assignedDate : "",
            startDate : "",
            endDate : "",                       
        }; 
        if(this.assignDateError != true){
            if(this.assignDate.date != '' || this.assignDate.month != '' || this.assignDate.year != ''){
                obj.assignedDate  = this.assignDate.year + '-' + this.assignDate.month + '-' + this.assignDate.date + 'T' + this.assignDate.hours + ":" + this.assignDate.mins+":"+this.assignDate.secs + this.assignDate.zone;
            }
        }

        if(this.startDateError == false){
            if(this.startDate.year != '' || this.startDate.month != '' || this.startDate.date != ''){
                obj.startDate = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins +":" +this.startDate.secs + this.startDate.zone;
            }
        }

        if(this.completedDateError == false){
            if(this.completedDate.year != '' || this.completedDate.date != '' || this.completedDate.month){
                obj.endDate = this.completedDate.year + '-' + this.completedDate.month + '-' + this.completedDate.date + 'T' + this.completedDate.hours + ":" + this.completedDate.mins+ ":" + this.completedDate.secs + this.completedDate.zone;
            }
        }

        if(this.path == 'view'){
            obj._id = this.id;
        }

        //console.log(obj);
        if(enter == 'save'){
            this.exam.createExam(obj).subscribe(res =>{
                //console.log(res);
                this.router.navigate(['./']);
                window.scrollTo(0, 0); 
            });
        }
        else if(enter == 'shoe'){
            this.exam.createExam(obj).subscribe(res => {
                //console.log(res);
                //console.log(res.id);
                this.router.navigate(['./notes/shoe/new/', res.id]);
                window.scrollTo(0,0);
            });
        }
        else if(enter == 'tire'){
            this.exam.createExam(obj).subscribe(res => {
                //console.log(res.id);
                this.router.navigate(['./notes/tire/new/', res.id]);
                window.scrollTo(0,0);
            });
        }
        else{
            this.exam.createExam(obj).subscribe(res =>{
                //console.log(res);
                this.router.navigate(['./exam/new']);
                window.location.reload();
                window.scrollTo(0, 0); 
            });
        }
            
    }

    createNote(event){
        if(event == 'shoe'){
            this.validateDate();        
        
            if (!this.startDateError && !this.assignDateError && !this.completedDateError) {
                this.createExam('shoe');
             }
        }
        else{
            this.validateDate();        
        
            if (!this.startDateError && !this.assignDateError && !this.completedDateError) {
                this.createExam('tire');
             }
        }
    }

}
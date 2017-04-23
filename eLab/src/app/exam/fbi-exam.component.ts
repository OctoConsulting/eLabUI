import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from 'moment-timezone';

@Component({
    selector: 'fbi-exam',
    templateUrl: "./fbi-exam.page.html",
    styleUrls: ["./fbi-exam.component.css"]
})
export class FBIExamPage implements OnInit {
    mode: 'view' | 'edit' = 'edit';
    path: 'new' | 'view' = 'view';

    nameError: boolean = false;
    NameInput: string = '';

    examType: Array<Object>;
    examiners: Array<Object>;
    selectModel: string = "Firearms";
    examinerModel: string = "Juliette Fitzsimmons";

    assignDate = { date: 0, month: 0, year: 0, hours: 0, mins: 0, zone: '' };;
    assignDateError: boolean = false;

    startDate = { date: 0, month: 0, year: 0, hours: 0, mins: 0, zone: '' };
    startDateError: boolean = false;

    completedDate = { date: '', month: '', year: '', hours: '', mins: '', zone: '' };
    completedDateError: boolean = false;

    
    constructor(private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {
        console.log(this.router.url);

        this.determineMode();
        this.determinePath();

        this.route.params.subscribe(param => {
            let id = param['id'];
            console.log(id);
        })

        this.examType = [
            { label: "Shoe Prints/Tire Tread", value: "Shoe Prints/Tire Tread" },
            { label: "Chemistry - Toxicology", value: "Chemistry - Toxicology" },
            { label: "Firearms", value: "Firearms" },
            { label: "Question Documents", value: "Question Documents" }
        ];

        this.examiners = [
            { label: "Juliette Fitzsimmons", value: "Juliette Fitzsimmons" },
            { label: "Marcus Stanton", value: "Marcus Stanton" },
            { label: "Tim Miller", value: "Tim Miller" },
            { label: "Barb McCullen", value: "Barb McCullen" }
        ];

        var now = moment();

        this.assignDate = {
            date: (now._d.getDate() - 1),
            month: now._d.getMonth() + 1,
            year: now._d.getFullYear(),
            hours: now._d.getHours(),
            mins: now._d.getMinutes(),
            zone: moment().format('Z')
        }

        this.startDate = {
            date: now._d.getDate(),
            month: now._d.getMonth() + 1,
            year: now._d.getFullYear(),
            hours: now._d.getHours(),
            mins: now._d.getMinutes(),
            zone: moment().format('Z')
        }
    }

    determineMode() {
        if (/\/view/.test(this.router.url)) {
            this.mode = 'view';
        }
    }

    determinePath() {
        if (/\/new/.test(this.router.url)) {
            this.path = 'new';
        }
    }

    onInputChange(event) {
        console.log(event);
    }

    onSelectChange(event) {
        console.log(event);
        console.log("now " + this.selectModel);
    }

    onExaminerChange(event) {
        console.log(event);
        console.log("now " + this.examinerModel);
    }

    test() {
        console.log(this.assignDate.year + '-' + this.assignDate.month + '-' + this.assignDate.date + 'T' + this.assignDate.hours + ":" + this.assignDate.mins + this.assignDate.zone);
        console.log(moment(this.assignDate.year + '-' + this.assignDate.month + '-' + this.assignDate.date + 'T' + this.assignDate.hours + ":" + this.assignDate.mins + this.assignDate.zone, "YYYY-MM-DDTHH:mmZ").isValid());
        this.validateDate();
    }

    validateDate() {
        if (!moment(this.assignDate.year + '-' + this.assignDate.month + '-' + this.assignDate.date + 'T' + this.assignDate.hours + ":" + this.assignDate.mins + this.assignDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
            this.assignDateError = true;
        }
        else {
            this.assignDateError = false;
        }
        if (!moment(this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.date + 'T' + this.startDate.hours + ":" + this.startDate.mins + this.startDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
            this.startDateError = true;
        }
        else {
            this.startDateError = false;
        }

    }

    validateCompleteDate() {
        if (!moment(this.completedDate.year + '-' + this.completedDate.month + '-' + this.completedDate.date + 'T' + this.completedDate.hours + ":" + this.completedDate.mins + this.completedDate.zone, "YYYY-MM-DDTHH:mmZ").isValid()) {
            this.completedDateError = true;
        }
        else {
            this.completedDateError = false;
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

    onEdit() {
        this.mode = 'edit';
        window.scrollTo(0, 0);
    }

    OnSave() {
        this.validateDate();
        this.validateForm();

        if (!this.nameError && !this.startDateError && !this.assignDateError) {
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
        this.validateForm();
        
        if (!this.nameError && !this.startDateError && !this.assignDateError) {
            this.router.navigate(['./exam/new']);
            window.scrollTo(0, 0);
        }  
            
    }

}

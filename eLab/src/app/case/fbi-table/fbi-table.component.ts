import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'fbi-table',
  templateUrl : "./fbi-table.template.html",
  styleUrls : ['./fbi-table.component.css']
})
export class FBITable implements OnInit{
  flag = false;
  tabData;
  checked : any = [];

  heading:{
    tableHeading : string,
    mainHeading : any,
    addButton : string,
  };

  constructor(){

  }

  ngOnInit(){
    this.heading = {
      tableHeading : 'Evidence',
      mainHeading : ['Type', 'Number', 'Name','For Analysis'],
      addButton : 'Create Evidence',
    };
    this.tabData = {
      container : [
        {
          type : 'Container',
          number : 1,
          name : 'Container Name',
          package : [
            {
              type: 'Package',
              number : 1,
              name : 'Package Name',
              item : [
                {
                  type: 'Item',
                  number : 1,
                  name : 'Item Name',
                  forAnalysis : false
                },
                {
                  type: 'Item',
                  number : 2,
                  name : 'Item Name',
                  forAnalysis : true
                },
              ]
            }
          ]
        },
        {
          type : 'Container',
          number : 2,
          name : 'Container Name',
          package : [
            {
              type: 'Package',
              number : 2,
              name : 'Package Name',
              item : [
                {
                  type: 'Item',
                  number : 3,
                  name : 'Item Name',
                  forAnalysis : true
                },
                {
                  type: 'Item',
                  number : 4,
                  name : 'Item Name',
                  forAnalysis : false
                },
              ]
            }
          ]
        }
      ]
    };

    //console.log(this.tabData.container[0].type);
  }

  checkFlag(){
    this.flag = !this.flag;
    return this.flag;
  }

  OnChange(event){
    this.checked = [];
    this.tabData.container.forEach(cont => {
      cont.package.forEach( pk => {
        pk.item.forEach(it => {
          if(it.forAnalysis === true)
            this.checked.push(it.number);
        });
      });
    });
    console.log(this.checked);
  }


}

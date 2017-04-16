import {Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'fbi-table',
  templateUrl : "./fbi-table.template.html",
  styleUrls : ['./fbi-table.component.css']
})
export class FBITable implements OnInit{
  flag = false;
  tabData;
  checked : any = [];

  @Input() evidenceContainer;

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
    /*this.tabData = {
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
    };*/

    //console.log(this.tabData.container[0].type);
  }

  checkFlag(){
    this.flag = !this.flag;
    return this.flag;    
  }

  checkEvidenceType(type : number){
    if(type === 1)
      return "Container";
    else if(type === 2)
      return "Package";
    else  
      return "Item";
  }

  OnChange(event){
    // this.checked = [];
    // this.tabData.container.forEach(cont => {
    //   cont.package.forEach( pk => {
    //     pk.item.forEach(it => {
    //       if(it.forAnalysis === true)
    //         this.checked.push(it.number);
    //     });
    //   });
    // });
    console.log("Clicked");
    this.checked = [];
    this.evidenceContainer.forEach(con =>{
      con.packages.forEach( pk =>{
        pk.items.forEach(it => {
          if(it.isForAnalysis === true)
            this.checked.push(it.id);
        });
      });
    });
    console.log(this.checked);
  }


}

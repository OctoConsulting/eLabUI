import {Component,OnInit} from '@angular/core';

@Component({
  selector : 'fbi-sidenav',
  templateUrl : './fbi-sidenav.template.html',
  styleUrls : ['./fbi-sidenav.component.css']
})
export class FBISideNav implements OnInit{

  path : 'details' | 'files' = 'details';
  constructor(){

  }

  ngOnInit(){

  }

  OnClick(event){
    this.path = event;
    //console.log(event);
  }
}

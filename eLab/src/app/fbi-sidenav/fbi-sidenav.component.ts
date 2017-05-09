import {Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector : 'fbi-sidenav',
  templateUrl : './fbi-sidenav.template.html',
  styleUrls : ['./fbi-sidenav.component.css']
})

export class FBISideNav implements OnInit{

  path : 'details' | 'files' = 'details';
  constructor(private router: Router){

  }

  ngOnInit(){

  }

  OnClick(event){
    this.path = event;
    if(event == 'details')
      this.router.navigate(['./']);
    //console.log(event);
  }
}

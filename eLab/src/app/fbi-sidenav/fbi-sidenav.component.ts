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

  /* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
  showCaseDetailsDropdown() {
    $("#caseDetailsDropdown").toggleClass('hidden');
  }

  showCaseFilesDropdown() {
    $('#caseFilesDropdown').toggleClass('hidden');
  }
  
  /* 
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = $(".dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }*/
}

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

  /* When the user clicks on the button, 
  toggle between hiding and showing the dropdown content */
  showCaseDetailsDropdown() {
    $(".dropdown-content").toggleClass('hidden');
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

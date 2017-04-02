import { Component } from '@angular/core';

@Component({
  selector: 'router-outlet',
  templateUrl: './evidence/fbi-evidence.page.html',
  styleUrls: ['./app.component.css']
})

export class EvidenceComponent {
  public evidence_info = {
    evidence_number: 1,
    evidence_types: ['container', 'package', 'item'],
    evidence_parents: []
  };
}

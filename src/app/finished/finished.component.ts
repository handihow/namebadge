import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationService } from '../information/information.service';
import { FinishedService } from './finished.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {

  informationStatus$: Observable<any>;

  constructor(private finishedService: FinishedService, private informationService: InformationService, private router: Router) { }

  ngOnInit(): void {
    const docId = this.finishedService.getDocId();
    if(!docId) {
      //there is no document Id so navigate back to collect information
      this.router.navigateByUrl('/information');
    }
    this.informationStatus$ = this.finishedService.checkEmailStatus(docId);
  }

  onReset() {
    this.informationService.clearFileInformation();
    this.router.navigateByUrl('/information');
  }

}

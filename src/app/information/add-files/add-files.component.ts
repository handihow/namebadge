import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.scss']
})
export class AddFilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onUploadComplete(event){
    console.log(event);
  }

}

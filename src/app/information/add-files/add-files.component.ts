import { Component, OnInit } from '@angular/core';
import UCFile from '../../models/file.model';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.scss']
})
export class AddFilesComponent implements OnInit {

  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
  }

  onChange(file){
    if(!file) {
      return;
    }
    const files = file.files();
    files.forEach((promise) => {
      promise.done((fileInfo: UCFile) => {
        if(fileInfo.sourceInfo) delete fileInfo.sourceInfo;
        if(fileInfo.isStored){
          this.informationService.addFileInformation(fileInfo);
        }
      });
    })
  }

}

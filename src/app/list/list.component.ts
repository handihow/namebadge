import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import InformationItem from '../models/information.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  items$: Promise<InformationItem[]>;

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.items$ = this.listService.getList();
  }

}

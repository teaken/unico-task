import { Component, OnInit } from '@angular/core';
import { ItemProp } from '../shared/models/item.prop.model';
import { TableItem } from '../shared/models/table-item.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  tableHeaders = ['Name', 'Lastname', 'Salary'];
  // users: TableItem<User>[] = [
  //   {
  //     editMode: false,
  //     item: {
  //       id: 1,
  //       name: 'César',
  //       lastName: 'Redondo',
  //       age: 16
  //     }
  //   },
  //   {
  //     editMode: false,
  //     item: {
  //       id: 2,
  //       name: 'Inaaya',
  //       lastName: 'Mohammad',
  //       age: 50
  //     }
  //   }
  // ];
  userDisplayedProps: ItemProp[] = [
    {
      name: 'name',
      mandatory: true
    },
    {
      name: 'lastName',
      mandatory: true
    },
    {
      name: 'salary',
      mandatory: true,
      type: 'number'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }


}

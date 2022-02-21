import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemProp } from '../models/item.prop.model';
import { TableItem } from '../models/table-item.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {

  tableForm!: FormGroup;

  // @Input()
  // dataSource!: TableItem<any>[];

  @Input()
  headers: string[] = [];

  @Input()
  displayedProps: ItemProp[] = [];

  // @Output() removeTableRow: EventEmitter<string> = new EventEmitter<string>();

  tableItem: TableItem<User>[] = [
    // {
    //   editMode: false,
    //   item: {
    //     id: 1,
    //     name: 'César',
    //     lastName: 'Redondo',
    //     age: 16
    //   }
    // },
    // {
    //   editMode: false,
    //   item: {
    //     id: 2,
    //     name: 'Inaaya',
    //     lastName: 'Mohammad',
    //     age: 50
    //   }
    // }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initTableForm();
    // console.log(this.tableForm)
    // let editMode = this.tableForm.get('items') as FormArray;
    // //  console.log()
  

    // console.log(this.headers)
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('dataSource' in changes) {
      // this.initTableForm();
    }
  }

  initTableForm() {
    this.tableForm = this.fb.group(
      {
        items: this.fb.array([

        ])
      }
    );
    this.tableItem.forEach(item => {
      console.log(item)
      this.addGroupToArray(item);
    });
  }
 
  addGroupToArray(tableItem: TableItem<any>) {
    const itemFormGroup = this.fb.group({});
    this.displayedProps.forEach(prop => {
      const itemFormControl = new FormControl(tableItem.item[prop.name]);
      if (prop.mandatory) {
        itemFormControl.setValidators([Validators.required]);
      }
      if (!tableItem.editMode) {
        itemFormControl.disable();
      }
      itemFormGroup.addControl(prop.name, itemFormControl);
    });
    const editModeControl = new FormControl(tableItem.editMode);
    itemFormGroup.addControl('editMode', editModeControl);
    this.itemsArr.push(itemFormGroup);
  }



  get itemsArr() {
    return this.tableForm.get('items') as FormArray;
  }

  saveNewTableItem(formGroup: AbstractControl) {
    if (formGroup.invalid) {
      alert('invalid');
    } else {
      // formGroup.get('editMode')?.setValue(false);
      // formGroup.disable();

      this.toggleInputType(formGroup, false)
    //  ?.forEach(prop => {
      //  console.log(this.itemsArr)
    //   });
      // console.log( formGroup.get('items')['contols'])
      // this.formGroup.disable();
      console.log(formGroup)
      // this.addGroupToArray(formGroup)
      // console.log(formGroup)
    }
  }

  toggleInputType(formGroup: AbstractControl, type: boolean){
    formGroup.get('editMode')?.setValue(type);
    if(type){
      formGroup.enable();

    }else {
      formGroup.disable();

    }

  }

  cancelNewTableItem(formGroup: AbstractControl) {
    console.log(formGroup)
    this.toggleInputType(formGroup, false)
  }
  

  editNewTableItem(formGroup: AbstractControl) {
    console.log(formGroup.value)
    this.toggleInputType(formGroup, true)
    
  }

  removeGroupFromArray(index: any) {
    console.log(index)
  }

  addUser() {
    if (!this.tableForm.invalid) {
      let id = 0;
      // const lastUser =  this.users[this.users.length - 1];
      const newItem: TableItem<User> = {
        editMode: true,
        item: {
          id: id + 1,
          name: '',
          lastName: '',
          age: null
        }
      };
      // this.tableItem = [...this.tableItem, newItem];
      this.addGroupToArray(newItem)
    } else {
      alert("required")
    }

  }

  removeUser(row: any) {
    // this.
    debugger;
    const updateUsers = [...this.tableItem]
    // console.log(newArray)
    updateUsers.splice(row, 1)
    this.tableItem = [...updateUsers]
  }

}

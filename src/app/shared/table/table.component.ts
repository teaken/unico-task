import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
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
  lastObjValue$ = new BehaviorSubject({});

  salaySum$ = new BehaviorSubject(0);
  @Input()
  headers: string[] = [];

  @Input()
  displayedProps: ItemProp[] = [];

  tableItem: TableItem<User>[] = [

  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initTableForm();

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
      console.log(prop)
      if(prop.type === 'number'){
        itemFormControl.setValidators([Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
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
      alert('Please check form');
    } else {
      let salary = this.salaySum$.getValue();
      this.salaySum$.next(salary + parseInt(formGroup.value.salary))
      this.toggleInputType(formGroup, false)
    }
  }

  toggleInputType(formGroup: AbstractControl, type: boolean) {
    formGroup.get('editMode')?.setValue(type);
    if (type) {
      formGroup.enable();

    } else {
      formGroup.disable();

    }

  }

  cancelNewTableItem(formGroup: AbstractControl, i: number) {
  

    if (!this.tableForm.invalid) {
      for (let index = 0; index < this.itemsArr.length; index++) {
        if (i === index) {
          const element = this.itemsArr.controls[index];
          element.patchValue(this.lastObjValue$.getValue())
          console.log(element)
        }
  
      }
      this.toggleInputType(formGroup, false)
  
    } else {
      alert("Try again")
    }
  }


  editNewTableItem(formGroup: AbstractControl, i: number) {
    console.log(formGroup.value)
    this.lastObjValue$.next(formGroup.value)
    this.toggleInputType(formGroup, true)

  }

  removeGroupFromArray(index: any) {
    console.log(index)
    const updateUsers = [...this.tableItem]
    let salary = this.salaySum$.getValue();
    this.salaySum$.next(salary - parseInt(this.itemsArr.controls[index].value.salary))
    this.itemsArr.controls.splice(index,1);
   
  }

  addUser() {
    if (!this.tableForm.invalid) {
      let id = 0;
      const newItem: TableItem<User> = {
        editMode: true,
        item: {
          id: id + 1,
          name: '',
          lastName: '',
          salary: null
        }
      };
      this.addGroupToArray(newItem)
    } else {
      alert("required")
    }

  }

  

}

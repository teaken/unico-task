import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemProp } from '../models/item.prop.model';
import { TableItem } from '../models/table-item.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {

  tableForm!: FormGroup;

  @Input()
  dataSource!: TableItem<any>[];
  
  @Input()
  headers: string[] = [];

  @Input()
  displayedProps: ItemProp[] = [];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initTableForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('dataSource' in changes) {
      this.initTableForm();
    }
  }

  initTableForm() {
    this.tableForm = this.fb.group(
      {
        items: this.fb.array([])
      }
    );
    this.dataSource.forEach(item => {
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
      formGroup.get('editMode')?.setValue(false);
    }
  }

}

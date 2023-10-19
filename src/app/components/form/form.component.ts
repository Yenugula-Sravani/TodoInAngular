import { Component } from '@angular/core';
import { Form } from 'src/app/model/form';

@Component({
  selector: 'form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  name: string = '';
  phone: string = '';
  email: string = '';
  editId: number = 0;
  forms: Form[] = [];

  constructor() {}
  ngOnInit(): void {
    const localData = localStorage.getItem('formDetails');
    if (localData != null) {
      this.forms = JSON.parse(localData);
    }
  }
  addDetails(id:number):Form[] {
    if (this.editId !== 0) {
      let newForms: Form[] = [];
      for (let form of this.forms) {
        if (form.id != this.editId) {
          newForms.push(form);
        } else {
          let updatedDetails: Form = {
            id: id,
            name: this.name,
            phone: this.phone,
            email: this.email,
          };
          newForms.push(updatedDetails);
        }
      }
      this.forms = newForms;
      localStorage.setItem('formDetails', JSON.stringify(this.forms));
      this.editId=0;
    } else {
      let form: Form = {
        id: this.forms.length + 1,
        name: this.name,
        phone: this.phone,
        email: this.email,
      };
      console.log("this.editId");
      this.forms.push(form);
      localStorage.setItem('formDetails', JSON.stringify(this.forms));
      this.name = '';
      this.phone = '';
      this.email = '';
    }
    return this.forms;
  }

  deleteDetails(id: number) {
    let newForms: Form[] = [];
    for (let form of this.forms) {
      if (form.id != id) {
        newForms.push(form);
      }
    }
    this.forms = newForms;
    return this.forms;
  }

  getName(id: number): string {
    let form = this.forms.find((form) => form.id === id);
    if (form) {
      return form.name;
    } else {
      return '';
    }
  }

  getPhone(id: number): string {
    let form = this.forms.find((form) => form.id === id);
    if (form) {
      return form.phone;
    } else {
      return '';
    }
  }

  getEmail(id: number): string {
    let form = this.forms.find((form) => form.id === id);
    if (form) {
      return form.email;
    } else {
      return '';
    }
  }

  editDetails(id: number) {

    this.editId = id;
    this.name = this.getName(id);
    this.phone = this.getPhone(id);
    this.email = this.getEmail(id);
  }
}

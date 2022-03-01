import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/services/AccountService';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  account = {
    id: 0,
    id_cliente: 0,
    balance: 0,
    status: false
  }
  formCheckout = this.formBuilder.group({
    id: 0,
    id_cliente: 0,
    balance: 0,
    status: false
  });
  error = "";
  @Input()
  id: string = "0";

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
  ) {

  }

  async ngOnInit(): Promise<void> {
    console.log("hola", this.id);
    if (this.id != "0") {
      //string to Number
      this.account = await this.accountService.getAccount(this.id)
      this.formCheckout.setValue(this.account);
    }
  }

  async onSubmit(): Promise<void> {
    // Process checkout data here
    this.error = "";
    const values = this.formCheckout.value;
    for (const key in values) {
      if(values[key] == "" && key != "status" && key != "id") {
        this.error = "Todos los campos son obligatorios"+key;
        return;
      }
    }
    if(this.id != "0"){
      this.accountService.updateAccount(this.formCheckout.value);
    }else{
      await this.accountService.createAccount(this.formCheckout.value);
    }
    this.formCheckout.reset();
    window.location.reload();
  }

}

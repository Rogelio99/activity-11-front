import { Component, HostListener, OnInit } from '@angular/core';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/AccountService';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  accounts: any = [];
  open_modal: boolean = false;
  id: number = 0;
  message: string = '';
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getAccounts().then(
      (response: any) => {
        this.accounts = response;
      }
    )
  }

  openClose(): void {
    this.open_modal = !this.open_modal;
    if(this.open_modal) {
      this.id = 0;
    }
  }

  edit(id:number): void {
    this.open_modal = true;
    this.id = id;
  }

  async delete(id:string): Promise<void> {
    if(window.confirm('Seguro que deseas eliminar este registro?')) {
      await this.accountService.deleteAccount(id).then(
        async (response: any) => {
          this.message = response.message;
          this.accounts = await this.accountService.getAccounts();
        }
      )
    }
  }

  async changeStatus(id:string): Promise<void> {
    await this.accountService.changeStatus(id).then(
      async (response: any) => {
        this.message = response.message;
        this.accounts = await this.accountService.getAccounts();
      }
    )
  }



}

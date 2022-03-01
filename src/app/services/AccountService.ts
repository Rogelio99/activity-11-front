const axios = require('axios');
import {environment} from '../../environments/environment'
import { Account } from '../interfaces/Account';
const apiURL = environment.apiURL;

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  urlAccount:string = `${apiURL}/cuentas`;
  constructor() { }
  async createAccount(account: Account): Promise<any> {
    return await axios.post(this.urlAccount, account)
      .then((response: { data: any; }) => response.data)
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }

  async getAccount(accountId: string): Promise<any> {
    return await axios.get(this.urlAccount + '/'+ accountId)
      .then((response: { data: any; }) => response.data)
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }

  async getAccounts(): Promise<any> {
    console.log(this.urlAccount);
    return await axios.get(`${apiURL}/cuentas`)
      .then((response: { data: any; }) =>
        response.data
      )
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }

  async updateAccount(account: Account): Promise<any> {
    return await axios.put(this.urlAccount + '/'+ account.id, account)
      .then((response: { data: any; }) => response.data)
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }

  async changeStatus(accountId: string): Promise<any> {
    return await axios.patch(this.urlAccount + '/'+ accountId)
      .then((response: { data: any; }) => response.data)
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }

  async deleteAccount(accountId: string): Promise<any> {
    return await axios.delete(this.urlAccount + '/'+ accountId)
      .then((response: { data: any; }) => response.data)
      .catch((error: any) => {
        console.log(error);
        return null;
      });
  }
}

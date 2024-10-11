import { Injectable } from '@angular/core';
import { Customer } from '../class/customer';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  getCutomersColumns(): Column[] {
    return [
      { field: 'id', header: '#' },
      { field: 'name', header: 'Nom' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Téléphone' },
      { field: 'address', header: 'Addresse' },
      { field: 'city', header: 'Ville' },
      { field: 'country', header: 'Country' },
    ];
  }
}

export interface Column {
  field: string;
  header: string;
}

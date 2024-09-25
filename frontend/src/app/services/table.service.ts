import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  getCutomersColumns(): Column[] {
    return [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nom' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Téléphone' },
      { field: 'address', header: 'Addresse' },
      { field: 'city', header: 'Ville' },
      { field: 'country', header: 'Country' }
    ]
  }
}

export interface Column {
  field: string;
  header: string;
}
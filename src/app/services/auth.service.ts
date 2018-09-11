import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = {
    username: 'entropia-studio',
    id: '5BHOEjYrYVuO5X1ziKqb',
    name: 'entropia'
  }

  constructor() { }
}

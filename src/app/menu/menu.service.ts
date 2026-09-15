import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuData } from './menu.model';

@Injectable({
  providedIn: 'root', // Angular crea una sola instancia para toda la app
})
export class MenuService {

  // CAMBIAR: si en el futuro querés leer de una API, cambiá esta URL.
  private readonly MENU_URL = 'assets/menu.json';

  constructor(private http: HttpClient) {}

  // Trae el menú completo (config + lista de tragos)
  getMenu(): Observable<MenuData> {
    return this.http.get<MenuData>(this.MENU_URL);
  }
}

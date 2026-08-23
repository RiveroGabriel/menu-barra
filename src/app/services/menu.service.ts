import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Drink, MenuData } from '../models/menu.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);

  /** Hoy lee el JSON local. Cuando haya backend, cambiá esta línea por:
   *  return this.http.get<MenuData>('https://tu-api.com/api/tragos'); */
  getMenu(): Observable<MenuData> {
    return this.http.get<MenuData>('menu.json');
    // return this.http.get<MenuData>('https://tu-api.com/api/tragos');
  }

  /** Solo los tragos (por si en el futuro la API separa endpoints) */
  getDrinks(): Observable<Drink[]> {
    return this.getMenu().pipe(map((menu) => menu.drinks ?? []));
  }
}

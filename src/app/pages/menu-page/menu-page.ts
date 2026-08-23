import { Component, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { HeroComponent } from '../../components/hero/hero';
import { MenuCardComponent } from '../../components/menu-card/menu-card';
import { Drink, MenuData } from '../../models/menu.model';
import { MenuService } from '../../services/menu.service';

type LoadState = 'loading' | 'ready' | 'error';

/** Orden de las secciones de la carta */
const SECTIONS: { title: string; category: string }[] = [
  { title: 'Tragos', category: 'Tragos' },
  { title: 'Licuados', category: 'Licuados' },
  { title: 'Daikiris y Especiales', category: 'Especiales' },
];

@Component({
  selector: 'app-menu-page',
  imports: [HeaderComponent, HeroComponent, MenuCardComponent],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
})
export class MenuPage {
  private readonly menuService = inject(MenuService);

  protected readonly state = signal<LoadState>('loading');
  protected readonly menu = signal<MenuData | null>(null);

  protected readonly config = computed(() => this.menu()?.config ?? null);
  protected readonly drinks = computed(() => this.menu()?.drinks ?? []);

  /** Agrupa los tragos por sección, omitiendo las vacías */
  protected readonly sections = computed(() => {
    return SECTIONS.map((section) => ({
      ...section,
      items: this.drinks().filter((d: Drink) => d.category === section.category),
    })).filter((section) => section.items.length > 0);
  });

  constructor() {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menu.set(data);
        this.state.set('ready');
      },
      error: () => this.state.set('error'),
    });
  }
}

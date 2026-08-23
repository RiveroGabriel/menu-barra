import { Component, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { HeroComponent } from '../../components/hero/hero';
import { MenuCardComponent } from '../../components/menu-card/menu-card';
import { MenuData } from '../../models/menu.model';
import { MenuService } from '../../services/menu.service';

type LoadState = 'loading' | 'ready' | 'error';

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

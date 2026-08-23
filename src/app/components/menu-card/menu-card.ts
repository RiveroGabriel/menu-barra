import { Component, computed, input, linkedSignal } from '@angular/core';
import { Drink } from '../../models/menu.model';

/** Colores de badge según la categoría del trago */
const BADGE_COLORS: Record<string, string> = {
  'Clásicos': 'bg-amber-500/20 text-amber-300 border-amber-400/40',
  'De Autor': 'bg-gold-500/20 text-gold-300 border-gold-400/50',
  'Nacionales': 'bg-rose-500/20 text-rose-300 border-rose-400/40',
  'Cervezas': 'bg-yellow-500/20 text-yellow-200 border-yellow-400/40',
  'Vinos': 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40',
  'Sin Alcohol': 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
};

const BADGE_DEFAULT = 'bg-zinc-700/60 text-zinc-300 border-zinc-500/40';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.css',
})
export class MenuCardComponent {
  readonly drink = input.required<Drink>();
  readonly currency = input<string>('$');

  protected readonly photoOk = linkedSignal<string | undefined, boolean>({
    source: () => this.drink().image,
    computation: () => true,
  });

  protected readonly badgeClass = computed(
    () => BADGE_COLORS[this.drink().category ?? ''] ?? BADGE_DEFAULT,
  );

  protected readonly price = computed(() =>
    `${this.currency()} ${this.drink().price.toLocaleString('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`,
  );
}

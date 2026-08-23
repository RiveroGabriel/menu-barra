import { Component, computed, input, linkedSignal } from '@angular/core';
import { Drink } from '../../models/menu.model';

/** Colores de badge según la categoría del trago (sólidos, texto oscuro) */
const BADGE_COLORS: Record<string, string> = {
  'Tragos': 'bg-bronze-500 text-zinc-950 border-transparent',
  'Licuados': 'bg-blush-400 text-zinc-950 border-transparent',
  'Especiales': 'bg-coral-400 text-zinc-950 border-transparent',
};

const BADGE_DEFAULT = 'bg-zinc-700/60 text-zinc-300 border-zinc-500/40';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.html',
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

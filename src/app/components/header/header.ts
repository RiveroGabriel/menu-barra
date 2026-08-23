import { Component, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class HeaderComponent {
  /** Se usa para el texto alternativo de la imagen */
  readonly barName = input.required<string>();
  readonly logoPath = input.required<string>();

  protected readonly logoOk = linkedSignal<string | undefined, boolean>({
    source: this.logoPath,
    computation: () => true,
  });
}

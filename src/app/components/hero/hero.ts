import { Component, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  readonly image = input.required<string>();

  protected readonly imageOk = linkedSignal<string | undefined, boolean>({
    source: this.image,
    computation: () => true,
  });
}

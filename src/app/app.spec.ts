import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MenuPage } from './pages/menu-page/menu-page';

describe('MenuPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPage],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(MenuPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load menu.json and render the bar name', async () => {
    const fixture = TestBed.createComponent(MenuPage);
    fixture.detectChanges();

    const http = TestBed.inject(HttpTestingController);
    http
      .expectOne('menu.json')
      .flush({
        config: {
          barName: 'Alto Trago',
          tagline: 'Barra de tragos móvil',
          currency: '$',
          logoPath: 'logo/altoTragoLogo.png',
          heroImage: '/assets/tragos/hero.jpg',
          footerMessage: '',
        },
        drinks: [],
      });

    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')?.innerHTML).toContain('Alto Trago');
    http.verify();
  });
});

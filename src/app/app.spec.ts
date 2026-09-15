import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

describe('MenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
  });

  it('should create the menu page', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load menu.json and render the bar name', async () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges(); // arranca la carga del menú

    const http = TestBed.inject(HttpTestingController);
    http
      .expectOne('assets/menu.json')
      .flush({
        config: {
          barName: 'Alto Trago',
          logo: 'assets/tragos/logo.jpg',
          currency: '$',
          footer: '',
        },
        items: [],
      });

    await fixture.whenStable();
    fixture.detectChanges(); // renderiza el menú cargado

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Alto Trago');
    http.verify();
  });
});

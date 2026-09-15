import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu.service';
import { MenuData, MenuItem } from './menu.model';

// Tipos de filtros disponibles en los 3 botones.
type Filtro = 'Tragos' | 'Licuados' | 'Nuevos';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule], // necesario para @if, @for, etc.
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  private menuService = inject(MenuService); // servicio que lee el menu.json

  // Estados de carga y error (signals: se leen como cargando(), error())
  cargando = signal(true);
  error = signal('');

  // Datos por defecto (se sobreescriben cuando llega el JSON)
  config = signal({
    barName: 'Alto Trago',
    logo: 'assets/tragos/logo.jpg',
    currency: '$',
    footer: '¡Gracias por tu visita!',
  });

  // Lista completa de tragos/licuados (viene del JSON)
  items = signal<MenuItem[]>([]);

  // Los 3 botones de filtro
  filtros: Filtro[] = ['Tragos', 'Licuados', 'Nuevos'];
  filtroActivo = signal<Filtro>('Tragos'); // botón seleccionado al abrir

  // Lista que se muestra en pantalla (se recalcula sola cuando cambian items() o filtroActivo())
  itemsMostrados = computed(() => {
    const filtro = this.filtroActivo();
    if (filtro === 'Nuevos') {
      return this.items().filter(item => item.new);
    }
    return this.items().filter(item => item.category === filtro);
  });

  // Controla si el logo se cargó bien o no
  logoOk = signal(true);

  // Guarda los IDs de las fotos que fallaron al cargar, para mostrar el fallback 🍸
  imagenesRotas = new Set<number>();

  // Se ejecuta automáticamente al abrir la página
  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data: MenuData) => {
        this.config.set(data.config);
        this.items.set(data.items);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo cargar el menú.');
        this.cargando.set(false);
        console.error(err);
      },
    });
  }

  // CAMBIA el filtro cuando tocás un botón
  cambiarFiltro(filtro: Filtro): void {
    this.filtroActivo.set(filtro);
  }

  // Devuelve true si la imagen de ese item falló al cargar
  imagenRota(id: number): boolean {
    return this.imagenesRotas.has(id);
  }

  // Marca una imagen como rota cuando el evento (error) del <img> se dispara
  marcarImagenRota(id: number): void {
    this.imagenesRotas.add(id);
  }

  // Devuelve las clases de Tailwind para el badge según la categoría
  badgeClass(category: string): string {
    const colores: Record<string, string> = {
      Tragos: 'bg-bronze-500/20 text-gold-200 border-gold-400/40',
      Licuados: 'bg-blush-400/20 text-blush-300 border-blush-400/40',
      Especiales: 'bg-coral-400/20 text-coral-300 border-coral-400/40',
    };
    return colores[category] ?? 'bg-zinc-700/60 text-zinc-300 border-zinc-500/40';
  }

  // Formatea el precio con la moneda configurada en menu.json
  formatPrice(price: number): string {
    return `${this.config().currency} ${price.toLocaleString('es-AR')}`;
  }
}

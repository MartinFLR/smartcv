import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private routesToCache: string[] = [''];

  // Almacén de componentes "congelados"
  private handlers = new Map<string, DetachedRouteHandle | null>();

  // Decide si la ruta debe ser "congelada" al salir
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    return this.routesToCache.includes(path);
  }

  // Guarda el componente "congelado"
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    const path = this.getPath(route);
    if (this.routesToCache.includes(path)) {
      this.handlers.set(path, handle);
    }
  }

  // Decide si se debe "descongelar" una ruta al entrar
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    return this.routesToCache.includes(path) && !!this.handlers.get(path);
  }

  // Devuelve el componente "congelado"
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const path = this.getPath(route);
    return this.handlers.get(path) || null;
  }

  // Decide si se debe reutilizar la ruta (ej. si solo cambian queryParams)
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  // Helper para obtener el path de la ruta
  private getPath(route: ActivatedRouteSnapshot): string {
    return route.routeConfig?.path ?? '';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exaggerationLevel',
})
export class ExaggerationLevelPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    levelMap: Record<number, string>,
  ): string {
    if (value === null || value === undefined) {
      return 'Sin definir';
    }
    return levelMap[value] ?? 'Desconocido';
  }
}

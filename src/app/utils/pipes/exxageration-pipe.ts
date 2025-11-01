import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exxagerationLevel'
})
export class ExxagerationLevelPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    levelMap: Record<number, string>
  ): string {

    if (value === null || value === undefined) {
      return 'Sin definir';
    }
    return levelMap[value] ?? 'Desconocido';
  }

}

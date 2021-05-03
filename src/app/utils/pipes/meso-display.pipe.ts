import { Pipe, PipeTransform } from '@angular/core';
import { DisplayService } from 'src/app/utils/display.service';

@Pipe({
  name: 'mesos',
})
export class MesoDisplayPipe implements PipeTransform {
  constructor(private displayService: DisplayService) {}

  transform(amount: number): any {
    return this.displayService.displayCurrency(amount);
  }
}

import {Component, input, output} from '@angular/core';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TuiRipple} from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-actions',
  imports: [
    TuiButton,
    TuiRipple,
    TuiIcon
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  isLoading = input.required<boolean>();
  isCvValid = input.required<boolean>();

  save = output<void>();
  download = output<void>();
  clear = output<void>();
}

import { Component } from '@angular/core';
import { TuiForm } from '@taiga-ui/layout';
import { TuiButton, TuiDialogContext, TuiTextfield } from '@taiga-ui/core';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { FormsModule } from '@angular/forms';
import { injectContext } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-create-profile',
  imports: [TuiForm, TuiTextfield, TuiAutoFocus, TuiButton, FormsModule],
  templateUrl: './create-profile.html',
  host: { '(submit.prevent)': 'context.completeWith(value)' },
})
export class CreateProfile {
  protected readonly context = injectContext<TuiDialogContext<string, string>>();

  protected value = this.context.data;
}

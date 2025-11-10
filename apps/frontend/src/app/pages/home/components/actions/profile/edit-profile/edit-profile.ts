import { Component } from '@angular/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import {
  TuiButton,
  TuiDialogContext,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiForm } from '@taiga-ui/layout';

@Component({
  selector: 'app-edit-profile',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiAutoFocus,
    TuiButton,
    TuiForm,
    TuiLabel,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
  ],
  templateUrl: './edit-profile.html',
  host: { '(submit.prevent)': 'context.completeWith(value)' },
})
export class EditProfile {
  protected readonly context = injectContext<TuiDialogContext<string, string>>();

  protected value = this.context.data;
}

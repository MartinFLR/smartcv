import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  TuiButton,
  TuiGroup,
  TuiHint,
  TuiTextfield,
  tuiItemsHandlersProvider,
} from '@taiga-ui/core';
import { TuiSelect, TuiSwitch, TuiChevron, TuiDataListWrapper } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { CvProfile } from '@smartcv/types';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TranslocoDirective } from '@jsverse/transloco';
import { ActionsService } from './actions-service/actions.service';
import { TuiIdentityMatcher } from '@taiga-ui/cdk';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    TuiButton,
    TuiTextfield,
    TuiSelect,
    TuiChevron,
    TuiDataListWrapper,
    FormsModule,
    TuiSwitch,
    TuiHint,
    TuiRipple,
    TuiGroup,
    TranslocoDirective,
  ],
  templateUrl: './actions.html',
  providers: [
    tuiItemsHandlersProvider({
      stringify: signal((item: CvProfile) => item?.name || ''),
      identityMatcher: signal((item1: CvProfile, item2: CvProfile) => item1?.id === item2?.id),
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './actions.css',
})
export class Actions {
  protected readonly actions = inject(ActionsService);

  protected readonly profileStringifier = (profile: CvProfile): string => profile.name;
  protected readonly profileIdentityMatcher: TuiIdentityMatcher<CvProfile> = (item1, item2) =>
    item1?.id === item2?.id;

  protected readonly templateStringifier = (item: string): string =>
    item ? item.charAt(0).toUpperCase() + item.slice(1) : '';
}

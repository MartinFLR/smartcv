import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TaigaAlertsService {
  private readonly alerts = inject(TuiAlertService);
  private readonly transloco = inject(TranslocoService);

  showSuccess(
    key: string,
    params?: Record<string, string>,
    customLabel?: string,
  ): Observable<void> {
    const content = this.resolveContent(
      key,
      'alerts.notifications.success.title',
      params,
      customLabel,
    );

    return this.alerts.open(content.message, {
      label: content.label,
      appearance: 'positive',
      icon: '@tui.check',
      autoClose: 3000,
    });
  }

  showError(key: string, params?: Record<string, string>, customLabel?: string): Observable<void> {
    const content = this.resolveContent(
      key,
      'alerts.notifications.error.title',
      params,
      customLabel,
    );
    console.error(`[TaigaAlerts]: ${content.label} - ${content.message}`);

    return this.alerts.open(content.message, {
      label: content.label,
      appearance: 'negative',
      icon: '@tui.alert-circle',
      autoClose: 5000,
    });
  }

  showWarning(
    key: string,
    params?: Record<string, string>,
    customLabel?: string,
  ): Observable<void> {
    const content = this.resolveContent(
      key,
      'alerts.notifications.warning.title',
      params,
      customLabel,
    );

    return this.alerts.open(content.message, {
      label: content.label,
      appearance: 'warning',
      icon: '@tui.alert-triangle',
      autoClose: 4000,
    });
  }

  showInfo(key: string, params?: Record<string, string>, customLabel?: string): Observable<void> {
    const content = this.resolveContent(
      key,
      'alerts.notifications.info.title',
      params,
      customLabel,
    );

    return this.alerts.open(content.message, {
      label: content.label,
      appearance: 'info',
      icon: '@tui.info',
      autoClose: 4000,
    });
  }

  private resolveContent(
    key: string,
    defaultLabelKey: string,
    params?: Record<string, string>,
    customLabel?: string,
  ): { message: string; label: string } {
    const compositeMessageKey = `${key}.message`;
    const compositeLabelKey = `${key}.label`;

    const translatedMessage = this.transloco.translate(compositeMessageKey, params);

    const isComposite = translatedMessage !== compositeMessageKey;

    let finalMessage = '';
    let finalLabel = '';

    if (isComposite) {
      finalMessage = translatedMessage;

      if (customLabel) {
        finalLabel = this.transloco.translate(customLabel);
      } else {
        const jsonLabel = this.transloco.translate(compositeLabelKey);
        finalLabel =
          jsonLabel !== compositeLabelKey ? jsonLabel : this.transloco.translate(defaultLabelKey);
      }
    } else {
      finalMessage = this.transloco.translate(key, params);

      finalLabel = this.transloco.translate(customLabel || defaultLabelKey);
    }

    return { message: finalMessage, label: finalLabel };
  }
}

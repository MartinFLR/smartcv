import * as i0 from '@angular/core';
import { inject, signal, computed, Directive } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tuiDirectiveBinding, tuiIsString } from '@taiga-ui/cdk/utils/miscellaneous';
import { TuiIcon } from '@taiga-ui/core/components/icon';
import { TuiTextfieldComponent } from '@taiga-ui/core/components/textfield';
import * as i1 from '@taiga-ui/core/directives/appearance';
import { TUI_APPEARANCE_OPTIONS, TuiWithAppearance } from '@taiga-ui/core/directives/appearance';
import * as i2 from '@taiga-ui/core/directives/hint';
import { TuiHintDirective } from '@taiga-ui/core/directives/hint';
import { TUI_PASSWORD_TEXTS } from '@taiga-ui/kit/tokens';
import { tuiCreateOptions } from '@taiga-ui/cdk/utils/di';

const [TUI_PASSWORD_OPTIONS, tuiPasswordOptionsProvider] = tuiCreateOptions({
    icons: {
        hide: '@tui.eye-off',
        show: '@tui.eye',
    },
});

class TuiPassword {
    constructor() {
        this.options = inject(TUI_PASSWORD_OPTIONS);
        this.texts = toSignal(inject(TUI_PASSWORD_TEXTS), {
            initialValue: ['', ''],
        });
        this.textfield = inject(TuiTextfieldComponent);
        this.hidden = signal(true);
        this.icon = tuiDirectiveBinding(TuiIcon, 'icon', computed((size = this.textfield.options.size()) => {
            const icon = this.hidden()
                ? this.options.icons.show
                : this.options.icons.hide;
            return tuiIsString(icon) ? icon : icon(size);
        }));
        this.hint = tuiDirectiveBinding(TuiHintDirective, 'tuiHint', computed(() => (this.hidden() ? this.texts()[0] : this.texts()[1])));
    }
    toggle() {
        this.hidden.set(!this.hidden());
        this.textfield.input?.nativeElement.setAttribute('type', this.hidden() ? 'password' : 'text');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPassword, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPassword, isStandalone: true, selector: "tui-icon[tuiPassword]", host: { listeners: { "click": "toggle()" }, properties: { "style.border": "textfield.options.size() === \"s\" ? \"0.25rem solid transparent\" : null" }, styleAttribute: "cursor: pointer" }, providers: [
            {
                provide: TUI_APPEARANCE_OPTIONS,
                useValue: { appearance: 'icon' },
            },
        ], hostDirectives: [{ directive: i1.TuiWithAppearance }, { directive: i2.TuiHintDirective, inputs: ["tuiHintAppearance", "tuiHintAppearance", "tuiHintContext", "tuiHintContext"] }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPassword, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'tui-icon[tuiPassword]',
                    providers: [
                        {
                            provide: TUI_APPEARANCE_OPTIONS,
                            useValue: { appearance: 'icon' },
                        },
                    ],
                    hostDirectives: [
                        TuiWithAppearance,
                        {
                            directive: TuiHintDirective,
                            inputs: ['tuiHintAppearance', 'tuiHintContext'],
                        },
                    ],
                    host: {
                        style: 'cursor: pointer',
                        '(click)': 'toggle()',
                        '[style.border]': 'textfield.options.size() === "s" ? "0.25rem solid transparent" : null',
                    },
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TUI_PASSWORD_OPTIONS, TuiPassword, tuiPasswordOptionsProvider };
//# sourceMappingURL=taiga-ui-kit-directives-password.mjs.map

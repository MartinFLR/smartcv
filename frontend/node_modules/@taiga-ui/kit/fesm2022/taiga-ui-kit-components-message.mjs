import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Directive } from '@angular/core';
import { tuiWithStyles } from '@taiga-ui/cdk/utils/miscellaneous';
import * as i1 from '@taiga-ui/core/directives/appearance';
import { TUI_APPEARANCE_OPTIONS, TuiWithAppearance } from '@taiga-ui/core/directives/appearance';

class TuiMessageStyles {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMessageStyles, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TuiMessageStyles, isStandalone: true, selector: "ng-component", host: { classAttribute: "tui-message" }, ngImport: i0, template: '', isInline: true, styles: ["[tuiMessage]{display:inline-flex;padding:.5rem .625rem;min-block-size:2.25rem;block-size:auto;box-sizing:border-box;inline-size:-webkit-fit-content;inline-size:-moz-fit-content;inline-size:fit-content;isolation:isolate;white-space:nowrap;text-align:start;font:var(--tui-font-text-ui-m);border-radius:var(--tui-radius-l)}[tuiMessage]>[tuiLink]{color:inherit!important;-webkit-text-decoration:underline solid!important;text-decoration:underline solid!important}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMessageStyles, decorators: [{
            type: Component,
            args: [{ standalone: true, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'tui-message',
                    }, styles: ["[tuiMessage]{display:inline-flex;padding:.5rem .625rem;min-block-size:2.25rem;block-size:auto;box-sizing:border-box;inline-size:-webkit-fit-content;inline-size:-moz-fit-content;inline-size:fit-content;isolation:isolate;white-space:nowrap;text-align:start;font:var(--tui-font-text-ui-m);border-radius:var(--tui-radius-l)}[tuiMessage]>[tuiLink]{color:inherit!important;-webkit-text-decoration:underline solid!important;text-decoration:underline solid!important}\n"] }]
        }] });
class TuiMessage {
    constructor() {
        this.nothing = tuiWithStyles(TuiMessageStyles);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMessage, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiMessage, isStandalone: true, selector: "[tuiMessage]", providers: [
            {
                provide: TUI_APPEARANCE_OPTIONS,
                useValue: { appearance: 'neutral' },
            },
        ], hostDirectives: [{ directive: i1.TuiWithAppearance }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiMessage, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiMessage]',
                    providers: [
                        {
                            provide: TUI_APPEARANCE_OPTIONS,
                            useValue: { appearance: 'neutral' },
                        },
                    ],
                    hostDirectives: [TuiWithAppearance],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiMessage };
//# sourceMappingURL=taiga-ui-kit-components-message.mjs.map

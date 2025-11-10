import * as i0 from '@angular/core';
import { inject, Directive, Input } from '@angular/core';
import { TUI_PLATFORM } from '@taiga-ui/cdk/tokens';

class TuiPlatform {
    constructor() {
        this.tuiPlatform = inject(TUI_PLATFORM, { skipSelf: true });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPlatform, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPlatform, isStandalone: true, selector: "[tuiPlatform]", inputs: { tuiPlatform: "tuiPlatform" }, host: { properties: { "attr.data-platform": "tuiPlatform" } }, providers: [
            {
                provide: TUI_PLATFORM,
                useFactory: () => inject(TuiPlatform).tuiPlatform,
            },
        ], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPlatform, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiPlatform]',
                    providers: [
                        {
                            provide: TUI_PLATFORM,
                            useFactory: () => inject(TuiPlatform).tuiPlatform,
                        },
                    ],
                    host: {
                        '[attr.data-platform]': 'tuiPlatform',
                    },
                }]
        }], propDecorators: { tuiPlatform: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiPlatform };
//# sourceMappingURL=taiga-ui-cdk-directives-platform.mjs.map

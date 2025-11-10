import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

class TuiCompass {
    constructor() {
        this.degrees = NaN;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiCompass, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TuiCompass, isStandalone: true, selector: "tui-compass", inputs: { degrees: "degrees" }, host: { properties: { "style.--t-degrees.deg": "degrees" } }, ngImport: i0, template: '', isInline: true, styles: ["tui-compass{position:relative;display:inline-block;color:var(--tui-background-accent-1);border-radius:50%;inline-size:1rem;block-size:1rem;border:.1875rem solid var(--tui-background-base);box-shadow:0 0 .1875rem #0000004d;transform-style:preserve-3d}tui-compass:before{content:\"\";position:absolute;top:0;left:.125rem;-webkit-mask-image:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 8.99993C4 8 8 8 12 8.99993C9.91509 5.73239 8.5 3 6 0C3.5 3 2 5.5 0 8.99993Z\"/></svg>');mask-image:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 8.99993C4 8 8 8 12 8.99993C9.91509 5.73239 8.5 3 6 0C3.5 3 2 5.5 0 8.99993Z\"/></svg>');transform:rotate(var(--t-degrees)) translateY(-.625rem) translateZ(-1rem);inline-size:.75rem;block-size:1rem;background:currentColor}tui-compass:after{position:absolute;top:0;left:0;bottom:0;right:0;content:\"\";border-radius:inherit;background:currentColor linear-gradient(-45deg,rgba(0,0,0,.2),transparent)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiCompass, decorators: [{
            type: Component,
            args: [{ standalone: true, selector: 'tui-compass', template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[style.--t-degrees.deg]': 'degrees',
                    }, styles: ["tui-compass{position:relative;display:inline-block;color:var(--tui-background-accent-1);border-radius:50%;inline-size:1rem;block-size:1rem;border:.1875rem solid var(--tui-background-base);box-shadow:0 0 .1875rem #0000004d;transform-style:preserve-3d}tui-compass:before{content:\"\";position:absolute;top:0;left:.125rem;-webkit-mask-image:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 8.99993C4 8 8 8 12 8.99993C9.91509 5.73239 8.5 3 6 0C3.5 3 2 5.5 0 8.99993Z\"/></svg>');mask-image:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 8.99993C4 8 8 8 12 8.99993C9.91509 5.73239 8.5 3 6 0C3.5 3 2 5.5 0 8.99993Z\"/></svg>');transform:rotate(var(--t-degrees)) translateY(-.625rem) translateZ(-1rem);inline-size:.75rem;block-size:1rem;background:currentColor}tui-compass:after{position:absolute;top:0;left:0;bottom:0;right:0;content:\"\";border-radius:inherit;background:currentColor linear-gradient(-45deg,rgba(0,0,0,.2),transparent)}\n"] }]
        }], propDecorators: { degrees: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiCompass };
//# sourceMappingURL=taiga-ui-kit-components-compass.mjs.map

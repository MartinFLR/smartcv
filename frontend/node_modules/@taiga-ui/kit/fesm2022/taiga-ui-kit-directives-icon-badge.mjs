import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject, signal, Directive, Input } from '@angular/core';
import { tuiWithStyles } from '@taiga-ui/cdk/utils/miscellaneous';
import { TuiIcon } from '@taiga-ui/core/components/icon';

class TuiIconBadgeStyles {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIconBadgeStyles, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: TuiIconBadgeStyles, isStandalone: true, selector: "ng-component", host: { classAttribute: "tui-icon-badge" }, ngImport: i0, template: '', isInline: true, styles: ["[tuiIconBadge]:before{content:\"\";position:absolute;right:.143em;bottom:.143em;display:var(--t-icon-badge, none);inline-size:.57em;block-size:.57em;transform:translate(50%,50%);-webkit-mask:var(--t-icon-badge) no-repeat center / contain;mask:var(--t-icon-badge) no-repeat center / contain;background:currentColor}[tuiIconBadge][style*=\"--t-icon-badge:\"]:after{-webkit-mask-image:var(--t-icon),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);mask-image:var(--t-icon),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);-webkit-mask-composite:source-in,xor;mask-composite:intersect}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIconBadgeStyles, decorators: [{
            type: Component,
            args: [{ standalone: true, template: '', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'tui-icon-badge',
                    }, styles: ["[tuiIconBadge]:before{content:\"\";position:absolute;right:.143em;bottom:.143em;display:var(--t-icon-badge, none);inline-size:.57em;block-size:.57em;transform:translate(50%,50%);-webkit-mask:var(--t-icon-badge) no-repeat center / contain;mask:var(--t-icon-badge) no-repeat center / contain;background:currentColor}[tuiIconBadge][style*=\"--t-icon-badge:\"]:after{-webkit-mask-image:var(--t-icon),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);mask-image:var(--t-icon),radial-gradient(circle at bottom .1em right .1em,transparent calc(.4em - .5px),#000 .4em);-webkit-mask-composite:source-in,xor;mask-composite:intersect}\n"] }]
        }] });
class TuiIconBadge {
    constructor() {
        this.icon = inject(TuiIcon);
        this.nothing = tuiWithStyles(TuiIconBadgeStyles);
        this.badgeSrc = signal(null);
    }
    set badge(icon) {
        this.badgeSrc.set(this.icon.resolve(icon));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIconBadge, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiIconBadge, isStandalone: true, selector: "tui-icon[badge]", inputs: { badge: "badge" }, host: { attributes: { "tuiIconBadge": "" }, properties: { "style.--t-icon-badge": "badgeSrc()" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiIconBadge, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'tui-icon[badge]',
                    host: {
                        tuiIconBadge: '',
                        '[style.--t-icon-badge]': 'badgeSrc()',
                    },
                }]
        }], propDecorators: { badge: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiIconBadge };
//# sourceMappingURL=taiga-ui-kit-directives-icon-badge.mjs.map

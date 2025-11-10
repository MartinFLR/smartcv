import * as i0 from '@angular/core';
import { inject, Directive, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tuiTypedFromEvent } from '@taiga-ui/cdk/observables';
import { TUI_IS_IOS } from '@taiga-ui/cdk/tokens';
import { tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { tap, map, switchMap, race, filter, take } from 'rxjs';

const STYLE = {
    transform: 'scale(0.95)',
    opacity: '0.6',
    background: 'rgba(146, 153, 162, 0.12)',
};
function tuiFindTouchIndex(touches, id) {
    for (let i = 0; i < touches.length; i++) {
        if (touches[i]?.identifier === id) {
            return i;
        }
    }
    return -1;
}
class TuiTouchable {
    constructor() {
        this.isIOS = inject(TUI_IS_IOS);
        this.el = tuiInjectElement();
        this.tuiTouchable = '';
        if (!this.isIOS) {
            return;
        }
        tuiTypedFromEvent(this.el, 'touchstart', { passive: true })
            .pipe(tap(() => this.onTouchStart()), map(({ touches }) => touches[touches.length - 1]?.identifier), switchMap((identifier) => race(tuiTypedFromEvent(this.el, 'touchmove', { passive: true }).pipe(filter(({ touches }) => this.hasTouchLeft(this.el, touches, identifier ?? 0))), tuiTypedFromEvent(this.el, 'touchend')).pipe(take(1))), takeUntilDestroyed())
            .subscribe(() => {
            this.el.style.removeProperty('transform');
            this.el.style.removeProperty('opacity');
            this.el.style.removeProperty('background');
        });
    }
    get style() {
        return this.tuiTouchable || 'transform';
    }
    hasTouchLeft(element, touches, identifier) {
        const { ownerDocument } = element;
        const id = tuiFindTouchIndex(touches, identifier);
        if (!ownerDocument || id === -1) {
            return true;
        }
        const { clientX = 0, clientY = 0 } = touches[id] ?? {};
        return !element.contains(ownerDocument.elementFromPoint(clientX, clientY));
    }
    onTouchStart() {
        if (this.style !== 'transform') {
            this.el.style.removeProperty('transition');
        }
        else {
            this.el.style.setProperty('transition', 'transform 0.2s');
        }
        this.el.style.setProperty(this.style, STYLE[this.style]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiTouchable, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiTouchable, isStandalone: true, selector: "[tuiTouchable]", inputs: { tuiTouchable: "tuiTouchable" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiTouchable, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiTouchable]',
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tuiTouchable: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiTouchable, tuiFindTouchIndex };
//# sourceMappingURL=taiga-ui-addon-mobile-directives-touchable.mjs.map

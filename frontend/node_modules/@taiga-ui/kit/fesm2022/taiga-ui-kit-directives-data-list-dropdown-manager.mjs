import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { inject, DestroyRef, ElementRef, Directive, ContentChildren } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY_QUERY } from '@taiga-ui/cdk/constants';
import { tuiTypedFromEvent, tuiQueryListChanges, tuiPreventDefault } from '@taiga-ui/cdk/observables';
import { tuiGetClosestFocusable } from '@taiga-ui/cdk/utils/focus';
import { tuiPure } from '@taiga-ui/cdk/utils/miscellaneous';
import { TuiDropdownDirective } from '@taiga-ui/core/directives/dropdown';
import { merge, switchMap, EMPTY, take, filter, tap, map, shareReplay, debounceTime } from 'rxjs';

class TuiDataListDropdownManager {
    constructor() {
        this.dropdowns = EMPTY_QUERY;
        this.els = EMPTY_QUERY;
        this.destroyRef = inject(DestroyRef);
    }
    ngAfterViewInit() {
        this.right$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((index) => {
            this.tryToFocus(index);
        });
        merge(this.immediate$, this.debounce$)
            .pipe(switchMap((active) => {
            this.dropdowns.forEach((dropdown, index) => {
                dropdown.toggle(index === active);
            });
            const element = this.els.get(active);
            const dropdown = this.dropdowns.get(active);
            const ref = dropdown?.ref();
            if (!element || !dropdown || !ref) {
                return EMPTY;
            }
            const { nativeElement } = ref.location;
            const mouseEnter$ = tuiTypedFromEvent(nativeElement, 'mouseenter').pipe(take(1));
            const esc$ = merge(tuiTypedFromEvent(element.nativeElement, 'keydown'), tuiTypedFromEvent(nativeElement, 'keydown')).pipe(filter(({ key }) => key === 'Escape'));
            return merge(mouseEnter$, esc$).pipe(tap((event) => {
                if (dropdown.ref()) {
                    event.stopPropagation();
                }
                element.nativeElement.focus();
                dropdown.toggle('offsetX' in event);
            }));
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }
    get elements$() {
        return tuiQueryListChanges(this.els).pipe(map((array) => array.map(({ nativeElement }) => nativeElement)), shareReplay({ bufferSize: 1, refCount: true }));
    }
    get right$() {
        return this.elements$.pipe(switchMap((elements) => merge(...elements.map((element, index) => tuiTypedFromEvent(element, 'keydown').pipe(filter(({ key }) => key === 'ArrowRight'), tuiPreventDefault(), map(() => index))))));
    }
    get immediate$() {
        return this.elements$.pipe(switchMap((elements) => merge(...elements.map((element, index) => tuiTypedFromEvent(element, 'click').pipe(map(() => index))))));
    }
    get debounce$() {
        return this.elements$.pipe(switchMap((elements) => merge(...elements.map((element, index) => merge(tuiTypedFromEvent(element, 'focus'), tuiTypedFromEvent(element, 'blur')).pipe(filter(({ relatedTarget }) => this.notInDropdown(relatedTarget, index)), map(({ type }) => (type === 'focus' ? index : NaN)))))), debounceTime(300));
    }
    notInDropdown(element, index) {
        return !this.dropdowns
            .get(index)
            ?.ref()
            ?.location.nativeElement.contains(element);
    }
    tryToFocus(index) {
        const content = this.dropdowns.get(index)?.ref()?.location.nativeElement;
        if (!content) {
            return;
        }
        // First item is focus trap
        const focusTrap = tuiGetClosestFocusable({ initial: content, root: content });
        const item = tuiGetClosestFocusable({
            initial: focusTrap || content,
            root: content,
        });
        item?.focus();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDataListDropdownManager, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiDataListDropdownManager, isStandalone: true, selector: "tui-data-list[tuiDataListDropdownManager]", queries: [{ propertyName: "dropdowns", predicate: TuiDropdownDirective, descendants: true }, { propertyName: "els", predicate: TuiDropdownDirective, descendants: true, read: ElementRef }], ngImport: i0 }); }
}
__decorate([
    tuiPure
], TuiDataListDropdownManager.prototype, "elements$", null);
__decorate([
    tuiPure
], TuiDataListDropdownManager.prototype, "right$", null);
__decorate([
    tuiPure
], TuiDataListDropdownManager.prototype, "immediate$", null);
__decorate([
    tuiPure
], TuiDataListDropdownManager.prototype, "debounce$", null);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDataListDropdownManager, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'tui-data-list[tuiDataListDropdownManager]',
                }]
        }], propDecorators: { dropdowns: [{
                type: ContentChildren,
                args: [TuiDropdownDirective, { descendants: true }]
            }], els: [{
                type: ContentChildren,
                args: [TuiDropdownDirective, { read: ElementRef, descendants: true }]
            }], elements$: [], right$: [], immediate$: [], debounce$: [] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiDataListDropdownManager };
//# sourceMappingURL=taiga-ui-kit-directives-data-list-dropdown-manager.mjs.map

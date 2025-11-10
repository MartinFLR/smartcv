import * as i0 from '@angular/core';
import { inject, Directive } from '@angular/core';
import { tuiIfMap } from '@taiga-ui/cdk/observables';
import { TuiPopoverService } from '@taiga-ui/cdk/services';
import { PolymorpheusTemplate } from '@taiga-ui/polymorpheus';
import { Subject, distinctUntilChanged, ignoreElements, endWith, share } from 'rxjs';

class TuiPopoverDirective extends PolymorpheusTemplate {
    constructor() {
        super(...arguments);
        this.service = inject((TuiPopoverService));
        this.open$ = new Subject();
        this.options = {};
        this.open = false;
        this.openChange = this.open$.pipe(distinctUntilChanged(), tuiIfMap(() => this.service.open(this, this.options).pipe(ignoreElements(), endWith(false))), share());
    }
    ngOnChanges() {
        this.open$.next(this.open);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPopoverDirective, usesInheritance: true, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPopoverDirective, decorators: [{
            type: Directive
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiPopoverDirective };
//# sourceMappingURL=taiga-ui-cdk-directives-popover.mjs.map

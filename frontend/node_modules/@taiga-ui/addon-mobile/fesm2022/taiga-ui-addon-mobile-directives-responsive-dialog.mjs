import * as i0 from '@angular/core';
import { inject, Injectable, Directive } from '@angular/core';
import { TuiPopoverDirective } from '@taiga-ui/cdk/directives/popover';
import { tuiAsPopover } from '@taiga-ui/cdk/services';
import { TuiSheetDialogService } from '@taiga-ui/addon-mobile/components/sheet-dialog';
import { TUI_IS_MOBILE } from '@taiga-ui/cdk/tokens';
import { tuiIsString } from '@taiga-ui/cdk/utils/miscellaneous';
import { TuiDialogService } from '@taiga-ui/core/components/dialog';

/**
 * Same as `TuiDialogService` but automatically switches to `TuiSheetDialogService` on mobile
 */
class TuiResponsiveDialogService {
    constructor() {
        this.isMobile = inject(TUI_IS_MOBILE);
        this.dialogs = inject(TuiDialogService);
        this.sheets = inject(TuiSheetDialogService);
    }
    open(content, options = {}) {
        return this.isMobile
            ? this.sheets.open(content, options)
            : this.dialogs.open(content, {
                ...options,
                label: tuiIsString(options.label) ? options.label : '',
            });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiResponsiveDialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiResponsiveDialogService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiResponsiveDialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class TuiResponsiveDialog extends TuiPopoverDirective {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiResponsiveDialog, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiResponsiveDialog, isStandalone: true, selector: "ng-template[tuiResponsiveDialog]", inputs: { options: ["tuiResponsiveDialogOptions", "options"], open: ["tuiResponsiveDialog", "open"] }, outputs: { openChange: "tuiResponsiveDialogChange" }, providers: [tuiAsPopover(TuiResponsiveDialogService)], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiResponsiveDialog, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'ng-template[tuiResponsiveDialog]',
                    inputs: ['options: tuiResponsiveDialogOptions', 'open: tuiResponsiveDialog'],
                    outputs: ['openChange: tuiResponsiveDialogChange'],
                    providers: [tuiAsPopover(TuiResponsiveDialogService)],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { TuiResponsiveDialog, TuiResponsiveDialogService };
//# sourceMappingURL=taiga-ui-addon-mobile-directives-responsive-dialog.mjs.map

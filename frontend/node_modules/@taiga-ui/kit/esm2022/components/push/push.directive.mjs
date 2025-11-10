import { ChangeDetectorRef, Directive, forwardRef, inject, Input, TemplateRef, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tuiIfMap } from '@taiga-ui/cdk/observables';
import { PolymorpheusTemplate } from '@taiga-ui/polymorpheus';
import { Subject } from 'rxjs';
import { TuiPushService } from './push.service';
import * as i0 from "@angular/core";
class TuiPushDirective extends PolymorpheusTemplate {
    constructor() {
        super(inject(TemplateRef), inject(ChangeDetectorRef));
        this.push = inject(forwardRef(() => TuiPushService));
        this.show$ = new Subject();
        this.show$
            .pipe(tuiIfMap(() => this.push.open(this)), takeUntilDestroyed())
            .subscribe();
    }
    set tuiPush(show) {
        this.show$.next(show);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPushDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPushDirective, isStandalone: true, selector: "ng-template[tuiPush]", inputs: { tuiPush: "tuiPush" }, usesInheritance: true, ngImport: i0 }); }
}
export { TuiPushDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPushDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'ng-template[tuiPush]',
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tuiPush: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9raXQvY29tcG9uZW50cy9wdXNoL3B1c2guZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFdBQVcsR0FDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbkQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU3QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRTlDLE1BSWEsZ0JBQWlCLFNBQVEsb0JBQW9CO0lBSXREO1FBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBSnpDLFNBQUksR0FBbUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBSzVDLElBQUksQ0FBQyxLQUFLO2FBQ0wsSUFBSSxDQUNELFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwQyxrQkFBa0IsRUFBRSxDQUN2QjthQUNBLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUNXLE9BQU8sQ0FBQyxJQUFhO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7K0dBbEJRLGdCQUFnQjttR0FBaEIsZ0JBQWdCOztTQUFoQixnQkFBZ0I7NEZBQWhCLGdCQUFnQjtrQkFKNUIsU0FBUzttQkFBQztvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLHNCQUFzQjtpQkFDbkM7MEVBaUJjLE9BQU87c0JBRGpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBmb3J3YXJkUmVmLFxuICAgIGluamVjdCxcbiAgICBJbnB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHt0dWlJZk1hcH0gZnJvbSAnQHRhaWdhLXVpL2Nkay9vYnNlcnZhYmxlcyc7XG5pbXBvcnQge1BvbHltb3JwaGV1c1RlbXBsYXRlfSBmcm9tICdAdGFpZ2EtdWkvcG9seW1vcnBoZXVzJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7VHVpUHVzaFNlcnZpY2V9IGZyb20gJy4vcHVzaC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW3R1aVB1c2hdJyxcbn0pXG5leHBvcnQgY2xhc3MgVHVpUHVzaERpcmVjdGl2ZSBleHRlbmRzIFBvbHltb3JwaGV1c1RlbXBsYXRlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHB1c2g6IFR1aVB1c2hTZXJ2aWNlID0gaW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gVHVpUHVzaFNlcnZpY2UpKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNob3ckID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihpbmplY3QoVGVtcGxhdGVSZWYpLCBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpKTtcblxuICAgICAgICB0aGlzLnNob3ckXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0dWlJZk1hcCgoKSA9PiB0aGlzLnB1c2gub3Blbih0aGlzKSksXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsRGVzdHJveWVkKCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHR1aVB1c2goc2hvdzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNob3ckLm5leHQoc2hvdyk7XG4gICAgfVxufVxuIl19
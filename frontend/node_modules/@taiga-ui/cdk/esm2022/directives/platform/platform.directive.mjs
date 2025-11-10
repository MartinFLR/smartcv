import { Directive, inject, Input } from '@angular/core';
import { TUI_PLATFORM } from '@taiga-ui/cdk/tokens';
import * as i0 from "@angular/core";
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
export { TuiPlatform };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL2RpcmVjdGl2ZXMvcGxhdGZvcm0vcGxhdGZvcm0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7O0FBRWxELE1BYWEsV0FBVztJQWJ4QjtRQWVXLGdCQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQy9EOytHQUhZLFdBQVc7bUdBQVgsV0FBVyxtS0FWVDtZQUNQO2dCQUNJLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVc7YUFDcEQ7U0FDSjs7U0FLUSxXQUFXOzRGQUFYLFdBQVc7a0JBYnZCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixTQUFTLEVBQUU7d0JBQ1A7NEJBQ0ksT0FBTyxFQUFFLFlBQVk7NEJBQ3JCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLGFBQWEsQ0FBQyxXQUFXO3lCQUNwRDtxQkFDSjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0Ysc0JBQXNCLEVBQUUsYUFBYTtxQkFDeEM7aUJBQ0o7OEJBR1UsV0FBVztzQkFEakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBpbmplY3QsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VFVJX1BMQVRGT1JNfSBmcm9tICdAdGFpZ2EtdWkvY2RrL3Rva2Vucyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICdbdHVpUGxhdGZvcm1dJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogVFVJX1BMQVRGT1JNLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogKCkgPT4gaW5qZWN0KFR1aVBsYXRmb3JtKS50dWlQbGF0Zm9ybSxcbiAgICAgICAgfSxcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmRhdGEtcGxhdGZvcm1dJzogJ3R1aVBsYXRmb3JtJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUdWlQbGF0Zm9ybSB7XG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdHVpUGxhdGZvcm0gPSBpbmplY3QoVFVJX1BMQVRGT1JNLCB7c2tpcFNlbGY6IHRydWV9KTtcbn1cbiJdfQ==
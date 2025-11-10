import { Directive, Input } from '@angular/core';
import { EMPTY_CLIENT_RECT } from '@taiga-ui/cdk/constants';
import { tuiAsRectAccessor, TuiRectAccessor } from '@taiga-ui/core/classes';
import * as i0 from "@angular/core";
class TuiHintHost extends TuiRectAccessor {
    constructor() {
        super(...arguments);
        this.type = 'hint';
    }
    getClientRect() {
        return this.tuiHintHost?.getBoundingClientRect() || EMPTY_CLIENT_RECT;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHintHost, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiHintHost, isStandalone: true, selector: "[tuiHint][tuiHintHost]", inputs: { tuiHintHost: "tuiHintHost" }, providers: [tuiAsRectAccessor(TuiHintHost)], usesInheritance: true, ngImport: i0 }); }
}
export { TuiHintHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHintHost, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiHint][tuiHintHost]',
                    providers: [tuiAsRectAccessor(TuiHintHost)],
                }]
        }], propDecorators: { tuiHintHost: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC1ob3N0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZGlyZWN0aXZlcy9oaW50L2hpbnQtaG9zdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDOztBQUUxRSxNQUthLFdBQVksU0FBUSxlQUFlO0lBTGhEOztRQVNvQixTQUFJLEdBQUcsTUFBTSxDQUFDO0tBS2pDO0lBSFUsYUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxpQkFBaUIsQ0FBQztJQUMxRSxDQUFDOytHQVJRLFdBQVc7bUdBQVgsV0FBVyw2R0FGVCxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDOztTQUVsQyxXQUFXOzRGQUFYLFdBQVc7a0JBTHZCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixhQUFhLENBQUM7aUJBQzlDOzhCQUdVLFdBQVc7c0JBRGpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFTVBUWV9DTElFTlRfUkVDVH0gZnJvbSAnQHRhaWdhLXVpL2Nkay9jb25zdGFudHMnO1xuaW1wb3J0IHt0dWlBc1JlY3RBY2Nlc3NvciwgVHVpUmVjdEFjY2Vzc29yfSBmcm9tICdAdGFpZ2EtdWkvY29yZS9jbGFzc2VzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgICBzZWxlY3RvcjogJ1t0dWlIaW50XVt0dWlIaW50SG9zdF0nLFxuICAgIHByb3ZpZGVyczogW3R1aUFzUmVjdEFjY2Vzc29yKFR1aUhpbnRIb3N0KV0sXG59KVxuZXhwb3J0IGNsYXNzIFR1aUhpbnRIb3N0IGV4dGVuZHMgVHVpUmVjdEFjY2Vzc29yIHtcbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0dWlIaW50SG9zdD86IEhUTUxFbGVtZW50O1xuXG4gICAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSAnaGludCc7XG5cbiAgICBwdWJsaWMgZ2V0Q2xpZW50UmVjdCgpOiBET01SZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHVpSGludEhvc3Q/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIHx8IEVNUFRZX0NMSUVOVF9SRUNUO1xuICAgIH1cbn1cbiJdfQ==
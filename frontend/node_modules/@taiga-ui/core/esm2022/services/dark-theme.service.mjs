import { inject, Injectable } from '@angular/core';
import { WA_WINDOW } from '@ng-web-apis/common';
import { fromEvent, map, Observable, shareReplay, startWith } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @deprecated use {@link TUI_DARK_MODE} instead
 */
class TuiDarkThemeService extends Observable {
    constructor() {
        const media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');
        const media$ = fromEvent(media, 'change').pipe(startWith(null), map(() => media.matches), shareReplay({ bufferSize: 1, refCount: true }));
        super((subscriber) => media$.subscribe(subscriber));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDarkThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDarkThemeService, providedIn: 'root' }); }
}
export { TuiDarkThemeService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiDarkThemeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFyay10aGVtZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zZXJ2aWNlcy9kYXJrLXRoZW1lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUV4RTs7R0FFRztBQUNILE1BR2EsbUJBQW9CLFNBQVEsVUFBbUI7SUFDeEQ7UUFDSSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDM0UsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQzFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFDZixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUN4QixXQUFXLENBQUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUMvQyxDQUFDO1FBRUYsS0FBSyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzsrR0FWUSxtQkFBbUI7bUhBQW5CLG1CQUFtQixjQUZoQixNQUFNOztTQUVULG1CQUFtQjs0RkFBbkIsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7V0FfV0lORE9XfSBmcm9tICdAbmctd2ViLWFwaXMvY29tbW9uJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBtYXAsIE9ic2VydmFibGUsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGh9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgVFVJX0RBUktfTU9ERX0gaW5zdGVhZFxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBUdWlEYXJrVGhlbWVTZXJ2aWNlIGV4dGVuZHMgT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhID0gaW5qZWN0KFdBX1dJTkRPVykubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpO1xuICAgICAgICBjb25zdCBtZWRpYSQgPSBmcm9tRXZlbnQobWVkaWEsICdjaGFuZ2UnKS5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgICAgICAgbWFwKCgpID0+IG1lZGlhLm1hdGNoZXMpLFxuICAgICAgICAgICAgc2hhcmVSZXBsYXkoe2J1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgc3VwZXIoKHN1YnNjcmliZXIpID0+IG1lZGlhJC5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgIH1cbn1cbiJdfQ==
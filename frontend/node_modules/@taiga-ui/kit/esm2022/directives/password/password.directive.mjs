import { computed, Directive, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tuiDirectiveBinding, tuiIsString } from '@taiga-ui/cdk/utils/miscellaneous';
import { TuiIcon } from '@taiga-ui/core/components/icon';
import { TuiTextfieldComponent } from '@taiga-ui/core/components/textfield';
import { TUI_APPEARANCE_OPTIONS, TuiWithAppearance, } from '@taiga-ui/core/directives/appearance';
import { TuiHintDirective } from '@taiga-ui/core/directives/hint';
import { TUI_PASSWORD_TEXTS } from '@taiga-ui/kit/tokens';
import { TUI_PASSWORD_OPTIONS } from './password.options';
import * as i0 from "@angular/core";
import * as i1 from "@taiga-ui/core/directives/appearance";
import * as i2 from "@taiga-ui/core/directives/hint";
class TuiPassword {
    constructor() {
        this.options = inject(TUI_PASSWORD_OPTIONS);
        this.texts = toSignal(inject(TUI_PASSWORD_TEXTS), {
            initialValue: ['', ''],
        });
        this.textfield = inject(TuiTextfieldComponent);
        this.hidden = signal(true);
        this.icon = tuiDirectiveBinding(TuiIcon, 'icon', computed((size = this.textfield.options.size()) => {
            const icon = this.hidden()
                ? this.options.icons.show
                : this.options.icons.hide;
            return tuiIsString(icon) ? icon : icon(size);
        }));
        this.hint = tuiDirectiveBinding(TuiHintDirective, 'tuiHint', computed(() => (this.hidden() ? this.texts()[0] : this.texts()[1])));
    }
    toggle() {
        this.hidden.set(!this.hidden());
        this.textfield.input?.nativeElement.setAttribute('type', this.hidden() ? 'password' : 'text');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPassword, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiPassword, isStandalone: true, selector: "tui-icon[tuiPassword]", host: { listeners: { "click": "toggle()" }, properties: { "style.border": "textfield.options.size() === \"s\" ? \"0.25rem solid transparent\" : null" }, styleAttribute: "cursor: pointer" }, providers: [
            {
                provide: TUI_APPEARANCE_OPTIONS,
                useValue: { appearance: 'icon' },
            },
        ], hostDirectives: [{ directive: i1.TuiWithAppearance }, { directive: i2.TuiHintDirective, inputs: ["tuiHintAppearance", "tuiHintAppearance", "tuiHintContext", "tuiHintContext"] }], ngImport: i0 }); }
}
export { TuiPassword };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiPassword, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: 'tui-icon[tuiPassword]',
                    providers: [
                        {
                            provide: TUI_APPEARANCE_OPTIONS,
                            useValue: { appearance: 'icon' },
                        },
                    ],
                    hostDirectives: [
                        TuiWithAppearance,
                        {
                            directive: TuiHintDirective,
                            inputs: ['tuiHintAppearance', 'tuiHintContext'],
                        },
                    ],
                    host: {
                        style: 'cursor: pointer',
                        '(click)': 'toggle()',
                        '[style.border]': 'textfield.options.size() === "s" ? "0.25rem solid transparent" : null',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMva2l0L2RpcmVjdGl2ZXMvcGFzc3dvcmQvcGFzc3dvcmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxXQUFXLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNuRixPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUNILHNCQUFzQixFQUN0QixpQkFBaUIsR0FDcEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNoRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUV4RCxNQXVCYSxXQUFXO0lBdkJ4QjtRQXdCcUIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZDLFVBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDMUQsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBVTtTQUNsQyxDQUFDLENBQUM7UUFFZ0IsY0FBUyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFDLFdBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsU0FBSSxHQUFHLG1CQUFtQixDQUN6QyxPQUFPLEVBQ1AsTUFBTSxFQUNOLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJO2dCQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBRTlCLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FDTCxDQUFDO1FBRWlCLFNBQUksR0FBRyxtQkFBbUIsQ0FDekMsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDdEUsQ0FBQztLQVNMO0lBUGEsTUFBTTtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FDNUMsTUFBTSxFQUNOLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQ3RDLENBQUM7SUFDTixDQUFDOytHQWhDUSxXQUFXO21HQUFYLFdBQVcsa1FBcEJUO1lBQ1A7Z0JBQ0ksT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsUUFBUSxFQUFFLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzthQUNqQztTQUNKOztTQWVRLFdBQVc7NEZBQVgsV0FBVztrQkF2QnZCLFNBQVM7bUJBQUM7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFNBQVMsRUFBRTt3QkFDUDs0QkFDSSxPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixRQUFRLEVBQUUsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDO3lCQUNqQztxQkFDSjtvQkFDRCxjQUFjLEVBQUU7d0JBQ1osaUJBQWlCO3dCQUNqQjs0QkFDSSxTQUFTLEVBQUUsZ0JBQWdCOzRCQUMzQixNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQzt5QkFDbEQ7cUJBQ0o7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxpQkFBaUI7d0JBQ3hCLFNBQVMsRUFBRSxVQUFVO3dCQUNyQixnQkFBZ0IsRUFDWix1RUFBdUU7cUJBQzlFO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb21wdXRlZCwgRGlyZWN0aXZlLCBpbmplY3QsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RvU2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge3R1aURpcmVjdGl2ZUJpbmRpbmcsIHR1aUlzU3RyaW5nfSBmcm9tICdAdGFpZ2EtdWkvY2RrL3V0aWxzL21pc2NlbGxhbmVvdXMnO1xuaW1wb3J0IHtUdWlJY29ufSBmcm9tICdAdGFpZ2EtdWkvY29yZS9jb21wb25lbnRzL2ljb24nO1xuaW1wb3J0IHtUdWlUZXh0ZmllbGRDb21wb25lbnR9IGZyb20gJ0B0YWlnYS11aS9jb3JlL2NvbXBvbmVudHMvdGV4dGZpZWxkJztcbmltcG9ydCB7XG4gICAgVFVJX0FQUEVBUkFOQ0VfT1BUSU9OUyxcbiAgICBUdWlXaXRoQXBwZWFyYW5jZSxcbn0gZnJvbSAnQHRhaWdhLXVpL2NvcmUvZGlyZWN0aXZlcy9hcHBlYXJhbmNlJztcbmltcG9ydCB7VHVpSGludERpcmVjdGl2ZX0gZnJvbSAnQHRhaWdhLXVpL2NvcmUvZGlyZWN0aXZlcy9oaW50JztcbmltcG9ydCB7VFVJX1BBU1NXT1JEX1RFWFRTfSBmcm9tICdAdGFpZ2EtdWkva2l0L3Rva2Vucyc7XG5cbmltcG9ydCB7VFVJX1BBU1NXT1JEX09QVElPTlN9IGZyb20gJy4vcGFzc3dvcmQub3B0aW9ucyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgc2VsZWN0b3I6ICd0dWktaWNvblt0dWlQYXNzd29yZF0nLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBUVUlfQVBQRUFSQU5DRV9PUFRJT05TLFxuICAgICAgICAgICAgdXNlVmFsdWU6IHthcHBlYXJhbmNlOiAnaWNvbid9LFxuICAgICAgICB9LFxuICAgIF0sXG4gICAgaG9zdERpcmVjdGl2ZXM6IFtcbiAgICAgICAgVHVpV2l0aEFwcGVhcmFuY2UsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGl2ZTogVHVpSGludERpcmVjdGl2ZSxcbiAgICAgICAgICAgIGlucHV0czogWyd0dWlIaW50QXBwZWFyYW5jZScsICd0dWlIaW50Q29udGV4dCddLFxuICAgICAgICB9LFxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBzdHlsZTogJ2N1cnNvcjogcG9pbnRlcicsXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZSgpJyxcbiAgICAgICAgJ1tzdHlsZS5ib3JkZXJdJzpcbiAgICAgICAgICAgICd0ZXh0ZmllbGQub3B0aW9ucy5zaXplKCkgPT09IFwic1wiID8gXCIwLjI1cmVtIHNvbGlkIHRyYW5zcGFyZW50XCIgOiBudWxsJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBUdWlQYXNzd29yZCB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zID0gaW5qZWN0KFRVSV9QQVNTV09SRF9PUFRJT05TKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRleHRzID0gdG9TaWduYWwoaW5qZWN0KFRVSV9QQVNTV09SRF9URVhUUyksIHtcbiAgICAgICAgaW5pdGlhbFZhbHVlOiBbJycsICcnXSBhcyBjb25zdCxcbiAgICB9KTtcblxuICAgIHByb3RlY3RlZCByZWFkb25seSB0ZXh0ZmllbGQgPSBpbmplY3QoVHVpVGV4dGZpZWxkQ29tcG9uZW50KTtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgaGlkZGVuID0gc2lnbmFsKHRydWUpO1xuICAgIHByb3RlY3RlZCByZWFkb25seSBpY29uID0gdHVpRGlyZWN0aXZlQmluZGluZyhcbiAgICAgICAgVHVpSWNvbixcbiAgICAgICAgJ2ljb24nLFxuICAgICAgICBjb21wdXRlZCgoc2l6ZSA9IHRoaXMudGV4dGZpZWxkLm9wdGlvbnMuc2l6ZSgpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpY29uID0gdGhpcy5oaWRkZW4oKVxuICAgICAgICAgICAgICAgID8gdGhpcy5vcHRpb25zLmljb25zLnNob3dcbiAgICAgICAgICAgICAgICA6IHRoaXMub3B0aW9ucy5pY29ucy5oaWRlO1xuXG4gICAgICAgICAgICByZXR1cm4gdHVpSXNTdHJpbmcoaWNvbikgPyBpY29uIDogaWNvbihzaXplKTtcbiAgICAgICAgfSksXG4gICAgKTtcblxuICAgIHByb3RlY3RlZCByZWFkb25seSBoaW50ID0gdHVpRGlyZWN0aXZlQmluZGluZyhcbiAgICAgICAgVHVpSGludERpcmVjdGl2ZSxcbiAgICAgICAgJ3R1aUhpbnQnLFxuICAgICAgICBjb21wdXRlZCgoKSA9PiAodGhpcy5oaWRkZW4oKSA/IHRoaXMudGV4dHMoKVswXSA6IHRoaXMudGV4dHMoKVsxXSkpLFxuICAgICk7XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpZGRlbi5zZXQoIXRoaXMuaGlkZGVuKCkpO1xuICAgICAgICB0aGlzLnRleHRmaWVsZC5pbnB1dD8ubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAndHlwZScsXG4gICAgICAgICAgICB0aGlzLmhpZGRlbigpID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0JyxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=
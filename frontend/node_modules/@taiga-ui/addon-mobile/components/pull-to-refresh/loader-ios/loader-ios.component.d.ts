import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import * as i0 from "@angular/core";
export declare class TuiMobileLoaderIOS {
    private readonly context;
    private readonly threshold;
    protected readonly steps = 12;
    protected get finished(): boolean;
    protected get percent(): number;
    protected isShown(index: number): boolean;
    protected calculateTransform(index: number): string;
    protected calculateAnimationBegin(index: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiMobileLoaderIOS, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TuiMobileLoaderIOS, "tui-mobile-ios-loader", never, {}, {}, never, never, true, never>;
}
export declare const TUI_IOS_LOADER: PolymorpheusComponent<TuiMobileLoaderIOS>;

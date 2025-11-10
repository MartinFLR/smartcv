export interface TuiGetClosestFocusableOptions {
    /**
     * @description:
     * current HTML element
     */
    initial: Element;
    /**
     * @description:
     * determine if only keyboard focus is of interest
     */
    keyboard?: boolean;
    /**
     * @description:
     * should it look backwards instead (find item that will be focused with Shift + Tab)
     */
    previous?: boolean;
    /**
     * @description:
     * top Node limiting the search area
     */
    root: Node;
}
/**
 * @description:
 * Finds the closest element that can be focused with a keyboard or mouse in theory
 */
export declare function tuiGetClosestFocusable({ initial, root, previous, keyboard, }: TuiGetClosestFocusableOptions): HTMLElement | null;

/**
 * @description:
 * cross browser way to get selected text
 *
 * History:
 * BUG - window.getSelection() fails when text selected in a form field
 * https://bugzilla.mozilla.org/show_bug.cgi?id=85686
 */
export declare function tuiGetSelectedText({ getSelection, document }: Window): string | null;

import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Renderer2, Directive, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResizeObserverService } from '@ng-web-apis/resize-observer';
import { svgNodeFilter } from '@taiga-ui/cdk/constants';
import { tuiCreateOptions } from '@taiga-ui/cdk/utils/di';
import { tuiInjectElement } from '@taiga-ui/cdk/utils/dom';
import { tuiPx } from '@taiga-ui/cdk/utils/miscellaneous';

const [TUI_HIGHLIGHT_OPTIONS, tuiHighlightOptionsProvider] = tuiCreateOptions({
    highlightColor: 'var(--tui-service-selection-background)',
});
class TuiHighlight {
    constructor() {
        this.el = tuiInjectElement();
        this.renderer = inject(Renderer2);
        this.doc = inject(DOCUMENT);
        this.highlight = this.setUpHighlight();
        this.treeWalker = this.doc.createTreeWalker(this.el, NodeFilter.SHOW_TEXT, svgNodeFilter);
        this.tuiHighlight = '';
        this.tuiHighlightColor = inject(TUI_HIGHLIGHT_OPTIONS).highlightColor;
        inject(ResizeObserverService, { self: true })
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateStyles());
    }
    ngOnChanges() {
        this.updateStyles();
    }
    get match() {
        return this.indexOf(this.el.textContent) !== -1;
    }
    updateStyles() {
        this.highlight.style.display = 'none';
        if (!this.match) {
            return;
        }
        this.treeWalker.currentNode = this.el;
        do {
            const index = this.indexOf(this.treeWalker.currentNode.nodeValue);
            if (index === -1) {
                continue;
            }
            const range = this.doc.createRange();
            range.setStart(this.treeWalker.currentNode, index);
            range.setEnd(this.treeWalker.currentNode, index + this.tuiHighlight.length);
            const hostRect = this.el.getBoundingClientRect();
            const { left, top, width, height } = range.getBoundingClientRect();
            const { style } = this.highlight;
            style.background = this.tuiHighlightColor;
            style.left = tuiPx(left - hostRect.left);
            style.top = tuiPx(top - hostRect.top);
            style.width = tuiPx(width);
            style.height = tuiPx(height);
            style.display = 'block';
            return;
        } while (this.treeWalker.nextNode());
    }
    indexOf(source) {
        return !source || !this.tuiHighlight
            ? -1
            : source.toLowerCase().indexOf(this.tuiHighlight.toLowerCase());
    }
    setUpHighlight() {
        const highlight = this.renderer.createElement('div');
        const { style } = highlight;
        style.background = this.tuiHighlightColor;
        style.zIndex = '-1';
        style.position = 'absolute';
        this.renderer.appendChild(this.el, highlight);
        return highlight;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHighlight, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: TuiHighlight, isStandalone: true, selector: "[tuiHighlight]", inputs: { tuiHighlight: "tuiHighlight", tuiHighlightColor: "tuiHighlightColor" }, host: { properties: { "style.position": "\"relative\"", "style.zIndex": "0" } }, providers: [ResizeObserverService], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: TuiHighlight, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[tuiHighlight]',
                    providers: [ResizeObserverService],
                    host: {
                        '[style.position]': '"relative"',
                        '[style.zIndex]': '0',
                    },
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tuiHighlight: [{
                type: Input
            }], tuiHighlightColor: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TUI_HIGHLIGHT_OPTIONS, TuiHighlight, tuiHighlightOptionsProvider };
//# sourceMappingURL=taiga-ui-kit-directives-highlight.mjs.map

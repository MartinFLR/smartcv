import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TuiMedia {
    private readonly el;
    private playbackRate;
    volume: number;
    readonly currentTimeChange: EventEmitter<number>;
    readonly pausedChange: EventEmitter<boolean>;
    readonly volumeChange: EventEmitter<number>;
    set playbackRateSetter(playbackRate: number);
    set currentTime(currentTime: number);
    set paused(paused: boolean);
    get currentTime(): number;
    get paused(): boolean;
    protected onPausedChange(paused: boolean): void;
    protected onVolumeChange(): void;
    protected onCurrentTimeChange(): void;
    private updatePlaybackRate;
    static ɵfac: i0.ɵɵFactoryDeclaration<TuiMedia, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TuiMedia, "video[tuiMedia], audio[tuiMedia]", ["tuiMedia"], { "volume": { "alias": "volume"; "required": false; }; "playbackRateSetter": { "alias": "playbackRate"; "required": false; }; "currentTime": { "alias": "currentTime"; "required": false; }; "paused": { "alias": "paused"; "required": false; }; }, { "currentTimeChange": "currentTimeChange"; "pausedChange": "pausedChange"; "volumeChange": "volumeChange"; }, never, never, true, never>;
}

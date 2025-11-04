import {Component, computed, input, Signal} from '@angular/core';
import {TuiHint, TuiLoader} from '@taiga-ui/core';
import {TuiProgress} from '@taiga-ui/kit';

@Component({
  selector: 'app-ats-section',
  imports: [
    TuiLoader,
    TuiHint,
    TuiProgress
  ],
  templateUrl: './ats-section.html',
  styleUrl: './ats-section.css',
})
export class ATSSection {
  score = input<number | null>(null);
  isLoading = input.required<boolean>();


  protected scoreColor: Signal<string> = computed(() => {
    const s = this.score();
    if (s === null) return 'var(--tui-support-08)';
    if (s < 50) return 'var(--tui-status-negative)';
    if (s < 80) return 'var(--tui-status-warning)';
    return 'var(--tui-status-positive)';
  });

  protected scoreText: Signal<string> = computed(() => {
    const s = this.score();
    if (s === null) return '--';
    return s.toFixed(0);
  });
}

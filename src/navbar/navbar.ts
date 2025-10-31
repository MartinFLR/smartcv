import {Component, HostListener, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TuiButton, TuiDataList, TuiDropdownDirective, TuiDropdownOpen} from '@taiga-ui/core';
import {TuiAppBar} from '@taiga-ui/layout';
import {TuiTabs} from '@taiga-ui/kit';

@Component({
  selector: 'app-navbar',
  imports: [
    NgClass,
    RouterLink,
    TuiButton,
    TuiDataList,
    TuiDropdownOpen,
    TuiAppBar,
    TuiDropdownDirective,
    TuiTabs,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen = signal(false);
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si el scroll vertical es mayor a 50px, activa isScrolled
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }
}

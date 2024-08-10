import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  isSlideOut = true;
  constructor(private route: Router) {}

  toggleSlideOut() {
    this.isSlideOut = !this.isSlideOut;
  }
  onDash() {}
  onProfile() {}
  onHistory() {}
  onLogout() {}
}

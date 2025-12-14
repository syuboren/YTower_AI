import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cta-section',
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.scss',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtaSectionComponent {
  showShoppingCta = input<boolean>(true);
  showContactCta = input<boolean>(true);
}


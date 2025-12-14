import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../../../shared/components';

interface ContactForm {
  name: string;
  gender: 'male' | 'female' | '';
  company: string;
  email: string;
  message: string;
}

@Component({
  standalone: true,
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent {
  breadcrumbItems = [
    { label: '聯絡我們' }
  ];

  formData = signal<ContactForm>({
    name: '',
    gender: '',
    company: '',
    email: '',
    message: ''
  });

  isSubmitting = signal(false);
  isSubmitted = signal(false);

  companyInfo = {
    name: '楊桃美食網｜YTower',
    company: '楊桃文化事業有限公司｜統編97465840',
    serviceHours: '週一至週五 10:00 - 18:00（例假日暫停服務）',
    line: '@ytservice（一定要加@喔！）',
    phone: '02-25819088',
    email: 'service@ytower.com.tw',
    mediaEmail: 'service@ytower.com.tw'
  };

  updateField<K extends keyof ContactForm>(field: K, value: ContactForm[K]): void {
    this.formData.update(current => ({
      ...current,
      [field]: value
    }));
  }

  onSubmit(): void {
    this.isSubmitting.set(true);
    
    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      
      // Reset form
      this.formData.set({
        name: '',
        gender: '',
        company: '',
        email: '',
        message: ''
      });
    }, 1500);
  }
}


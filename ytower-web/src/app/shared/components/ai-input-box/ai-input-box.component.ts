import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ai-input-box',
  templateUrl: './ai-input-box.component.html',
  styleUrl: './ai-input-box.component.scss',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiInputBoxComponent {
  placeholder = input<string>('例如：牛肉、洋蔥、咖哩塊...');
  buttonText = input<string>('✨ 生成食譜');
  isLoading = input<boolean>(false);
  
  generate = output<string>();
  
  inputValue = signal<string>('');

  onGenerate(): void {
    const value = this.inputValue();
    if (value.trim()) {
      this.generate.emit(value);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onGenerate();
    }
  }
}


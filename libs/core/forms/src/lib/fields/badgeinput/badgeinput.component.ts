import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '../../+state/forms.interfaces';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cdt-badgeinput',
  standalone: true,
  templateUrl: './badgeinput.component.html',
  styleUrls: ['./badgeinput.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeInputComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
  userInput = '';
  tags: string[] = [];
  setTags(newValue: string[]) {
    if (newValue.toString() != '') {
      this.tags = [];
      newValue.forEach((element) => {
        this.tags.push(element);
      });
    }
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === ',' && this.userInput.trim() !== '') {
      this.tags.push(this.userInput.trim());
      this.userInput = '';
      this.updateFieldValue();
      event.preventDefault();
    }
  }
  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.updateFieldValue();
  }
  updateFieldValue() {
    this.group.get(this.field.name)?.setValue(this.tags);
  }
}

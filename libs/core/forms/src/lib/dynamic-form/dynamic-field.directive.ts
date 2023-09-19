import { ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../+state/forms.interfaces';
import { BadgeInputComponent } from '../fields/badgeinput/badgeinput.component';
import { InputComponent } from '../fields/input/input.component';
import { TextareaComponent } from '../fields/textarea/textarea.component';

type Components = InputComponent | TextareaComponent | BadgeInputComponent;

const componentsMapper: { [key: string]: Type<Components> } = {
  INPUT: InputComponent,
  TEXTAREA: TextareaComponent,
  BADGEINPUT: BadgeInputComponent,
};

@Directive({
  selector: '[appDynamicField]',
  standalone: true,
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() field!: Field;
  @Input() group!: FormGroup;
  component!: ComponentRef<Components>;

  constructor(private container: ViewContainerRef) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.field = this.field;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    this.component = this.container.createComponent(componentsMapper[this.field.type]);
    this.component.instance.field = this.field;
    this.component.instance.group = this.group;
  }
}

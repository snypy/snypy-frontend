import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'app-bootstrap-switch',
  templateUrl: './bootstrap-switch.component.html',
  styleUrls: ['./bootstrap-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BootstrapSwitchComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class BootstrapSwitchComponent implements ControlValueAccessor {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() label: string;

  uniqueId: string = Math.random().toString(36).substr(2, 15);

  // Internal data model
  private innerValue = '';

  // Placeholders for the callbacks, provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // Accessor
  get value(): string {
    return this.innerValue;
  }

  // Set accessor including call the onchange callback
  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur(): void {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: string): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }
}

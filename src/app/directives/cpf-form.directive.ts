import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCpfFormFormatter]'
})
export class CpfFormFormatterDirective {
    
  private regex: RegExp = /[^\d]/g;
  private maxLength: number = 14;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    let formattedValue = this.formatCpf(value);
    formattedValue = formattedValue.substring(0, this.maxLength);
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', this.formatCpf(value));
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value.replace(this.regex, ''));
  }

  private formatCpf(cpf: string): string {
    cpf = cpf.replace(this.regex, '');
    if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2');
    }
    return cpf;
  }
}

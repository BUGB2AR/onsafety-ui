import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCpfFormatter]'
})
export class CpfFormatterDirective implements OnChanges {
  @Input() appCpfFormatter: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appCpfFormatter']) {
      this.el.nativeElement.textContent = this.formatCpf(this.appCpfFormatter);
    }
  }

  private formatCpf(cpf: string): string {
    return cpf
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d{3})/, '$1.$2')
      .replace(/(\d{3})(\d{2})/, '$1.$2')
      .replace(/(\d{3})(\d{2})/, '$1-$2');
  }
}

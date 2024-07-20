import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  person: { nome: string; email: string; cpf: string; dataNascimento: string } = {
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: ''
  };

  nameError: string | null = null;
  emailError: string | null = null;
  cpfError: string | null = null;
  dateError: string | null = null;
  errorMessage: string | null = null;

  constructor(private personService: PersonService, private router: Router) {}

  onSubmit(): void {
    this.resetErrors();

    if (this.isFormValid()) {
      const formData = { ...this.person };

      formData.cpf = this.removeCpfFormatting(formData.cpf);

      this.personService.add(formData).subscribe(
        () => {
          this.router.navigate(['/persons']);
        },
        (error) => {
          this.errorMessage = error?.error?.message || 'An unexpected error occurred. Please try again.';
        }
      );
    }
  }

  private removeCpfFormatting(cpf: string): string {
    return cpf.replace(/\D+/g, '');
  }

  private isFormValid(): boolean {
    let isValid = true;
    this.errorMessage = null;

    if (!this.person.nome) {
      this.nameError = 'Nome deve ser preenchido!!!';
      isValid = false;
    }

    if (!this.person.email || !this.isEmailValid(this.person.email)) {
      this.emailError = 'Email deve ser valido!!!';
      isValid = false;
    }

    if (!this.person.cpf || !this.isCpfValid(this.person.cpf)) {
      this.cpfError = 'Cpf informado incorretamente!!!';
      isValid = false;
    }

    if (!this.person.dataNascimento) {
      this.dateError = 'Data de nascimento deve ser informada!!!';
      isValid = false;
    }

    if (!isValid) {
      this.errorMessage = 'Deve ser preenchido corretamente todos os campos solicitados!!!';
    }

    return isValid;
  }

  private isEmailValid(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private isCpfValid(cpf: string): boolean {
    return cpf.replace(/\D+/g, '').length === 11;
  }

  private resetErrors(): void {
    this.nameError = null;
    this.emailError = null;
    this.cpfError = null;
    this.dateError = null;
    this.errorMessage = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { PersonRequest } from '../../models/person-request.model';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent  implements OnInit {
  person: PersonRequest = {
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: new Date().toISOString().split('T')[0]
  };

  errorMessage: string | null = null;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPersonDetails();
  }

  private loadPersonDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService.findById(id).subscribe(
        (person) => {
          this.person = person;
          
          if (person.dataNascimento) {
            this.person.dataNascimento = new Date(person.dataNascimento).toISOString().split('T')[0];
          }
        },
        (error) => {
          this.errorMessage = 'Ocorreu um erro ao carregar os detalhes da pessoa.';
        }
      );
    }
  }

  onUpdate(): void {
    this.errorMessage = null;

    if (this.isFormValid()) {
      const id = +this.route.snapshot.paramMap.get('id');
      if (id) {
        this.personService.update(id, this.person).subscribe(
          () => {
            this.router.navigate(['/persons']);
          },
          (error) => {
            this.errorMessage = error.message || 'Ocorreu um erro ao tentar atualizar a pessoa selecionada.';
          }
        );
      }
    }
  }

   isFormValid(): boolean {
    let isValid = true;

    if (!this.person.nome) {
      this.errorMessage = 'Nome deve ser preenchido!!!';
      isValid = false;
    }

    if (!this.person.email || !this.isEmailValid(this.person.email)) {
      this.errorMessage = 'Email deve ser valido!!!';
      isValid = false;
    }

    if (!this.person.cpf || !this.isCpfValid(this.person.cpf)) {
      this.errorMessage = 'Cpf informado incorretamente!!!';
      isValid = false;
    }

    if (!this.person.dataNascimento) {
      this.errorMessage = 'Data de nascimento deve ser informada!!!';
      isValid = false;
    }

    return isValid;
  }

   isEmailValid(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

   isCpfValid(cpf: string): boolean {
    return cpf.replace(/\D+/g, '').length === 11;
  }
}
import { Component, OnInit } from '@angular/core';
import { PersonResponse } from '../../models/person-response.model';
import { PersonService } from '../../services/person.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email','cpf', 'actions'];
  dataSource: MatTableDataSource<PersonResponse> = new MatTableDataSource<PersonResponse>();

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.findAll().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => console.error('Erro ao carregar pessoas.', error)
    );
  }

  deletePerson(id: number): void {
    if (confirm('Deseja remover a pessoa selecionada?')) {
      this.personService.delete(id).subscribe(
        () => this.loadPersons(),
        (error) => console.error('Erro ao remover pessoa', error)
      );
    }
  }
}

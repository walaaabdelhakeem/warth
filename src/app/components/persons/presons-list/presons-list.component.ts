import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataServiceService } from '../../organisition/organisation-service/organisetion-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { v4 as uuidv4 } from 'uuid'; // ← نحتاج uuid
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PersonListServiceService } from '../persons-services/person-list-service.service';
import { PersonListInterface } from '../persons-interface/person-list-interface';
@Component({
  selector: 'app-presons-list',
 imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  templateUrl: './presons-list.component.html',
  styleUrl: './presons-list.component.scss'
})
export class PresonsListComponent implements OnInit {
  @Output() organisationseinheitSelected = new EventEmitter<string>();
  dataSource: MatTableDataSource<PersonListInterface> = new MatTableDataSource();
  includeInactive: boolean = false;
  displayedColumns: string[] = [
    'aktiv',
    'geprueft',
    'nachname',
    'vorname',
    'mitarbeiterart',
    'stundenkontingentJaehrlich',
    'stundenGeplantDiesesJahr',
    'stundenGebuchtDiesesJahr',
    'rolle'
  ];
  searchTerm: string = '';
  isWhiteBg: boolean = true;
  datalistoftaple: PersonListInterface[] = [];
  selectedRows: PersonListInterface[] = [];

  constructor(
    private personListServiceService: PersonListServiceService,
    private router: Router,
    private sharedDataService: SharedDataServiceService
  ) { }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('de-AT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  createOrganisationseinheit(): void {
    this.sharedDataService.clearSelectedOrganization();

    this.router.navigate(['/products', ' ']);
  }

  toggleInactive(): void {

    if (this.includeInactive) {
      this.dataSource.data = this.personListServiceService.getAllData();
    } else {
      this.dataSource.data = this.personListServiceService.getActiveData();
    }
    this.applyFilter();
  }


  ngOnInit(): void {
    this.dataSource.data = this.personListServiceService.getActiveData();
    console.log("deleted",this.dataSource.data)
    this.dataSource.filterPredicate = (data: PersonListInterface , filter: string) => {
      return (
        data.nachname?.toLowerCase().includes(filter) ||
        data.vorname?.toLowerCase().includes(filter)
      );
    };
    this.reloadData();
  }
  reloadData() {
    this.dataSource.data = this.personListServiceService.getActiveData();
  }

    selectRow(id: string): void {
  this.router.navigate(['/products', id]);
}
}
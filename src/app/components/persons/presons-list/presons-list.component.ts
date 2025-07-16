import { Component, EventEmitter, OnInit, Output } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { SharedDataServiceService } from '../../organisition/organisation-service/organisetion-service.service';
=======
import { Datalistorganizationanc } from '../../../models/datalistorganizationanc';
import { Router } from '@angular/router';
import { SharedDataServiceService } from '../../organisition/organisation-service/organisetion-service.service';
import { DataoforganizationlistService } from '../../organisition/dataoforganisation-list.service';
>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639
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
<<<<<<< HEAD
import { v4 as uuidv4 } from 'uuid'; // ← نحتاج uuid
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PersonListServiceService } from '../persons-services/person-list-service.service';
import { PersonListInterface } from '../persons-interface/person-list-interface';
=======

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639
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
<<<<<<< HEAD
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
=======
  dataSource: MatTableDataSource<Datalistorganizationanc> = new MatTableDataSource();
  includeInactive: boolean = false;
  displayedColumns: string[] = [
    'kurzbezeichnung',
    'bezeichnung',
    'leitung',
    'uebergeordneteEinheit',
    'gueltigVon',
    'gueltigBis',
  ];
  searchTerm: string = '';
  isWhiteBg: boolean = true;
  datalistoftaple: Datalistorganizationanc[] = [];
  selectedRows: Datalistorganizationanc[] = [];

  constructor(
    private dataoforganizationlistService: DataoforganizationlistService,
>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639
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

<<<<<<< HEAD
    this.router.navigate(['/products', ' ']);
=======
    this.router.navigate(['/organization/new']);
>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639
  }

  toggleInactive(): void {

    if (this.includeInactive) {
<<<<<<< HEAD
      this.dataSource.data = this.personListServiceService.getAllData();
    } else {
      this.dataSource.data = this.personListServiceService.getActiveData();
    }
=======
      this.dataSource.data = this.dataoforganizationlistService.getAllData();
    } else {
      this.dataSource.data = this.dataoforganizationlistService.getActiveData();
    }

>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639
    this.applyFilter();
  }


  ngOnInit(): void {
<<<<<<< HEAD
    this.dataSource.data = this.personListServiceService.getActiveData();
    console.log("deleted",this.dataSource.data)
    this.dataSource.filterPredicate = (data: PersonListInterface , filter: string) => {
      return (
        data.nachname?.toLowerCase().includes(filter) ||
        data.vorname?.toLowerCase().includes(filter)
=======
    this.dataSource.data = this.dataoforganizationlistService.getActiveData();
    this.dataSource.filterPredicate = (data: Datalistorganizationanc, filter: string) => {
      return (
        data.kurzBezeichnung?.toLowerCase().includes(filter) ||
        data.bezeichnung?.toLowerCase().includes(filter)
>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639
      );
    };
    this.reloadData();
  }
  reloadData() {
<<<<<<< HEAD
    this.dataSource.data = this.personListServiceService.getActiveData();
  }

    selectRow(id: string): void {
  this.router.navigate(['/products', id]);
}
=======
    this.dataSource.data = this.dataoforganizationlistService.getActiveData();
  }

  selectRow(row: Datalistorganizationanc): void {
    this.selectedRows = [row]; // Clear previous selections and select only the current row
    this.sharedDataService.setSelectedOrganization(row);
    this.router.navigate(['/organization/new']);
  }
>>>>>>> 3cb4bd9814ae655b23ad68bba5e7d9541b05a639
}
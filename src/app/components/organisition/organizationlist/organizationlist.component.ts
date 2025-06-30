import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

import { OrganisationseinheitService } from '../../../services/organisationseinheit.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Datalistorganizationanc } from '../../../models/datalistorganizationanc';
import { DataoforganizationlistService } from '../dataoforganizationlist.service';

@Component({
  selector: 'app-organizationlist',
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
  templateUrl: './organizationlist.component.html',
  styleUrl: './organizationlist.component.scss'
})
export class OrganizationlistComponent implements OnInit {
  constructor(private dataoforganizationlistService: DataoforganizationlistService) { }
  @Output() organisationseinheitSelected = new EventEmitter<string>();
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
  datalistoftaple: Datalistorganizationanc[] = []
  
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
    // When creating a new organisationseinheit, emit 'new' to indicate new organisationseinheit
    this.organisationseinheitSelected.emit('new');
  }
   toggleInactive(): void {
    this.includeInactive = !this.includeInactive;
    if (this.includeInactive) {
      this.dataSource.data = this.dataoforganizationlistService.getAllData(); // Show all
    } else {
      this.dataSource.data = this.dataoforganizationlistService.getActiveData(); // Show only active
    }
    this.applyFilter();
  }

  ngOnInit(): void {
    this.dataSource.data = this.dataoforganizationlistService.getActiveData();
    this.dataSource.filterPredicate = (data: Datalistorganizationanc, filter: string) => {
      return (
        data.kurzBezeichnung?.toLowerCase().includes(filter) ||
        data.bezeichnung?.toLowerCase().includes(filter)
      );
    };
  }

}
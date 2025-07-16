import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // لو بتستخدمي التاريخ native
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion'; // لو هتستخدمي Accordion
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-presons-details',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule],
  templateUrl: './presons-details.component.html',
  styleUrl: './presons-details.component.scss'
})
export class PresonsDetailsComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;

  constructor(   private fb: FormBuilder,  private route: ActivatedRoute,    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.http.get<any>('assets/data/persons.json').subscribe(data => {
      let personData = this.id
        ? data.find((item: any) => item.id === this.id)
        : this.createEmptyPerson();

      this.createForm(personData);
    });
  }

  createForm(data: any) {
    this.form = this.fb.group({
      titel: [data.titel],
      vorname: [data.vorname],
      nachname: [data.nachname],
      gebdat: [data.gebdat],
      email: [data.email],
      telefonNummer: [data.telefonNummer],
      mitarbeiterart: [data.mitarbeiterart],
      firma: [data.firma],
      bezeichnung: [data.organisationseinheit?.bezeichnung],
      kurzBezeichnung: [data.organisationseinheit?.kurzBezeichnung],
    });
  }

  createEmptyPerson() {
    return {
      titel: '',
      vorname: '',
      nachname: '',
      gebdat: '',
      email: '',
      telefonNummer: '',
      mitarbeiterart: '',
      firma: '',
      organisationseinheit: {
        bezeichnung: '',
        kurzBezeichnung: ''
      }
    };
  }
}
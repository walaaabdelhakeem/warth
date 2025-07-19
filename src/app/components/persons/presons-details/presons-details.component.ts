import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonsDetailsInterface, Vertrag } from '../persons-interface/persons-details-interface';
import { PersonsDetailsService } from '../persons-services/persons-details.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-persons-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatRadioModule,
    MatDividerModule
  ],
  templateUrl: './presons-details.component.html',
  styleUrl: './presons-details.component.scss'
})
export class PersonsDetailsComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;
  loading = false;
  isEditMode = false;
  persons: PersonsDetailsInterface[] = [];
  isFormEditable = false;
  saving = false;
  openSections: { [key: string]: boolean } = {};
  contractsData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonsDetailsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.persons = this.personService.getPersons();
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.id || this.id.trim() === '') {
      this.createEmptyForm();
      this.isEditMode = false;
      this.isFormEditable = true;
    } else {
      const selectedPerson = this.persons.find(p => p.id === '1500000000579');
      if (selectedPerson) {
        this.createForm(selectedPerson);
        this.isEditMode = true;
        this.form.disable();
      } else {
        this.createEmptyForm();
      }
    }
  }

  createForm(data: PersonsDetailsInterface): void {
    this.form = this.fb.group({
      personData: this.fb.group({
        inputVerified: [data.geprueft || false],
        title: [data.titel || ''],
        familyName: [data.nachname || '', Validators.required],
        firstName: [data.vorname || '', Validators.required],
        birthDate: [data.gebdat || ''],
        gender: [data.geschlecht || ''],
        active: [data.aktiv || false],
        nationality: [data.staatsangehoerigkeit || ''],
        note: [data.vertrag?.[0]?.anmerkung || '']
      }),

      organizationData: this.fb.group({
        entryDate: [data.eintrittsDatum || ''],
        exitDate: [data.austrittsDatum || ''],
        businessEmail: [data.email || '', [Validators.email]],
        externalEmail: [data.emailPrivat || '', [Validators.email]],
        phoneNumber: [data.telefonNummer || ''],
        mobileNumberBMI: [data.mobilNummerBmi || ''],
        externalMobileNumber: [data.mobilNummer || ''],
        roomNumber: [''],
        releaseGroup: [data.freigabegruppe || ''],
        organizationalUnit: [data.organisationseinheit?.bezeichnung || ''],
        employeeType: [data.mitarbeiterart || ''],
        employmentUse: [data.dienstverwendung || ''],
        responsiblePerson: [
          data.personenverantwortlicher 
            ? `${data.personenverantwortlicher.vorname} ${data.personenverantwortlicher.nachname}`
            : ''
        ],
        teamAssignment: [data.teamzuordnung || ''],
        teamLeader: [
          data.teamleiter
            ? `${data.teamleiter.vorname} ${data.teamleiter.nachname}`
            : ''
        ],
        isTeamLeader: [data.funktion?.includes('Teamleiter') || false],
        isDepartmentLeader: [data.funktion?.includes('Abteilungsleiter') || false]
      }),

      operationalData: this.fb.group({
        personalNumber: [data.id || ''],
        leerPdf: [data.leerPdf || false],
        portalUserId: [data.portalUser || ''],
        baksId: [data.windowsBenutzerkonto || ''],
        criminalRecord: [data.strafregisterbescheid || ''],
        conflictOfInterest: [''],
        performanceCategory: [data.leistungskategorie || ''],
        annualHours: [data.stundenkontingentJaehrlich || ''],
        contractHours: [data.stundenkontingentJaehrlichVertrag || ''],
        hourlyRate: [data.stundensatz || ''],
        onCallRate: [data.bereitschaftsStundensatz || ''],
        selfEmployed: [data.selbststaendig || false],
        employedAt: [data.firma || ''],
        geltlRole: [data.rolle || ''],
        bucher: [data.bucher || ''],
        canStamp: [data.recht?.includes('Stempeln') || false],
        lanAccess: [data.recht?.includes('LAN-Zugang') || false],
        remoteUser: [data.recht?.includes('Remote-User') || false],
        onCall: [data.recht?.includes('Bereitschaft') || false],
        officeStamp: [data.recht?.includes('Dienstort-Stempeln') || false],
        homeOfficeStamp: [data.recht?.includes('HomeOffice-Stempeln') || false],
        teleworker: [data.recht?.includes('Teleworker') || false]
      }),

      vertragsdat: this.fb.array(this.buildContractsArray(data.vertrag || []))
    });
  }
get vertragsArray(): FormArray {
  return this.form.get('vertragsdat') as FormArray;
}
  private buildContractsArray(contracts: Vertrag[]): FormGroup[] {
    return contracts.map(contract => this.fb.group({
      vertragsname: [contract.vertragsname || ''],
      stundenGeplant: [contract.stundenGeplant || ''],
      stundenGebucht: [contract.stundenGebucht || ''],
      vertragssumme: [contract.vertragssumme || ''],
      gueltigVon: [contract.gueltigVon || ''],
      gueltigBis: [contract.gueltigBis || ''],
      aktiv: [contract.aktiv || false],
      vertragsTyp: [contract.vertragsTyp || ''],
      vertragPosition: this.fb.array(this.buildPositionsArray(contract.vertragPosition || []))
    }));
  }

  private buildPositionsArray(positions: any[]): FormGroup[] {
    return positions.map(pos => this.fb.group({
      position: [pos.position || ''],
      volumenStunden: [pos.volumenStunden || ''],
      volumenEuro: [pos.volumenEuro || ''],
      stundenGeplant: [pos.stundenGeplant || ''],
      stundenGebucht: [pos.stundenGebucht || ''],
      planungsjahr: [pos.planungsjahr || ''],
      jahresuebertrag: [pos.jahresuebertrag || false],
      vertragPositionVerbraucher: this.fb.array(this.buildVerbraucherArray(pos.vertragPositionVerbraucher || []))
    }));
  }

  private buildVerbraucherArray(verbraucher: any[]): FormGroup[] {
    return verbraucher.map(v => this.fb.group({
      volumenStunden: [v.volumenStunden || ''],
      volumenEuro: [v.volumenEuro || ''],
      stundenGeplant: [v.stundenGeplant || ''],
      stundenGebucht: [v.stundenGebucht || ''],
      verbraucherTyp: [v.verbraucherTyp || '']
    }));
  }

  get vertragsdat(): FormArray {
    return this.form.get('vertragsdat') as FormArray;
  }

  getVertragPositionControls(contractIndex: number): FormArray {
    return this.vertragsdat.at(contractIndex).get('vertragPosition') as FormArray;
  }

  getVerbraucherControls(contractIndex: number, positionIndex: number): FormArray {
    return this.getVertragPositionControls(contractIndex)
      .at(positionIndex)
      .get('vertragPositionVerbraucher') as FormArray;
  }

  createEmptyForm(): void {
    this.form = this.fb.group({
      personData: this.fb.group({
        inputVerified: [false],
        title: [''],
        familyName: ['', Validators.required],
        firstName: ['', Validators.required],
        birthDate: [''],
        gender: [''],
        active: [false],
        nationality: [''],
        note: ['']
      }),

      organizationData: this.fb.group({
        entryDate: [''],
        exitDate: [''],
        businessEmail: ['', [Validators.email]],
        externalEmail: ['', [Validators.email]],
        phoneNumber: [''],
        mobileNumberBMI: [''],
        externalMobileNumber: [''],
        roomNumber: [''],
        releaseGroup: [''],
        organizationalUnit: [''],
        employeeType: [''],
        employmentUse: [''],
        responsiblePerson: [''],
        teamAssignment: [''],
        teamLeader: [''],
        isTeamLeader: [false],
        isDepartmentLeader: [false]
      }),

      operationalData: this.fb.group({
        personalNumber: [''],
        leerPdf: [false],
        portalUserId: [''],
        baksId: [''],
        criminalRecord: [''],
        conflictOfInterest: [''],
        performanceCategory: [''],
        annualHours: [''],
        contractHours: [''],
        hourlyRate: [''],
        onCallRate: [''],
        selfEmployed: [false],
        employedAt: [''],
        geltlRole: [''],
        bucher: [''],
        canStamp: [false],
        lanAccess: [false],
        remoteUser: [false],
        onCall: [false],
        officeStamp: [false],
        homeOfficeStamp: [false],
        teleworker: [false]
      }),

      vertragsdat: this.fb.array([])
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.saving = true;
    const formValue = this.form.value;
    const id = this.id || this.generateId();

    const personData: PersonsDetailsInterface = {
      id,
      version: 1,
      deleted: false,
      titel: formValue.personData.title,
      vorname: formValue.personData.firstName,
      nachname: formValue.personData.familyName,
      gebdat: formValue.personData.birthDate,
      geschlecht: formValue.personData.gender,
      geprueft: formValue.personData.inputVerified,
      aktiv: formValue.personData.active,
      staatsangehoerigkeit: formValue.personData.nationality,
      email: formValue.organizationData.businessEmail,
      emailPrivat: formValue.organizationData.externalEmail,
      telefonNummer: formValue.organizationData.phoneNumber,
      mobilNummerBmi: formValue.organizationData.mobileNumberBMI,
      mobilNummer: formValue.organizationData.externalMobileNumber,
      eintrittsDatum: formValue.organizationData.entryDate,
      austrittsDatum: formValue.organizationData.exitDate,
      mitarbeiterart: formValue.organizationData.employeeType,
      dienstverwendung: formValue.organizationData.employmentUse,
      teamzuordnung: formValue.organizationData.teamAssignment,
      funktion: this.getFunktionen(formValue.organizationData),
      organisationseinheit: {
        id: '',
        bezeichnung: formValue.organizationData.organizationalUnit,
        kurzBezeichnung: '',
        email: [formValue.organizationData.businessEmail],
        gueltigVon: '',
        gueltigBis: '',
        version: 1,
        deleted: false
      },
      personenverantwortlicher: {
        id: '',
        vorname: this.getVorname(formValue.organizationData.responsiblePerson),
        nachname: this.getNachname(formValue.organizationData.responsiblePerson),
        recht: [],
        funktion: [],
        vertrag: []
      },
      teamleiter: {
        id: '',
        vorname: this.getVorname(formValue.organizationData.teamLeader),
        nachname: this.getNachname(formValue.organizationData.teamLeader),
        recht: [],
        funktion: [],
        vertrag: []
      },
      vertrag: formValue.vertragsdat?.map((v: any) => ({
        id: '',
        version: 1,
        deleted: false,
        vertragsname: v.vertragsname,
        vertragspartner: '',
        erstelldatum: '',
        gueltigVon: v.gueltigVon,
        gueltigBis: v.gueltigBis,
        aktiv: v.aktiv,
        auftraggeber: '',
        vertragszusatz: '',
        vertragssumme: v.vertragssumme,
        vertragsTyp: v.vertragsTyp,
        vertragPosition: v.vertragPosition?.map((p: any) => ({
          position: p.position,
          volumenStunden: p.volumenStunden,
          volumenEuro: p.volumenEuro,
          stundenGeplant: p.stundenGeplant,
          stundenGebucht: p.stundenGebucht,
          planungsjahr: p.planungsjahr,
          jahresuebertrag: p.jahresuebertrag,
          vertragPositionVerbraucher: p.vertragPositionVerbraucher?.map((vb: any) => ({
            volumenStunden: vb.volumenStunden,
            volumenEuro: vb.volumenEuro,
            stundenGeplant: vb.stundenGeplant,
            stundenGebucht: vb.stundenGebucht,
            verbraucherTyp: vb.verbraucherTyp
          }))
        })),
        lkKennung: false,
        lkDetails: [],
        trigger: [],
        stundenGeplant: v.stundenGeplant,
        stundenGebucht: v.stundenGebucht,
        anmerkung: formValue.personData.note
      })) || [],
      recht: this.getSelectedRights(formValue.operationalData),
      stundenkontingentJaehrlich: formValue.operationalData.annualHours,
      stundenkontingentJaehrlichVertrag: formValue.operationalData.contractHours,
      stundensatz: formValue.operationalData.hourlyRate,
      bereitschaftsStundensatz: formValue.operationalData.onCallRate,
      selbststaendig: formValue.operationalData.selfEmployed,
      firma: formValue.operationalData.employedAt,
      rolle: formValue.operationalData.geltlRole,
      bucher: formValue.operationalData.bucher,
      portalUser: formValue.operationalData.portalUserId,
      windowsBenutzerkonto: formValue.operationalData.baksId,
      strafregisterbescheid: formValue.operationalData.criminalRecord,
      leistungskategorie: formValue.operationalData.performanceCategory,
      leerPdf: formValue.operationalData.leerPdf,
      stundenGeplantDiesesJahr: 0,
      stundenGebuchtDiesesJahr: '0',
      freigabegruppe: formValue.organizationData.releaseGroup
    };

    if (this.isEditMode) {
      this.personService.updatePerson(personData);
    } else {
      this.personService.addPerson(personData);
    }

    this.saving = false;
    this.snackBar.open('Daten wurden erfolgreich gespeichert', 'Schließen', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    this.router.navigate(['/preson2']);
  }

  onCancel(): void {
    this.router.navigate(['/preson2']);
  }

  onEditOrSubmit(): void {
    if (!this.isFormEditable) {
      this.form.enable();
      this.isFormEditable = true;
    } else {
      this.onSubmit();
    }
  }

  private generateId(): string {
    return Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
  }

  private getVorname(fullName: string): string {
    return fullName?.split(' ')[0] || '';
  }

  private getNachname(fullName: string): string {
    const parts = fullName?.split(' ') || [];
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }

  private getFunktionen(data: any): string[] {
    const funktionen = [];
    if (data.isTeamLeader) funktionen.push('Teamleiter');
    if (data.isDepartmentLeader) funktionen.push('Abteilungsleiter');
    return funktionen;
  }

  private getSelectedRights(rights: any): string[] {
    const selectedRights = [];
    if (rights?.canStamp) selectedRights.push('Stempeln');
    if (rights?.lanAccess) selectedRights.push('LAN-Zugang');
    if (rights?.remoteUser) selectedRights.push('Remote-User');
    if (rights?.onCall) selectedRights.push('Bereitschaft');
    if (rights?.officeStamp) selectedRights.push('Dienstort-Stempeln');
    if (rights?.homeOfficeStamp) selectedRights.push('HomeOffice-Stempeln');
    if (rights?.teleworker) selectedRights.push('Teleworker');
    return selectedRights;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          }
        });
      }
    });
  }

  isSectionOpen(section: string): boolean {
    return this.openSections[section] || false;
  }

  toggleSection(section: string): void {
    this.openSections[section] = !this.openSections[section];
  }

  toggleContractNode(contractId: string): void {
    const contract = this.contractsData.find(c => c.id === contractId);
    if (contract) contract.expanded = !contract.expanded;
  }

  toggleDetailNode(contractId: string, detailId: string): void {
    const contract = this.contractsData.find(c => c.id === contractId);
    const detail = contract?.details.find((d: any) => d.id === detailId);
    if (detail) detail.expanded = !detail.expanded;
  }
  
  expandedContracts: {[key: string]: boolean} = {
    contract1: true,
    subContract1: true
  };

  toggleContractExpansion(contractId: string): void {
    this.expandedContracts[contractId] = !this.expandedContracts[contractId];
  }

}
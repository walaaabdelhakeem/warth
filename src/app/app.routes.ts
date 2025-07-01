import { Routes } from '@angular/router';
import { TimeTrackingTableComponent } from './components/time-tracking-table/time-tracking-table.component';
import { AttendanceListComponent } from './components/attendance/attendance-list.component';
import { ActivityBookingComponent } from './components/activity-booking/activity-booking.component';
import { AnwesenheitslisteListComponent } from './components/anwesenheitsliste/anwesenheitsliste-list/anwesenheitsliste-list.component';
import { AbwesenheitListComponent } from './components/abwesenheit/abwesenheit-list/abwesenheit-list.component';
import { ProdukteComponent } from './components/produkte/produkte.component';
import { PersonenComponent } from './components/personen/personen.component';
import { PersonFormComponent } from './components/personen/person-form/person-form.component';
import { OrganisationseinheitListComponent } from './components/organisationseinheit/organisationseinheit-list/organisationseinheit-list.component';
import { TaetigkeitenHistorischListComponent } from './components/taetigkeiten-historisch/taetigkeiten-historisch-list/taetigkeiten-historisch-list.component';
import { TaetigkeitenKorrigierenListComponent } from './components/taetigkeiten-korrigieren/taetigkeiten-korrigieren-list/taetigkeiten-korrigieren-list.component';
import { AbwesenheitKorrigierenListComponent } from './components/abwesenheit-korrigieren/abwesenheit-korrigieren-list/abwesenheit-korrigieren-list.component';
import { NachverrechnungListComponent } from './components/nachverrechnung/nachverrechnung-list/nachverrechnung-list.component';
import { BereitschaftKorrigierenListComponent } from './components/bereitschaft-korrigieren/bereitschaft-korrigieren-list/bereitschaft-korrigieren-list.component';
import { StempelzeitListComponent } from './components/stempelzeit/stempelzeit-list/stempelzeit-list.component';
import { PersonenListComponent } from './components/personen/personen-list/personen-list.component';
import { PersonenDetailComponent } from './components/personen/personen-detail/personen-detail.component';
import { AbsenceListComponent } from './components/absence/absence-list/absence-list.component';
import { AbsenceComponent } from './components/absence/absence/absence.component';
import { OrganizationdetailsComponent } from './components/organisition/organizationdetails/organizationdetails.component';
import { OrganizationlistComponent } from './components/organisition/organizationlist/organizationlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'edit-absence', pathMatch: 'full' },
  { path: 'attendance', component: AttendanceListComponent },
  { path: 'anwesenheitsliste', component: AnwesenheitslisteListComponent },
  { path: 'book-activities', component: ActivityBookingComponent },
  { path: 'activities-history', component: TaetigkeitenHistorischListComponent },
  { path: 'edit-activities', component: TaetigkeitenKorrigierenListComponent },
  { path: 'abwesenheit', component: AbwesenheitListComponent },
  { path: 'abwesenheit-2', component: AbsenceComponent },
  { path: 'edit-absence', component: AbwesenheitKorrigierenListComponent },
  { path: 'calculation', component: NachverrechnungListComponent },
  { path: 'standby', component: BereitschaftKorrigierenListComponent },
  { path: 'approve', component: TimeTrackingTableComponent },
  { path: 'history', component: TimeTrackingTableComponent },
  { path: 'timestamps', component: StempelzeitListComponent },
  { path: 'persons', component: PersonenComponent },
  { path: 'person-form', component: PersonFormComponent },
  { path: 'personen', component: PersonenListComponent },
  { path: 'personen/:id', component: PersonenDetailComponent },
  { path: 'products', component: ProdukteComponent },
  { path: 'contracts', component: TimeTrackingTableComponent },
  { path: 'organization', component: OrganisationseinheitListComponent },
  { path: 'organization2',component:OrganizationlistComponent},
  { path: 'organization/new',component:OrganizationdetailsComponent},
  { path: 'civilian-service', component: TimeTrackingTableComponent },
  { path: 'reports', component: TimeTrackingTableComponent },
  { path: 'exit', component: TimeTrackingTableComponent },
  { path: '**', redirectTo: 'edit-absence' },
];

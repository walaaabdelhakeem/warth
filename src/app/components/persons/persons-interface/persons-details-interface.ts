
export interface PersonsDetailsInterface {
  id: string
  version: number
  deleted: boolean
  titel: string
  vorname: string
  nachname: string
  geschlecht: string
  gebdat: string
  portalUser: string
  email: string
  eintrittsDatum: string
  austrittsDatum: string
  aktiv: boolean
  mobilNummer: string
  mobilNummerBmi: string
  telefonNummer: string
  emailPrivat: string
  staatsangehoerigkeit: string
  organisationseinheit: Organisationseinheit 
  rolle: string
  bucher: string
  recht: string[]
  dienstverwendung: string
  mitarbeiterart: string
  firma: string
  selbststaendig: boolean
  windowsBenutzerkonto: string
  leistungskategorie: string
  stundensatz: string
  geprueft: boolean
  stundenkontingentJaehrlich: string
  stundenkontingentJaehrlichVertrag: string
  leerPdf: boolean
  bereitschaftsStundensatz: string
  personenverantwortlicher: Personenverantwortlicher
  teamzuordnung: string
  strafregisterbescheid: string
  teamleiter: Teamleiter
  funktion: string[]
  freigabegruppe: string
  vertrag: Vertrag[]
  stundenGeplantDiesesJahr: number
  stundenGebuchtDiesesJahr: string
}

export interface Organisationseinheit {
  id: string
  version: number
  deleted: boolean
  bezeichnung: string
  kurzBezeichnung: string
  gueltigVon: string
  gueltigBis: string
  email: any[]
}

export interface Personenverantwortlicher {
  id: string
  vorname: string
  nachname: string
  recht: any[]
  funktion: any[]
  vertrag: any[]
}

export interface Teamleiter {
  id: string
  vorname: string
  nachname: string
  recht: any[]
  funktion: any[]
  vertrag: any[]
}

export interface Vertrag {
  id: string
  version: number
  deleted: boolean
  vertragsname: string
  vertragspartner: string
  erstelldatum: string
  gueltigVon: string
  gueltigBis: string
  aktiv: boolean
  auftraggeber: string
  vertragszusatz: string
  anmerkung?: string
  vertragssumme: string
  vertragsTyp: string
  vertragPosition: VertragPosition[]
  lkKennung: boolean
  lkDetails: any[]
  trigger: any[]
  stundenGeplant: string
  stundenGebucht: string
  auftragsreferenz?: string
  elak?: string
  beschaffungsnummer?: string
  geschaeftszahl?: string
  bezugsart?: string
  lkBasisstundensatz?: string
  volumenLeistungspunkte?: string
}

export interface VertragPosition {
  id: string
  version: number
  deleted: boolean
  position: string
  volumenStunden: string
  volumenEuro: string
  anmerkung?: string
  aktiv: boolean
  vertragPositionVerbraucher: VertragPositionVerbraucher[]
  planungsjahr: string
  jahresuebertrag: boolean
  stundenGeplant: string
  stundenGebucht: string
  rollenbezeichnungRahmenvertrag?: string
}

export interface VertragPositionVerbraucher {
  id: string
  version: number
  deleted: boolean
  volumenStunden: string
  stundenpreis: string
  volumenEuro: string
  verbraucherTyp: string
  aktiv: boolean
  lkKennung: boolean
  stundenGeplant: string
  stundenGebucht: string
  stundenplanung: any[]
  trigger: any[]
  anmerkung?: string
}

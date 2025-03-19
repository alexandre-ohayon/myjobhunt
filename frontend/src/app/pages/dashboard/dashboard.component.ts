import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CandidacyService } from '../../services/candidacy.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CandidacyDialogComponent } from '../../components/update-candidacy-dialog/update-candidacy-dialog.component';
import { Candidature as CandidatureModel } from '../../models/candidature.model';
import { AddCandidacyDialogComponent } from '../../components/add-candidacy-dialog/add-candidacy-dialog.component';

interface Candidacy {
  id?: number;
  entreprise: string;
  poste: string;
  statut: string;
  lien?: string;
  recruteur?: string;
  stack?: string;
  dateEntretien?: string;
  numeroEntretien?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
  ]
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['entreprise', 'poste', 'statut', 'lien', 'recruteur', 'stack', 'dateEntretien', 'numeroEntretien', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<CandidatureModel>([]);

  constructor(private candidacyService: CandidacyService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCandidacy();
  }

  loadCandidacy() {
    this.candidacyService.getCandidacy().subscribe(
      (data: CandidatureModel[]) => {
        console.log("Données reçues :", data);

        this.dataSource.data = data.map(c => ({
          id: c.id || 0,
          entreprise: c.entreprise || '',
          poste: c.poste || '',
          statut: c.statut || '',
          lien: c.lien ?? '',
          recruteur: c.recruteur ?? '',
          stack: c.stack ?? '',
          dateEntretien: c.dateEntretien ?? '',
          numeroEntretien: c.numeroEntretien !== null && c.numeroEntretien !== undefined ? parseInt(c.numeroEntretien.toString(), 10) : 0
        }));

        console.log("Données transformées :", this.dataSource.data);
      },
      (error) => {
        console.error('Erreur lors du chargement des candidatures:', error);
      }
    );
}

updateCandidacy(candidacy: Candidacy) {
  const dialogRef = this.dialog.open(CandidacyDialogComponent, {
    width: '500px',
    data: { ...candidacy }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log("Candidature modifiée :", result);
      this.candidacyService.updateCandidacy(candidacy.id!, result).subscribe(() => {
        this.loadCandidacy();
      });
    }
  });
}

  deleteCandidacy(candidature: CandidatureModel) {
    const confirmation = confirm(`Supprimer la candidature chez ${candidature.entreprise} ?`);
    if (confirmation) {
      this.candidacyService.deleteCandidacy(candidature.id!).subscribe(() => {
        this.loadCandidacy();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  filterByStatut(statut: string) {
    this.dataSource.filterPredicate = (data: CandidatureModel, filter: string) => {
      return data.statut.toLowerCase().includes(filter);
    };
    this.dataSource.filter = statut ? statut.toLowerCase() : '';
  }

  addCandidacy() {
    const dialogRef = this.dialog.open(AddCandidacyDialogComponent, {
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.candidacyService.createCandidacy(result).subscribe(() => {
          this.loadCandidacy();
        });
      }
    });
  }
}

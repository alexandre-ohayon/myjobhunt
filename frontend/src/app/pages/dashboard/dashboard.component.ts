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
import { UpdateCandidacyDialogComponent } from '../../components/update-candidacy-dialog/update-candidacy-dialog.component';
import { Candidacy as CandidacyModel } from '../../models/candidacy.model';
import { AddCandidacyDialogComponent } from '../../components/add-candidacy-dialog/add-candidacy-dialog.component';
import { Candidacy } from '../../models/candidacy.model';

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
  displayedColumns: string[] = [
    'company',
    'jobName',
    'interviewStatus',
    'jobDescriptionLink',
    'recruiterName',
    'stack',
    'dateEntretien',
    'roundNumber',
    'notes',
    'conclusion',
    'modifier',
    'supprimer'
  ];  dataSource = new MatTableDataSource<CandidacyModel>([]);

  constructor(
    private dialog: MatDialog,
    private candidacyService: CandidacyService
  ) {}

  ngOnInit() {
    this.loadCandidacy();
  }

  loadCandidacy() {
    this.candidacyService.getCandidacy().subscribe(
      (data: CandidacyModel[]) => {
        console.log("Données reçues :", data);

        this.dataSource.data = data.map(c => ({
          id: c.id || 0,
          company: c.company || '',
          jobName: c.jobName || '',
          interviewStatus: c.interviewStatus || '',
          jobDescriptionLink: c.jobDescriptionLink ?? '',
          recruiterName: c.recruiterName ?? '',
          stack: c.stack ?? '',
          dateEntretien: c.dateEntretien ?? '',
          roundNumber: c.roundNumber !== null && c.roundNumber !== undefined ? parseInt(c.roundNumber.toString(), 10) : 0
        }));

        console.log("Données transformées :", this.dataSource.data);
      },
      (error) => {
        console.error('Erreur lors du chargement des candidatures:', error);
      }
    );
}

updateCandidacy(candidacy: Candidacy): void {
  const dialogRef = this.dialog.open(UpdateCandidacyDialogComponent, {
    width: '500px',
    data: candidacy
  });

  dialogRef.afterClosed().subscribe((result: Candidacy) => {
    if (result) {
      this.candidacyService.updateCandidacy(result.id!, result)
        .subscribe(() => {
          this.loadCandidacy();
        });
    }
  });
}

  deleteCandidacy(candidature: CandidacyModel) {
    const confirmation = confirm(`Supprimer la candidature chez ${candidature.company} ?`);
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

  filterByStatus(statut: string) {
    this.dataSource.filterPredicate = (data: CandidacyModel, filter: string) => {
      return data.interviewStatus.toLowerCase().includes(filter);
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

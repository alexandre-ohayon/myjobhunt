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
    'jobTitle',          // Remplacement de 'jobName' par 'jobTitle'
    'interviewStatus',
    'jobDescriptionLink',
    'recruiterName',
    'techStack',         // Remplacement de 'stack' par 'techStack'
    'interviewDate',
    'notes',             // Ajout de notes
    'modifier',
    'supprimer'
  ];
  dataSource = new MatTableDataSource<CandidacyModel>([]);

  constructor(private dialog: MatDialog, private candidacyService: CandidacyService) {}

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
          jobTitle: c.jobTitle || '',
          interviewStatus: Array.isArray(c.interviewStatus)
            ? c.interviewStatus 
            : (c.interviewStatus ? [c.interviewStatus] : ['En attente d\'une réponse']),
          jobDescriptionLink: c.jobDescriptionLink ?? '',
          recruiterName: c.recruiterName ?? '',
          techStack: c.techStack ?? '',
          interviewDate: c.interviewDate ?? '',
          notes: c.notes ?? ''
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
    const filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      return data.interviewStatus.some(status =>
        status.toLowerCase().includes(filter)
      );
    };
    this.dataSource.filter = filter;
  }
  
  filterByStatus(statut: string) {
    this.dataSource.filterPredicate = (data: CandidacyModel, filter: string) => {
      return data.interviewStatus.some(status => status.toLowerCase().includes(filter));
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

  getJobDescriptionLink(link: string): string {
    if (!link) return '';
    return link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;
  }
}
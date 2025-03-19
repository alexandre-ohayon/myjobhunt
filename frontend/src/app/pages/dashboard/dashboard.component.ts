import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CandidatureService } from '../../services/candidature.service';
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
import { CandidatureDialogComponent } from '../../components/candidature-dialog.component';
import { Candidature as CandidatureModel } from '../../models/candidature.model'; // ✅ Renomme ici


interface Candidature {
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
    CandidatureDialogComponent,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule
  ]
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['entreprise', 'poste', 'statut', 'lien', 'recruteur', 'stack', 'dateEntretien', 'numeroEntretien', 'modifier', 'supprimer'];
  dataSource = new MatTableDataSource<CandidatureModel>([]);

  constructor(private candidatureService: CandidatureService, private dialog: MatDialog) {}

  ngOnInit() {
    this.chargerCandidatures();
  }

  chargerCandidatures() {
    this.candidatureService.getCandidatures().subscribe(
      (data: CandidatureModel[]) => {
        console.log("Données reçues :", data); // Vérifie le contenu des données récupérées

        this.dataSource.data = data.map(c => ({
          id: c.id || 0,
          entreprise: c.entreprise || '',
          poste: c.poste || '',
          statut: c.statut || '',
          lien: c.lien ?? '',
          recruteur: c.recruteur ?? '',
          stack: c.stack ?? '', // Vérifie si stack existe dans les données
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

modifierCandidature(candidature: Candidature) {
  const dialogRef = this.dialog.open(CandidatureDialogComponent, {
    width: '500px',
    data: { ...candidature } // ✅ Envoie les données actuelles à la modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log("Candidature modifiée :", result); // ✅ Vérifier dans la console
      this.candidatureService.modifierCandidature(candidature.id!, result).subscribe(() => {
        this.chargerCandidatures(); // ✅ Recharge les données après modification
      });
    }
  });
}


  // modifierCandidature(candidature: Candidature) {
  //   const updatedEntreprise = prompt("Modifier l'entreprise :", candidature.entreprise);
  //   const updatedPoste = prompt("Modifier le poste :", candidature.poste);
  //   const updatedStatut = prompt("Modifier le statut :", candidature.statut);
  //   const updatedLien = prompt("Modifier le lien :", candidature.lien || '');
  //   const updatedRecruteur = prompt("Modifier le recruteur :", candidature.recruteur || '');
  //   const updatedStack = prompt("Modifier la stack technique :", candidature.stack || '');
  //   const updatedDateEntretien = prompt("Modifier la date de l'entretien :", candidature.dateEntretien || '');
  //   const updatedNumeroEntretien = prompt("Modifier le numéro de l'entretien :", candidature.numeroEntretien?.toString() || '');

  //   if (updatedEntreprise !== null && updatedPoste !== null && updatedStatut !== null) {
  //     const updatedCandidature: Candidature = {
  //       ...candidature,
  //       entreprise: updatedEntreprise,
  //       poste: updatedPoste,
  //       statut: updatedStatut,
  //       lien: updatedLien || '',
  //       recruteur: updatedRecruteur || '',
  //       stack: updatedStack || '',
  //       dateEntretien: updatedDateEntretien || '',
  //       numeroEntretien: updatedNumeroEntretien ? parseInt(updatedNumeroEntretien, 10) : undefined
  //     };
  //     this.candidatureService.modifierCandidature(candidature.id!, updatedCandidature).subscribe(() => {
  //       this.chargerCandidatures();
  //     });
  //   }
  // }

  supprimerCandidature(candidature: CandidatureModel) {
    const confirmation = confirm(`Supprimer la candidature chez ${candidature.entreprise} ?`);
    if (confirmation) {
      this.candidatureService.supprimerCandidature(candidature.id!).subscribe(() => {
        this.chargerCandidatures();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  filtrerParStatut(statut: string) {
    this.dataSource.filterPredicate = (data: CandidatureModel, filter: string) => {
      return data.statut.toLowerCase().includes(filter);
    };
    this.dataSource.filter = statut ? statut.toLowerCase() : '';
  }

  ajouterCandidature() {
    const entreprise = prompt("Entreprise :")?.trim();
    const poste = prompt("Poste :")?.trim();
    const statut = prompt("Statut :")?.trim();
    const lien = prompt("Lien de la candidature :")?.trim();
    const recruteur = prompt("Nom du recruteur :")?.trim();
    const stack = prompt("Stack technique :")?.trim();
    const dateEntretien = prompt("Date de l'entretien (YYYY-MM-DD) :")?.trim();
    const numeroEntretienStr = prompt("Numéro de l'entretien :")?.trim();

    if (entreprise && poste && statut) {
        const nouvelleCandidature: CandidatureModel = {
            entreprise,
            poste,
            statut,
            lien: lien && lien !== '' ? lien : undefined,
            recruteur: recruteur && recruteur !== '' ? recruteur : undefined,
            stack: stack && stack !== '' ? stack : undefined,
            dateEntretien: dateEntretien && dateEntretien !== '' ? dateEntretien : undefined,
            numeroEntretien: numeroEntretienStr ? parseInt(numeroEntretienStr, 10) : undefined
        };

        this.candidatureService.ajouterCandidature(nouvelleCandidature).subscribe(() => {
            this.chargerCandidatures();
        }, error => {
            console.error("Erreur lors de l'ajout de la candidature :", error);
        });
    } else {
        alert("Entreprise, poste et statut sont obligatoires !");
    }
}

}

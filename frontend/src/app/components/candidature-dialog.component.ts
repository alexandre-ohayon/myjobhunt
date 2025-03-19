import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

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
  notes?: string; // ✅ Ajout du champ "notes"
  conclusion?: string; // ✅ Ajout du champ "conclusion"
}

@Component({
  selector: 'app-candidature-dialog',
  standalone: true,
  templateUrl: './candidature-dialog.component.html',
  styleUrls: ['./candidature-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ]
})
export class CandidatureDialogComponent {
  candidatureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CandidatureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidature
  ) {
    this.candidatureForm = this.fb.group({
      entreprise: [data.entreprise],
      poste: [data.poste],
      statut: [data.statut],
      lien: [data.lien],
      recruteur: [data.recruteur],
      stack: [data.stack],
      dateEntretien: [data.dateEntretien],
      numeroEntretien: [data.numeroEntretien],
      notes: [data.notes], // ✅ Correction pour éviter l'erreur TS2339
      conclusion: [data.conclusion] // ✅ Correction pour éviter l'erreur TS2339
    });
  }

  onSave(): void {
    if (this.candidatureForm.valid) {
      this.dialogRef.close(this.candidatureForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

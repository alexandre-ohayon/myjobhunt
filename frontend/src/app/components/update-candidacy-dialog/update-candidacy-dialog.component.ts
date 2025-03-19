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
  notes?: string;
  conclusion?: string;
}

@Component({
  selector: 'app-update-candidacy-dialog',
  standalone: true,
  templateUrl: './update-candidacy-dialog.component.html',
  styleUrls: ['./update-candidacy-dialog.component.css'],
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
export class CandidacyDialogComponent {
  candidacyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CandidacyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidacy
  ) {
    this.candidacyForm = this.fb.group({
      entreprise: [data.entreprise],
      poste: [data.poste],
      statut: [data.statut],
      lien: [data.lien],
      recruteur: [data.recruteur],
      stack: [data.stack],
      dateEntretien: [data.dateEntretien],
      numeroEntretien: [data.numeroEntretien],
      notes: [data.notes],
      conclusion: [data.conclusion]
    });
  }

  onSave(): void {
    if (this.candidacyForm.valid) {
      this.dialogRef.close(this.candidacyForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

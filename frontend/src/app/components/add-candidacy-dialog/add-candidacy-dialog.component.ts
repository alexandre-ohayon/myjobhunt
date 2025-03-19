import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-candidacy-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './add-candidacy-dialog.component.html'
})
export class AddCandidacyDialogComponent {
  candidacyForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddCandidacyDialogComponent>, private fb: FormBuilder) {
    this.candidacyForm = this.fb.group({
      entreprise: ['', Validators.required],
      poste: ['', Validators.required],
      statut: ['', Validators.required],
      lien: [''],
      recruteur: [''],
      stack: [''],
      dateEntretien: [''],
      numeroEntretien: [null]
    });
  }

  onSave() {
    if (this.candidacyForm.valid) {
      this.dialogRef.close(this.candidacyForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

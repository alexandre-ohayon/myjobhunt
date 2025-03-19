import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Candidacy } from '../../models/candidacy.model';

@Component({
  selector: 'app-update-candidacy-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './update-candidacy-dialog.component.html'
})
export class UpdateCandidacyDialogComponent implements OnInit {
  candidacyForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateCandidacyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidacy,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.candidacyForm = this.fb.group({
      company: [this.data.company, Validators.required],
      jobName: [this.data.jobName, Validators.required],
      interviewStatus: [this.data.interviewStatus, Validators.required],
      jobDescriptionLink: [this.data.jobDescriptionLink],
      recruiterName: [this.data.recruiterName],
      stack: [this.data.stack],
      dateEntretien: [this.data.dateEntretien],
      roundNumber: [this.data.roundNumber],
      notes: [this.data.notes],
      conclusion: [this.data.conclusion]
    });
  }

  onSave(): void {
    if (this.candidacyForm.valid) {
      const updatedCandidacy: Candidacy = {
        ...this.data,
        ...this.candidacyForm.value
      };
      this.dialogRef.close(updatedCandidacy);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

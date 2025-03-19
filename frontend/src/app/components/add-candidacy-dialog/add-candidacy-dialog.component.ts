import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Candidacy } from '../../models/candidacy.model';

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
export class AddCandidacyDialogComponent implements AfterViewInit {
  candidacyForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCandidacyDialogComponent>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.candidacyForm = this.fb.group({
      company: ['', Validators.required],
      jobName: ['', Validators.required],
      interviewStatus: ['', Validators.required],
      jobDescriptionLink: [''],
      recruiterName: [''],
      stack: [''],
      dateEntretien: [''],
      roundNumber: [null],
      notes: [''],
      conclusion: ['']
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidacyDialogComponent } from './add-candidacy-dialog.component';

describe('AjouterCandidatureDialogComponent', () => {
  let component: AddCandidacyDialogComponent;
  let fixture: ComponentFixture<AddCandidacyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCandidacyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCandidacyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

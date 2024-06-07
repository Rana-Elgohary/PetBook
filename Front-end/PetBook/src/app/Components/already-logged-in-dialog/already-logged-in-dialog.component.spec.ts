import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyLoggedInDialogComponent } from './already-logged-in-dialog.component';

describe('AlreadyLoggedInDialogComponent', () => {
  let component: AlreadyLoggedInDialogComponent;
  let fixture: ComponentFixture<AlreadyLoggedInDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlreadyLoggedInDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlreadyLoggedInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

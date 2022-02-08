import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationDetailComponent } from './association-detail.component';

describe('ProfileComponent', () => {
  let component: AssociationDetailComponent;
  let fixture: ComponentFixture<AssociationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

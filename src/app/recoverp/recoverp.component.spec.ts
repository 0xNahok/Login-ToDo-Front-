import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpComponent } from './recoverp.component';

describe('RecoverpComponent', () => {
  let component: RecoverpComponent;
  let fixture: ComponentFixture<RecoverpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

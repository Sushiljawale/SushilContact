import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViesContactComponent } from './vies-contact.component';

describe('ViesContactComponent', () => {
  let component: ViesContactComponent;
  let fixture: ComponentFixture<ViesContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViesContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViesContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

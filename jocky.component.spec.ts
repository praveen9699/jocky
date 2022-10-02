import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JockyComponent } from './jocky.component';

describe('JockyComponent', () => {
  let component: JockyComponent;
  let fixture: ComponentFixture<JockyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JockyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JockyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

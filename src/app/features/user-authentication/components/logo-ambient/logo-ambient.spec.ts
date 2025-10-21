import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAmbient } from './logo-ambient';

describe('LogoAmbient', () => {
  let component: LogoAmbient;
  let fixture: ComponentFixture<LogoAmbient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoAmbient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoAmbient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

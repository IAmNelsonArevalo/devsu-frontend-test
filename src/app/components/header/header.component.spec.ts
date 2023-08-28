import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("Should render the logo image.", () => {
      const compiled = fixture.nativeElement;
      const logoElement = compiled.querySelector("img");

      expect(logoElement).toBeTruthy();
      expect(logoElement.src).toContain("https://www.bancopichincha.com.co/o/pichincha-theme/images/logo.png");
      expect(logoElement.alt).toBe("Logo");
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentBottomComponent } from './home-content-bottom.component';

describe('HomeContentBottomComponent', () => {
  let component: HomeContentBottomComponent;
  let fixture: ComponentFixture<HomeContentBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeContentBottomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeContentBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

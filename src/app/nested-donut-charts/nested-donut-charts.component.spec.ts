import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedDonutChartsComponent } from './nested-donut-charts.component';

describe('NestedDonutChartsComponent', () => {
  let component: NestedDonutChartsComponent;
  let fixture: ComponentFixture<NestedDonutChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestedDonutChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedDonutChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

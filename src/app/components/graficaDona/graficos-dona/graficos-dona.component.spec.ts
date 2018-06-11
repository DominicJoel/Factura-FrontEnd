import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosDonaComponent } from './graficos-dona.component';

describe('GraficosDonaComponent', () => {
  let component: GraficosDonaComponent;
  let fixture: ComponentFixture<GraficosDonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficosDonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosDonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOfferComponent } from './browse-offer.component';

describe('BrowseOfferComponent', () => {
  let component: BrowseOfferComponent;
  let fixture: ComponentFixture<BrowseOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleclientComponent } from './articleclient.component';

describe('ArticleclientComponent', () => {
  let component: ArticleclientComponent;
  let fixture: ComponentFixture<ArticleclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFixedListComponent } from './post-fixed-list.component';

describe('PostFixedListComponent', () => {
  let component: PostFixedListComponent;
  let fixture: ComponentFixture<PostFixedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFixedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFixedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

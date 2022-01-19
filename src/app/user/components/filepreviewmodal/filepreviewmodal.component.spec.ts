import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepreviewmodalComponent } from './filepreviewmodal.component';

describe('FilepreviewmodalComponent', () => {
  let component: FilepreviewmodalComponent;
  let fixture: ComponentFixture<FilepreviewmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilepreviewmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilepreviewmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

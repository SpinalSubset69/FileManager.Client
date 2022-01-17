import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldermodalComponent } from './foldermodal.component';

describe('FoldermodalComponent', () => {
  let component: FoldermodalComponent;
  let fixture: ComponentFixture<FoldermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoldermodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

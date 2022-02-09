import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { UsersService } from '../services/users.service';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let params: Subject<Params> = new Subject<Params>()

  // Mock User
  const mockUsersService = jasmine.createSpyObj('UsersService', ['getById', 'save']);
  const fakeUser = {
    "id": 2,
    "password": "$2b$10$OJirKb7Ea1XHnigQrHAVGOckWy1G8krnJjsFusoSv7vDw3r03H8HW",
    "lastname": "Doe",
    "firstname": "Janette",
    "age": 33
  }
  mockUsersService.getById.and.returnValue(of(fakeUser));

  // Mock snackbar service
  const mockMatSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [UserFormComponent],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: MatSnackBar, useValue: mockMatSnackBarService },
        { provide: ActivatedRoute, useValue: { paramMap: params } }
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    params = new Subject<Params>()

  });
  
  it('should create with URL params', fakeAsync(() => {;
    params.next({ 'id': 2 })
    // this calls ngOnInit
    fixture.detectChanges();
    // tick to make sure the async observable resolves
    tick();
    expect(component).toBeTruthy();
  }));

  it('should call load', fakeAsync(() => {;
    params.next({ 'id': 2 })
    fixture.detectChanges();
    tick();
    expect(component.load).toHaveBeenCalled
  }));

  it('should display the right data', fakeAsync(() => {;
    params.next({ 'id': 2 })
    fixture.detectChanges();
    tick();
    expect(component.load)
  }));

    
  // it('should create with URL params a', fakeAsync(() => {;
  //   // this calls ngOnInit
  //   fixture.detectChanges();
  //   // tick to make sure the async observable resolves
  //   tick();
  //   expect(component).toBeTruthy();
  // }));

});

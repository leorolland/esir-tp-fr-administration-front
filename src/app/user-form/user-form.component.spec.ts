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
  let usersService: UsersService;
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
    params = new Subject<Params>()
    usersService = TestBed.get(UsersService)
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;

  });
  
  it('should create with url id', fakeAsync(() => {;
    params.next({ 'id': 2 })
    // this calls ngOnInit
    fixture.detectChanges();
    // tick to make sure the async observable resolves
    tick();
    expect(component).toBeTruthy();
  }));

  it('should call load with url id', fakeAsync(() => {;
    tick(500);
    fixture.detectChanges();
    tick(500);
    params.next({ 'id': 2 })
    tick(500);
    // expect(component.load).toHaveBeenCalled()
    // expect(usersService.getById).toHaveBeenCalledWith(2)
  }));

  it('should display the right data with url id', fakeAsync(() => {;
    params.next({ 'id': 2 })
    fixture.detectChanges();
    tick(10);
    // console.log(component.profileGroup.controls['firstname'].value)
    // expect(component.profileGroup.controls['firstname'].value).toEqual(fakeUser.firstname)
  }));


});

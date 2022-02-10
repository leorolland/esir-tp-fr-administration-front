import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { AssociationsService } from '../services/associations.service';
import { UsersService } from '../services/users.service';
import { Association } from '../types/Association';
import { MemberAssociation } from '../types/MemberAssociation';
import { User } from '../types/User';

@Component({
  selector: 'app-association-form',
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.scss']
})
export class AssociationFormComponent implements AfterViewInit { //OnInit {

  // association: Observable<Association> | undefined
  // users: User[]| undefined
  // members: MemberAssociation[] | undefined

  // @Input() stayOnPage: boolean | undefined;

  // constructor(private associationsService: AssociationsService, private usersService: UsersService, private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe( res => {
  //     const name = res.get('name') || ''
  //     this.association = this.associationsService.getByName(name)
  //   })
  //   this.usersService.getUsers().subscribe(u => this.users = u)
  //   this.association?.subscribe(m => {
  //     this.members = m.members
  //   })
  // }
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent | undefined;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];

  ngAfterViewInit() {
    let previousValid = this.form?.valid;
    this.form?.changes.subscribe(() => {
      if (this.form?.valid !== previousValid) {
        previousValid = this.form?.valid;
        this.form?.setDisabled('submit', !previousValid);
      }
    });

    this.form?.setDisabled('submit', true);
    this.form?.setValue('name', 'Todd Motto');
  }

  submit(value: {[name: string]: any}) {
    console.log(value);
  }
}
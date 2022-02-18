import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MemberAssociation } from 'src/app/types/MemberAssociation';

@Component({
  selector: 'app-form-member',
  templateUrl: './dynamic-form-member-component.component.html',
  styleUrls: ['./dynamic-form-member-component.component.scss']
})
export class DynamicFormMemberComponentComponent {

  @Input() member!: MemberAssociation;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.member.firstname + this.member.lastname].valid; }

}

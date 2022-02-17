import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MemberAssociation } from "src/app/types/MemberAssociation";

@Injectable({
  providedIn: 'root'
})
export class MembersControlService {
  constructor() { }

  toFormGroup(members: MemberAssociation[]) {
    const group: any = {};

    members.forEach(member => {
      const key = member.firstname + member.lastname
      group[key] = new FormControl(member.role || '', Validators.required)
    });
    return new FormGroup(group);
  }
}
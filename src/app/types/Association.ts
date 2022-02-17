import { MemberAssociation } from "src/app/types/MemberAssociation"

export class Association {

  name: string
  dateOfCreation: string
  members: MemberAssociation[]

  constructor(options: {
    name: string,
    dateOfCreation: string
    members: MemberAssociation[]
  }) {
    this.name = options.name
    this.dateOfCreation = options.dateOfCreation
    this.members = options.members
  }

}
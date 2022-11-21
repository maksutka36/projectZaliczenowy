import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../users.model';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss']
})
export class MechanicsComponent implements OnInit {

  mechanics: Array<User> = []
  addMechanics: Array<User> = []

  constructor(
    private readonly dialogRef: MatDialogRef<MechanicsComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: {allMechanics: Array<User> , addedMechanics: Array<User>}
  ) { }

  ngOnInit(): void {
    this.addMechanics = this.data.addedMechanics;
    this.mechanics = this.data.allMechanics;
  }

  addMechanic(mechanic: User){
    const allMechanics = this.mechanics.filter(mechanics => mechanics.username != mechanic.username)
    this.mechanics = allMechanics
    this.addMechanics.push(mechanic)
  }

  removeMechanic(mechanic: User){
    const removedMechanics = this.addMechanics.filter(mechanics => mechanics.username != mechanic.username)
    this.addMechanics = removedMechanics
    this.mechanics.push(mechanic)
  }

}

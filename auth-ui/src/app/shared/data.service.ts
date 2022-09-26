import { Injectable } from '@angular/core';
import { Users } from '../model/users';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  addUser(user : Users) {
    user.id = this.afs.createId();
    return this.afs.collection('/Users').add(user);
  }

  getAllUsers() {
    return this.afs.collection('/Users').snapshotChanges();
  }

  deleteUser(user : Users) {
    return this.afs.doc('/Users/'+user.id).delete();
  }

  updateUser(user : Users) {
    this.deleteUser(user);
    this.addUser(user);

  }


}

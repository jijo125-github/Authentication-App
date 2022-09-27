import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Users } from 'src/app/model/users';
import { DataService } from 'src/app/shared/data.service';
import { Route, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  usersList: Users[] = [];
  userObj: Users = {
    id: '',
    fname: '',
    lname: '',
    email: '',
    dob: '',
    mob: '',
    // bio: '',
  };
  id: string = '';
  fname: string = '';
  lname: string = '';
  email: string = '';
  dob: string = '';
  mob: string = '';
  bio: string = '';

  constructor(
    private auth: AuthService,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.data.getAllUsers().subscribe(
      (res) => {
        this.usersList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error');
      }
    );
  }

  addUser() {
    if (
      this.fname == '' ||
      this.lname == '' ||
      this.email == '' ||
      this.dob == '' ||
      this.mob == ''
    ) {
      alert('Required to fill');
      return;
    }

    this.userObj.id = '';
    this.userObj.email = this.email;
    this.userObj.fname = this.fname;
    this.userObj.lname = this.lname;
    this.userObj.dob = this.dob;
    this.userObj.mob = this.mob;
    // this.userObj.bio = this.bio;

    this.data.addUser(this.userObj);
    this.resetForm();
  }

  deleteUser(user: Users) {
    if (window.confirm('Delete ?? ' + user.fname + ' record ?')) {
      this.data.deleteUser(user);
    }
  }

  editUser() {
    this.router.navigate(['/edit']);
  }

  uProfile() {
    this.router.navigate(['/upload']);
  }

  userP() {
    this.router.navigate(['/profile']);
  }

  signout() {
    this.auth.logout();
  }

  resetForm() {
    this.id = '';
    this.fname = '';
    this.lname = '';
    this.email = '';
    this.dob = '';
    this.mob = '';
    this.bio = '';
  }
}

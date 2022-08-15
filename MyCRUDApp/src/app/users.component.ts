import { Component } from "@angular/core";
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from "@angular/fire/compat/firestore";

interface User{
    name:string;
    email:string;
}

@Component({   
    selector: 'users',
    templateUrl: './users.component.html',
  })
  export class UsersComponent {
    usersCol:AngularFirestoreCollection<User> | undefined;
    users:any;
    constructor(private afs:AngularFirestore) {
        console.log(afs);
    }

    ngOnInit(){
        this.usersCol = this.afs.collection('users');
        this.users = this.usersCol.valueChanges();
    }
    
  }
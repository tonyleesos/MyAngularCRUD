import { UnaryOperator } from "@angular/compiler";
import { Component } from "@angular/core";
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

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
  constructor(private afs:AngularFirestore, private _router:Router) {
      console.log(afs);
  }

  ngOnInit(){
      this.usersCol = this.afs.collection('users');
      //this.users = this.usersCol.valueChanges();
      //抓取ID數據
      this.users = this.usersCol.snapshotChanges().pipe(
        map((actions: { payload: { doc: { data: () => User; id: any; }; }; }[])=>{
          return actions.map((a: { payload: { doc: { data: () => User; id: any; }; }; })=>{
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return {id, data};
          })
        })
      )

  }

  add(){
    this._router.navigate(['add']);
  }

  delete(id: string, name: string){
    if(confirm("你確定要刪除"+name+"嗎?")){
      this.afs.doc('users/'+id).delete();
    }
  }

}

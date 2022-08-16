import { Component } from "@angular/core";
import { FormBuilder,FormGroup,Validator, Validators } from "@angular/forms";
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { User } from "./user";
import { Observable } from "rxjs";

@Component({
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
})

export class UserFormComponent {
  form: FormGroup;
  user = new User();
  title!: string;
  id: any;

  userDoc:AngularFirestoreDocument<User> | undefined;
  singleUser:Observable<any> | undefined;

  constructor(fb:FormBuilder, private _router:Router, private afs:AngularFirestore,private _route:ActivatedRoute){
    this.form = fb.group({
      name:['',Validators.required],
      email:['',Validators.required]
    })
  }

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._route.params.subscribe(params => {
      this.id = params["id"];
    })

    if(!this.id){
      this.title = "New User";
    }
    else{
      // 帶入DB資料到html
      this.title = "Edit User";
      this.userDoc = this.afs.doc('users/'+this.id);
      this.singleUser = this.userDoc.valueChanges();
      this.singleUser?.subscribe(user=>{
        this.form.get('name')?.setValue(user.name);
        this.form.get('email')?.setValue(user.email);
      })
    }
  }

  // 送出後
  submit(){
    if(this.id){
      // 編輯
      this.afs.doc('users/'+this.id).update({
        name:this.user.name,
        email:this.user.email
      });
    }
    else{
      // 新增
      this.afs.collection('users').add({
        name:this.user.name,
        email:this.user.email
      })
    }


    this._router.navigate(['']);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';

// Init firebase Data
const firebaseConfig = {
  apiKey: "AIzaSyA96OF-DDvARZAiXkahLjah_fZclga--A8",
  authDomain: "mycrudapp-e3e80.firebaseapp.com",
  projectId: "mycrudapp-e3e80",
  storageBucket: "mycrudapp-e3e80.appspot.com",
  messagingSenderId: "81611399762",
  appId: "1:81611399762:web:b566aac74bcd3937cb758b",
  measurementId: "G-WV8G5P1HYC"
};

@NgModule({
  declarations: [
    AppComponent,UsersComponent,UserFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,AngularFireAuthModule,AngularFireStorageModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

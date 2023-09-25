import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly  dbUrl: string = '';
  USER_KEY: string = "User";
  user!: User;
  private user$ = new BehaviorSubject<User>(this.getUserFromLocaleStorage());
  public userObservable: Observable<User>;

  constructor( private httpClient: HttpClient, private db: AngularFireDatabase, private auth: AngularFireAuth, private fireStore: AngularFirestore ) { 
    this.userObservable = this.user$.asObservable();
   }

   getUsers(): Observable<User[]> {
    return this.db.list<User>('users/clients').valueChanges()
   }

   userLogin(email: string, password: string): Promise<void> {
    return this.auth.signInWithEmailAndPassword(email, password)
    .then((result: any) => {
      this.user = result.user;
      this.setUserToLocaleStorage(this.user)
      this.user$.next(this.user)
    })
   }

   userSignUp(email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      fullName: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


   private setUserToLocaleStorage(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

    private getUserFromLocaleStorage(): User {
    const jsonUser = localStorage.getItem(this.USER_KEY)
    if(jsonUser) return JSON.parse(jsonUser) as User;
    return this.user
  }
}

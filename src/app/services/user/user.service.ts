import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_KEY: string = "User";
  user!: User;
  private user$ = new BehaviorSubject<User>(this.getUserFromLocaleStorage());
  public userObservable: Observable<User>;

  constructor( private router: Router, private db: AngularFireDatabase, private auth: AngularFireAuth, private firestore: AngularFirestore, private toastrService: ToastrService) { 
    this.userObservable = this.user$.asObservable();
   }

   userLogin(email: string, password: string): Promise<void> {
    return this.auth.signInWithEmailAndPassword(email, password)
    .then((result: any) => {
      const uid: string = result.user.uid;
      this.getUser(uid).subscribe((userInfo) => {
        this.user = userInfo;
        this.setUserToLocaleStorage(this.user)
        this.user$.next(this.user)
        console.log(this.user)
        this.router.navigateByUrl('/')
      })
    })
    .catch(errorRespone => {
      this.toastrService.error(errorRespone, 'Login Faild' )
    })
   }

   async userSignUp(userInfo: User, password: string): Promise<void> {
    return this.auth
      .createUserWithEmailAndPassword(userInfo.email, password)
      .then((result) => {

        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        
        // this.SendVerificationMail();
        this.setUserData(userInfo, result.user.uid);
        this.getUser(result.user.uid).subscribe((userInfo) => {
          this.user = userInfo;
          this.setUserToLocaleStorage(this.user)
          this.user$.next(this.user)
          console.log(this.user)
          this.router.navigateByUrl('/')
        })
      })
      .catch((errorRespone) => {
        this.toastrService.error(errorRespone, 'Login Faild' )
      });
  }

  setUserData(user: User, uid: any) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${uid}`
    );
    const userData: User = {
      uid: uid,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  getUser(uid: string): Observable<User> {
    return this.firestore.doc<User>(`users/${uid}`).valueChanges() ;
  }


  onLogout(): Promise<void> {
    return this.auth.signOut()
    .then(() => {
      localStorage.removeItem(this.USER_KEY);
      this.router.navigateByUrl('/login')
    })
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

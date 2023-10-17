import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/User';
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
    .catch((error) => {
      const errorMessage = this.handleFirebaseError(error);
      this.toastrService.error(errorMessage, 'Login Faild');
      console.log(error.code)
    });
   }

   async userSignUp(userInfo: User, password: string): Promise<void> {
    return this.auth
      .createUserWithEmailAndPassword(userInfo.email, password)
      .then((result) => {
        
        // this.sendVerificationMail();
        this.setUserData(userInfo, result.user.uid);
        // result.user.sendEmailVerification();
        // this.listenToEmailVerification();

        this.getUser(result.user.uid).subscribe((userInfo) => {
          this.user = userInfo;
          this.setUserToLocaleStorage(this.user)
          this.user$.next(this.user)
          this.router.navigateByUrl('/')
        })
      })
      .catch((error) => {
        const errorMessage = this.handleFirebaseError(error);
        this.toastrService.error(errorMessage, 'Register Faild');
        console.log(error.code)
      });
  }

  updateUserData(user: any, uid: string): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${uid}`
    );

    return userRef.update(user)
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
      age: user.age,
      address: user.address,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  getUser(uid: string): Observable<User> {
    return this.firestore.doc<User>(`users/${uid}`).valueChanges() ;
  }

    // // Send email verfificaiton when new user sign up
    // sendVerificationMail() {
    //   return this.auth.currentUser
    //     .then((u: any) => u.sendEmailVerification())
    //     .then(() => {
    //       this.router.navigate(['verify-email-address']);
    //     });
    // }

    //     // Listen to changes in the user's authentication state
    // listenToEmailVerification() {
    //   this.auth.onAuthStateChanged((user) => {
    //     if (user) {
    //       user.getIdTokenResult().then((idTokenResult) => {
    //         if (idTokenResult && idTokenResult.claims.email_verified) {
    //           // If email is verified, update Firestore document
    //           this.updateEmailVerificationStatus(user.uid, true);
    //         }
    //       });
    //     }
    //   });
    // }

    // // Update email verification status in Firestore
    // updateEmailVerificationStatus(userId: string, isVerified: boolean) {
    //   this.firestore.collection('users').doc(userId).update({ emailVerified: isVerified })
    //     .then(() => {
    //       console.log('Email verification status updated in Firestore');
    //     })
    //     .catch((error) => {
    //       console.error('Error updating email verification status:', error);
    //     });
    // }


    ForgotPassword(passwordResetEmail: string) {
      return this.auth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email sent, check your inbox.');
        })
        .catch((error) => {
          window.alert(error);
        });
    }


  onLogout(): Promise<void> {
    return this.auth.signOut()
    .then(() => {
      localStorage.removeItem(this.USER_KEY);
      window.location.reload()
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

  private handleFirebaseError(error: any): string {
    // Implement your Firebase Authentication error handling logic here
    let errorMessage = 'An error occurred during login';
    // You can check error codes or messages to provide specific error messages
    switch(error.code) {
      case'auth/user-not-found':
      errorMessage = 'User not found'
      break;
      
      case 'auth/invalid-login-credentials' : 
      errorMessage = 'Invalid login credentials'
      break;
    
      case 'auth/email-already-in-use' : 
      errorMessage = 'Email already in use'
      break;
    } 
    return errorMessage;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly  dbUrl: string = '';
  USER_KEY: string = "User";
  user!: User;
  private user$ = new BehaviorSubject<User>(this.getUserFromLocaleStorage());
  public userObservable: Observable<User>;

  constructor( private httpClient: HttpClient, private db: AngularFireDatabase, private auth: AngularFireAuth ) { 
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



   private setUserToLocaleStorage(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

    private getUserFromLocaleStorage(): User {
    const jsonUser = localStorage.getItem(this.USER_KEY)
    if(jsonUser) return JSON.parse(jsonUser) as User;
    return this.user
  }
}

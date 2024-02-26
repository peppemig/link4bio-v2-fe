import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly googleProvider = new GoogleAuthProvider();

  constructor(private http: HttpClient, private auth: Auth) {}

  get userState$() {
    return authState(this.auth);
  }

  async registerWithEmailPassword(
    email: string,
    password: string,
    name: string,
    surname: string
  ) {
    let endpoint = environment.services.auth.collection.register;
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const token = await user.getIdToken();
    await firstValueFrom(
      this.http.post(
        endpoint,
        {
          id: user.uid,
          email: user.email,
          displayName: `${name} ${surname}`,
        },
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
    );
  }

  async signInWithEmailPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.log('Email/password login error: ', error);
    }
  }

  async signInWithGoogle(): Promise<void> {
    let registerEndpoint = environment.services.auth.collection.register;
    let existsEndpoint = environment.services.auth.collection.userExists;
    try {
      const { user } = await signInWithPopup(this.auth, this.googleProvider);
      const token = await user.getIdToken();
      const userExists = await firstValueFrom(
        this.http.get(existsEndpoint, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        })
      );
      if (!userExists) {
        await firstValueFrom(
          this.http.post(
            registerEndpoint,
            {
              id: user.uid,
              email: user.email,
              displayName: user.displayName,
            },
            {
              headers: new HttpHeaders({
                Authorization: `Bearer ${token}`,
              }),
            }
          )
        );
      }
    } catch (error) {
      console.log('Google sign in error: ', error);
    }
  }

  async logOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.log('Logout error: ', error);
    }
  }
}

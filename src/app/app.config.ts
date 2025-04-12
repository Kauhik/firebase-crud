import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyBs_Qiekyaa7sWvAbT6QdMYTYJEb0CXXOg",
  authDomain: "simple-crm-a47bc.firebaseapp.com",
  projectId: "simple-crm-a47bc",
  storageBucket: "simple-crm-a47bc.firebasestorage.app",
  messagingSenderId: "916117147885",
  appId: "1:916117147885:web:eba4b5ecba7aba43b47ce4",
  measurementId: "G-912LRDRGGG"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()) 
  ]
};

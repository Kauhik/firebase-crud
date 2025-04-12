#  Simple CRM - Built with Angular + Firebase

A clean, modern, full-featured CRM (Customer Relationship Management) web app with:
- Contact & Deal management
- Drag-and-drop Kanban pipeline
- Real-time analytics dashboard
- Firebase Auth & Firestore integration
- Admin seeding support

> Developed by Kaushik Manian for RVI

---


## Tech Stack

###  Frontend
- **Angular 19** (standalone components)
- **Angular Router**
- **Angular CDK** (drag-and-drop)
- **NgCharts / Chart.js** (dashboard)
- **SCSS** (modular styles)
- **RxJS** (reactivity)
- **FormsModule** (template forms)

###  Backend (BaaS)
- **Firebase Firestore** — deal & contact storage (per user)
- **Firebase Auth** — Email/password + Google login
- **Firebase Hosting** — Fully deployed SPA
- **Firestore Security Rules** — per-user isolation
- **Firebase Admin SDK** — seeding dummy data

---

##  Features

-  Auth (email, password & Google)
-  Contact CRUD (scoped to user)
-  Deal Pipeline with drag-and-drop stages
-  Analytics dashboard with metrics & charts
-  Date range filters (1m, 3m, 6m, 1y)
-  Responsive UI with beautiful layout



# FirebaseCrud

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


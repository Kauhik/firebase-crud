import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email = ""
  password = ""
  errorMessage = ""

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.auth.user$.subscribe((user) => {
      if (user && this.router.url === "/login") {
        this.router.navigate(["/pipeline"])
      }
    })
  }

  onSubmit() {
    this.errorMessage = ""

    if (!this.email || !this.password) {
      this.errorMessage = "Please enter both email and password"
      return
    }

    this.auth
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(["/pipeline"])
      })
      .catch((err) => {
        console.error("Login error:", err.message)
        this.errorMessage = err.message || "Failed to sign in. Please try again."
      })
  }

  loginWithGoogle() {
    this.errorMessage = ""

    this.auth
      .loginWithGoogle()
      .then(() => {
        this.router.navigate(["/pipeline"])
      })
      .catch((err) => {
        console.error("Google Login error:", err.message)
        this.errorMessage = err.message || "Failed to sign in with Google. Please try again."
      })
  }
}

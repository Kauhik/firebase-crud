import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  email = ""
  password = ""
  errorMessage = ""

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.auth.user$.subscribe((user) => {
      if (user && this.router.url === "/register") {
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

    if (this.password.length < 6) {
      this.errorMessage = "Password must be at least 6 characters"
      return
    }

    this.auth
      .register(this.email, this.password)
      .then(() => {
        this.router.navigate(["/pipeline"])
      })
      .catch((err) => {
        console.error("Registration error:", err.message)
        this.errorMessage = err.message || "Failed to create account. Please try again."
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
        this.errorMessage = err.message || "Failed to sign up with Google. Please try again."
      })
  }
}

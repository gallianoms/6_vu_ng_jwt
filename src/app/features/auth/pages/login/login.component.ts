import { AuthService } from './../../../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    role: new FormControl('admin', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  handleSubmit() {
    const { role, password } = this.loginForm.value;
    if (role && password && this.loginForm.valid) {
      this.authService.login(role, password).subscribe(isValid => {
        if (isValid) this.router.navigate(['/dashboard']);
        else alert('Invalid credentials');
      });
    }
  }

  get role() {
    return this.loginForm.get('role');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

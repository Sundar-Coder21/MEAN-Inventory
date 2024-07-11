import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../shared/service/localstoreage.service';
import { UtilityService } from '../../shared/service/utility-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TitleCasePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private store: LocalStorageService,
    private Utility: UtilityService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]
      ],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res, "res");
        this.Utility.success(res.message);
        this.store.setToken(res.token);
        this.store.setUser(res.role);
        this.router.navigateByUrl('/admin');
      })

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}

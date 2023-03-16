import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    public credentials: FormGroup) { }

    get email() {
      return this.credentials.get('email');
    }

    get password () {
      return this.credentials.get('password');
    }

  ngOnInit() {
    this.credentials = this.formbuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
    })
  }

  async register() {
  const loading = await this.loadingController.create()
  await loading.present();

  const user = await this.authService.register(this.credentials.value);
  await loading.dismiss();

  if (user) {
    this.router.navigateByUrl('/home', { replaceUrl: true});
  }else {
    this.showAlert('Registration Failed', 'Please Try Again!');
  }
  }

  async login () {
    const loading = await this.loadingController.create()
  await loading.present();

  const user = await this.authService.login(this.credentials.value);
  await loading.dismiss();

  if (user) {
    this.router.navigateByUrl('/home', { replaceUrl: true});
  }else {
    this.showAlert('Login Failed', 'Please Try Again!');
  }
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}

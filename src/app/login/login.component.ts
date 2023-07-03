import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthserviceService, private router: Router) { }

  userdata: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  get f() {
    return this.loginform.controls
  }

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetByUser(this.loginform.value.username).subscribe(result => {
        this.userdata =result;
        console.log(this.userdata);
        if(this.userdata.password===this.loginform.value.password){
          if(this.userdata.isactive){
              sessionStorage.setItem('username',this.userdata.id);
              sessionStorage.setItem('userrole',this.userdata.role);
              this.router.navigate(['home']);
          }else{
            this.toastr.info('Please contact Admin' , 'In active user');
          }
        }else{
          this.toastr.error('Invalid credentials');
        }
      }
      );
    }else{
      this.toastr.warning('Enter username and password');
      // this.toastr.info('Enter username and password');
    } 
  }
  
}

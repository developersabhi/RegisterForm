import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  // signupform!:

  constructor(private builder:FormBuilder, private toastr: ToastrService , private service:AuthserviceService, private router:Router){}

  signupform = this.builder.group({
    // id: this.builder.control(''),
    username: this.builder.control('',Validators.compose([Validators.required, Validators.minLength(4)])),
    fname: this.builder.control('',Validators.required),
    lname: this.builder.control('',Validators.required),
    email: this.builder.control('',Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    cpasword: this.builder.control('',Validators.required),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false),

  },
  {
    validators:this.Mustmatch('password','cpasword')
  }
  );

  get f(){
    return this.signupform.controls
  }


  Mustmatch(password:any,cpasword:any){
    return (formGroup:FormGroup)=>{
      const passwordcontrol=formGroup.controls[password];
      const cpaswordcontrol=formGroup.controls[cpasword];

      if(cpaswordcontrol.errors && !cpaswordcontrol.errors['Mustmatch']){
        return;
      }

      if(passwordcontrol.value!==cpaswordcontrol.value){
        cpaswordcontrol.setErrors({ Mustmatch:true });
      }else{
        cpaswordcontrol.setErrors(null);

      }
    };
  }

  // proceedSignup(){
  //   if(this.signupform.valid) {
  //     this.service.SignUpUser(this.signupform.value).subscribe(res=>{
  //       this.toastr.success('plz wait for 24hour','Registered successfully')
  //       this.router.navigate(['login'])
  //       alert('done')
  //     });

  //   }else{
  //     this.toastr.warning('plz enter valid data')
  //   }
  // }

  proceedSignup(){
    if(this.signupform.valid) {
      this.service.SignUpUser(this.signupform.value).subscribe(res=>{
        this.toastr.success('Regiser Successfully')
      });

    }else{
      this.toastr.warning('plz enter valid data') //work
    }
  }

}

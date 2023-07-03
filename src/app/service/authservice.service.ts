import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { }

  // apiurl ="http://localhost:9090/save";
  // apiurl1 ="http://localhost:9090/all";
  apiurl='http://localhost:3000/user';
  
  SignUpUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }

  GetByUser(code:any){
    return this.http.get(this.apiurl+'/'+code);
  }
}


import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisteredUser } from '../registered-user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit { 

 
  public registerUser: RegisteredUser;

  public warning;
  public success = false;
  public loading = false;
  public password2;
  


  institutions = [
    {id: 1, name: "Seneca College"},
    {id: 2, name: "George Brown College"},
    {id: 3, name: "University of Toronto"},
    {id: 4, name: "Ryerson University"}
  ];
  selectedValue = null;
  




  constructor(private auth:AuthService) { }  
  

  ngOnInit(): void {
    this.registerUser = {
      email: "",
      password: "",
      user_id: "",
      role_id: "2",
      profile_id: "",
      institution_id: "1"
      
    }
  }

  onSubmit(f: NgForm): void{
    
    if(this.registerUser.email != "" && this.registerUser.password == this.password2){
      this.loading = true;
          this.success = true;
          this.warning = null;
          this.loading = false;
      
          console.log(this.registerUser);   

    }
    else{
      this.success = false;
      this.warning = "Please Check your password";
      this.loading = false
    }
  }

}

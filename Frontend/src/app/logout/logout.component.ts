import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  authsect: any;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.authsect = localStorage.getItem("AuthUser");
    if (this.authsect == "employer") {
      console.log("Employerlogout")
      localStorage.removeItem('AuthUser');
      localStorage.removeItem('EmpComp');
      localStorage.removeItem('EmpId');
      localStorage.removeItem('JobId');
      this.router.navigate(['employer'])

    }

    else if (this.authsect == "student") {
      localStorage.removeItem('AuthUser');
      localStorage.removeItem('Token');
      localStorage.removeItem('Job');
      localStorage.removeItem('Stud-id');
      this.router.navigate(['student'])

    }


  }

}

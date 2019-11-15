import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../services/profile-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  response: any;
  durationInSeconds = 5;
  showSpinner = false;
  errorMssg = false; // For checking user exist or not

  constructor(private service: ProfileServiceService, private snackBar: MatSnackBar) {
  }
  search() {
    if (!this.profile) {
      this.snackBar.open('Provide Data', ' close ', {
        duration: 2000,
        verticalPosition: 'top'
      });
      return;
    }
    const localData = localStorage.getItem(this.profile);
    if (localData) {
      this.response = JSON.parse(localData);
      this.errorMssg = false;
    } else {
      this.showSpinner = true;
      this.service.getProfileInfo(this.profile).subscribe(data => {
        this.response = data;
        localStorage.setItem(this.profile, JSON.stringify(this.response));
        this.showSpinner = false;
        this.errorMssg = false;
      },
        err => {
          this.showSpinner = false;
          this.errorMssg = true; // No user found
          this.response = false;
          this.snackBar.open(err.error.message, ' close ', {
            duration: 2000,
            verticalPosition: 'top'
          });
        });
    }
  }
  ngOnInit() {
  }

}

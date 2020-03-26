import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  alertText;

  ngOnInit() {
    console.log(new Date())
    this.alertText = 'DAY ' + (Math.floor(this.getDaysIntoLockdown()) + 1) + ' OF 21 DAYS LOCKDOWN IN INDIA'
  }

  getDaysIntoLockdown() {
    let date1 = new Date("03/25/2020");
    let date2 = new Date();
    let diff = date2.getTime() - date1.getTime();
    return diff / (1000 * 3600 * 24);
  }
}

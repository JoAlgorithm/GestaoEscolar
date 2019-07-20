import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  values = '';

  onKey(event: any) { // without type info
    this.values = event.target.value ;
  }
}

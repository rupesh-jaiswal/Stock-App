import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subscription } from 'rxjs/Subscription';
import { Stock } from './stock';
import _ from 'underscore';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  stocks = [];
  sub: Subscription;
  constructor(private websocket: WebsocketService) {
  }

  ngOnInit() {
    this.sub=this.websocket.getStocks().subscribe(res => {
        let data = JSON.parse(res.data);
        for(let stock of data) {
          let i=0;
          for(i=0;i<this.stocks.length;i++) {

            if(this.stocks[i][0]==stock[0]) {
              this.stocks[i][2]=new Date();
              this.stocks[i][3]=this.stocks[i][1]>stock[1]?'bg-success':'bg-danger';
              this.stocks[i][1]=stock[1];
              break;
            }
          }
          if(i==this.stocks.length) {

              stock=stock.concat([new Date()]);
            this.stocks.push(stock);
          }
        }
    });
    console.log(this.stocks);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTimeInfo(fetchedTime) {
    var currentTime=new Date();
    var timePast = fetchedTime.getTime();
    var timeNow = currentTime.getTime();
    var mo
    var delta = Math.abs(timePast - timeNow) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;
    var timeInfo='';
    if(days===0 &&hours===0 && minutes===0) {
      timeInfo= "A few seconds ago";
    } else if(days>0) {
      var month = fetchedTime.toLocaleString("en-us", { month: "short" });
      timeInfo +=fetchedTime.getDate() + month + this.formatAMPM(fetchedTime);
    } else {
      timeInfo=this.formatAMPM(fetchedTime);
    }
    return timeInfo;
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

}

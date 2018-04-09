import { Injectable } from '@angular/core';
import { Stock} from './stock';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class WebsocketService {

  stocks: Stock[];
  constructor() {

  }

observer: Observer<any>;

  getStocks() : Observable<any> {
    let ws = new WebSocket('ws://stocks.mnet.website');
    let that=this;
    ws.onmessage= function(res) {
      that.observer.next(res);
    }
    return this.createObservable();
  }

  createObservable() : Observable<number> {
      return new Observable<any>(observer => {
        this.observer = observer;
      });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}

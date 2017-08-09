import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';

@Injectable()
export class CallProvider {

  constructor(private callNumber: CallNumber) { console.log('Hello Call Provider'); }

  me(_dial: string = '18001010101'){
   this.callNumber.callNumber(_dial, true)
      .then(() => {
        console.log('Launched dialer!');
      })
      .catch(() => {
        console.log('Error launching dialer');
      });
  }

}

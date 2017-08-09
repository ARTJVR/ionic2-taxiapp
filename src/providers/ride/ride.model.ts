/**
 * @author    
 * @copyright Copyright (c) 2017
 * @license   
 */

export class RideModel {
  constructor(public _id: string,
              public departure: string,
              public destination: string,
              public rideDate: Date = new Date()) {
  }
}

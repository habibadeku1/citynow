import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

 
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({

  selector: 'show-picture',

  templateUrl: 'show-picture.html'

})

export class ShowPictureComponent {

  pictureSrc: string;

 

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {

    this.pictureSrc = navParams.get('pictureSrc');

  }

}
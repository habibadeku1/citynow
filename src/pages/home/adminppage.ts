import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Users, Pictures, Thumbs } from 'api/collections';

import { Profile } from 'api/models';

import { ToastController, LoadingController, ViewController, NavController, PopoverController, ModalController, AlertController, Platform, IonicPage, NavParams } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';

import { PictureService } from '../../services/picture';

import { Random } from 'meteor/random'
 


@IonicPage()
@Component({
  selector: "adminppage",
  templateUrl: "adminppage.html"


})
export class AdminPostPage implements OnInit {


  headline;

  allsource;

  titles;

  thumb;

  cpid;

  hid1; hid2; hid3; hid4; hid5; hid6; hid7; hid8; hid9; hid10

  picture;

  item: FormControl;

  eForm1: FormGroup;

  submitAttempt: boolean = false;

  image1; image2; image3; image4; image5; image6; image7; image8; image9; image10;

  uppic1; uppic2; uppic3; uppic4; uppic5; uppic6; uppic7; uppic8; uppic9; uppic10;

  uppictureId1; uppictureId2; uppictureId3; uppictureId4; uppictureId5; uppictureId6; uppictureId7; uppictureId8; uppictureId9; uppictureId10;

  uptitle1; uptitle2; uptitle3; uptitle4; uptitle5; uptitle6; uptitle7; uptitle8; uptitle9; uptitle10;

  upsource1; upsource2; upsource3; upsource4; upsource5; upsource6; upsource7; upsource8; upsource9; upsource10;

  updescr1; updescr2; updescr3; updescr4; updescr5; updescr6; updescr7; updescr8; updescr9; updescr10;

  senderId: string;

  profile: Profile;

  rootNavCtrl: NavController;

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, private alertCtrl: AlertController,
    public navParams: NavParams, private viewCtrl: ViewController,
    private platform: Platform, public formBuilder: FormBuilder,
    private pictureService: PictureService
  ) {

    this.eForm1 = formBuilder.group({

      headline: ['', Validators.compose([Validators.maxLength(1000)])],
      allsource: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle1: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr1: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource1: ['', Validators.compose([Validators.maxLength(1000)])],
      html1: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid1: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle2: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr2: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource2: ['', Validators.compose([Validators.maxLength(1000)])],
      html2: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid2: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle3: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr3: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource3: ['', Validators.compose([Validators.maxLength(1000)])],
      html3: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid3: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle4: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr4: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource4: ['', Validators.compose([Validators.maxLength(1000)])],
      html4: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid4: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle5: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr5: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource5: ['', Validators.compose([Validators.maxLength(1000)])],
      html5: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid5: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle6: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr6: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource6: ['', Validators.compose([Validators.maxLength(1000)])],
      html6: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid6: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle7: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr7: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource7: ['', Validators.compose([Validators.maxLength(1000)])],
      html7: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid7: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle8: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr8: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource8: ['', Validators.compose([Validators.maxLength(1000)])],
      html8: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid8: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle9: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr9: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource9: ['', Validators.compose([Validators.maxLength(1000)])],
      html9: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid9: ['', Validators.compose([Validators.maxLength(1000)])],

      uptitle10: ['', Validators.compose([Validators.maxLength(1000)])],
      updescr10: ['', Validators.compose([Validators.maxLength(10000)])],
      upsource10: ['', Validators.compose([Validators.maxLength(1000)])],
      html10: ['', Validators.compose([Validators.maxLength(1000)])],
      videoid10: ['', Validators.compose([Validators.maxLength(1000)])],


    });

  }

  /**  ionViewWillLoad() {
      this.item = this.formBuilder.control('');
  
      this.eForm1 = this.formBuilder.group({
        updescr: this.item      
    });
    
    }  **/

  ngOnInit() {

    this.profile = Meteor.user().profile || { fname: '', sname: '', pcity: '' };

    MeteorObservable.subscribe('user').subscribe(() => {

      MeteorObservable.autorun().subscribe(() => {

        let platform = this.platform.is('android') ? "android" :

          this.platform.is('ios') ? "ios" : "";

        platform = this.platform.is('cordova') ? platform : "";

        this.thumb = Thumbs.getThumbUrl(this.profile.thumbId, platform);


      })
    });


  }

  selectUploadPicture1(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture1(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture1(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic1) => {

      this.uppictureId1 = Random.id();

      this.uppic1 = uppic1.url;

      if (uppic1) {
        this.image1 = "Image 1 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture2(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture2(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture2(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic2) => {

      this.uppictureId2 = Random.id();

      this.uppic2 = uppic2.url;

      if (uppic2) {
        this.image2 = "Image 2 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture3(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture3(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture3(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic3) => {

      this.uppictureId3 = Random.id();

      this.uppic3 = uppic3.url;

      if (uppic3) {
        this.image3 = "Image 3 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture4(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture4(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture4(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic4) => {

      this.uppictureId4 = Random.id();

      this.uppic4 = uppic4.url;

      if (uppic4) {
        this.image4 = "Image 4 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture5(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture5(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture5(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic5) => {

      this.uppictureId5 = Random.id();

      this.uppic5 = uppic5.url;

      if (uppic5) {
        this.image5 = "Image 5 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture6(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture6(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture6(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic6) => {

      this.uppictureId6 = Random.id();

      this.uppic6 = uppic6.url;

      if (uppic6) {
        this.image6 = "Image 6 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture7(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture7(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture7(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic7) => {

      this.uppictureId7 = Random.id();

      this.uppic7 = uppic7.url;

      if (uppic7) {
        this.image7 = "Image 7 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture8(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture8(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture8(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic8) => {

      this.uppictureId8 = Random.id();

      this.uppic8 = uppic8.url;

      if (uppic8) {
        this.image8 = "Image 8 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture9(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture9(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture9(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic9) => {

      this.uppictureId9 = Random.id();

      this.uppic9 = uppic9.url;

      if (uppic9) {
        this.image9 = "Image 9 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }

  selectUploadPicture10(): void {

    this.pictureService.select().then((blob) => {
      this.uploadPicture10(blob);

    })

      .catch((e) => {

        this.handleError(e);

      });

  }

  uploadPicture10(blob: any): void {

    let loading = this.loadingCtrl.create({
      content: 'Loading image, Please wait...', spinner: 'bubbles'
    });

    loading.present();

    this.pictureService.upload(blob).then((uppic10) => {

      this.uppictureId10 = Random.id();

      this.uppic10 = uppic10.url;

      if (uppic10) {
        this.image10 = "Image 10 loaded succesfully"
        loading.dismiss()
      }

    })
      .catch((e) => {

        this.handleError(e);

      });

  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Admin city post added successfully',
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

  //  handleSelection(event) {
  //    this.updescr = this.updescr + " " + event.char;
  //  }


  save() {

    this.submitAttempt = true;

    if (!this.eForm1.valid) {
      return;
    }
    else {

      let loading = this.loadingCtrl.create({
        content: 'Posting headline, Please wait...', spinner: 'bubbles'
      });

      loading.present();

      this.cpid = Random.id()

      this.hid1 = Random.id(); this.hid2 = Random.id(); this.hid3 = Random.id(); this.hid4 = Random.id(); this.hid5 = Random.id(); this.hid6 = Random.id(); this.hid7 = Random.id(); this.hid8 = Random.id(); this.hid9 = Random.id(); this.hid10 = Random.id()


      this.titles = "<p>" + this.eForm1.get(['uptitle1']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle2']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle3']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle4']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle5']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle6']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle7']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle8']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle9']).value + "</p>" + "<p>" + this.eForm1.get(['uptitle10']).value + "</p>"

      MeteorObservable.call('addcityadminpost', this.profile.pcity, this.eForm1.get(['headline']).value, this.titles, this.eForm1.get(['allsource']).value, null, null, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "adminpost", this.cpid).subscribe({

        next: () => {

          MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle1']).value, this.eForm1.get(['updescr1']).value, this.eForm1.get(['upsource1']).value, this.eForm1.get(['html1']).value, this.eForm1.get(['videoid1']).value, this.uppic1, this.uppictureId1, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid1).subscribe({

            next: () => {

              MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle2']).value, this.eForm1.get(['updescr2']).value, this.eForm1.get(['upsource2']).value, this.eForm1.get(['html2']).value, this.eForm1.get(['videoid2']).value, this.uppic2, this.uppictureId2, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid2).subscribe({

                next: () => {

                  MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle3']).value, this.eForm1.get(['updescr3']).value, this.eForm1.get(['upsource3']).value, this.eForm1.get(['html3']).value, this.eForm1.get(['videoid3']).value, this.uppic3, this.uppictureId3, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid3).subscribe({

                    next: () => {

                      MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle4']).value, this.eForm1.get(['updescr4']).value, this.eForm1.get(['upsource4']).value, this.eForm1.get(['html4']).value, this.eForm1.get(['videoid4']).value, this.uppic4, this.uppictureId4, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid4).subscribe({

                        next: () => {

                          MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle5']).value, this.eForm1.get(['updescr5']).value, this.eForm1.get(['upsource5']).value, this.eForm1.get(['html5']).value, this.eForm1.get(['videoid5']).value, this.uppic5, this.uppictureId5, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid5).subscribe({

                            next: () => {

                              MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle6']).value, this.eForm1.get(['updescr6']).value, this.eForm1.get(['upsource6']).value, this.eForm1.get(['html6']).value, this.eForm1.get(['videoid6']).value, this.uppic6, this.uppictureId6, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid6).subscribe({

                                next: () => {

                                  MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle7']).value, this.eForm1.get(['updescr7']).value, this.eForm1.get(['upsource7']).value, this.eForm1.get(['html7']).value, this.eForm1.get(['videoid7']).value, this.uppic7, this.uppictureId7, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid7).subscribe({

                                    next: () => {

                                      MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle8']).value, this.eForm1.get(['updescr8']).value, this.eForm1.get(['upsource8']).value, this.eForm1.get(['html8']).value, this.eForm1.get(['videoid8']).value, this.uppic8, this.uppictureId8, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid8).subscribe({

                                        next: () => {

                                          MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle9']).value, this.eForm1.get(['updescr9']).value, this.eForm1.get(['upsource9']).value, this.eForm1.get(['html9']).value, this.eForm1.get(['videoid9']).value, this.uppic9, this.uppictureId9, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid9).subscribe({

                                            next: () => {

                                              MeteorObservable.call('addadminpost', this.profile.pcity, this.eForm1.get(['uptitle10']).value, this.eForm1.get(['updescr10']).value, this.eForm1.get(['upsource10']).value, this.eForm1.get(['html10']).value, this.eForm1.get(['videoid10']).value, this.uppic10, this.uppictureId10, this.profile.fname, this.profile.sname, this.profile.thumb, this.profile.thumbId, "nopost", this.cpid, this.hid10).subscribe({

                                                next: () => {

                                                  loading.dismiss()

                                                  this.viewCtrl.dismiss();

                                                  this.presentToast()
                                                },
                                                error: (e: Error) => {
                                                  this.handleError(e);
                                                }
                                              });

                                            },
                                            error: (e: Error) => {
                                              this.handleError(e);
                                            }
                                          });

                                        },
                                        error: (e: Error) => {
                                          this.handleError(e);
                                        }
                                      });

                                    },
                                    error: (e: Error) => {
                                      this.handleError(e);
                                    }
                                  });

                                },
                                error: (e: Error) => {
                                  this.handleError(e);
                                }
                              });

                            },
                            error: (e: Error) => {
                              this.handleError(e);
                            }
                          });

                        },
                        error: (e: Error) => {
                          this.handleError(e);
                        }
                      });

                    },
                    error: (e: Error) => {
                      this.handleError(e);
                    }
                  });

                },
                error: (e: Error) => {
                  this.handleError(e);
                }
              });

            },
            error: (e: Error) => {
              this.handleError(e);
            }
          });

        },
        error: (e: Error) => {
          this.handleError(e);
        }
      });



    }

  }

  handleError(e: Error): void {

    console.error(e.message);

    console.error(e.stack);

    const alert = this.alertCtrl.create({

      title: 'Please check!',
      
            message: 'This was stopped',
      
            buttons: ['OK']

    });

    alert.present();

  }



}
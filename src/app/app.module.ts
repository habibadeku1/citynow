import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FCM } from "@ionic-native/fcm";


import { MomentModule } from 'angular2-moment';

import { SuperTabsModule } from '../ionic2-super-tabs/src';
import { LoginLogoutService } from '../services/loginlogout'; 
import { PictureService } from '../services/picture'; 
//import { LoginPage } from '../pages/login/login';
//import { CityPostPage } from '../pages/page1/cityppage'; 
//import { CityComsPage } from '../pages/page1/citycoms';

//import { HausaCityPostPage } from '../pages/hausapage1/hausacityppage'; 
//import { HausaCityComsPage } from '../pages/hausapage1/hausacitycoms';

//import { GroupComsPage } from '../pages/page3/groupcoms';

//import { GroupPostsPage } from '../pages/page3/groupppage'; 

//import { GroupPostEntry } from '../pages/page3/grouppentry';


//import { MessagesOptionsComponent } from '../pages/messages/messages-options';

//import { MessagesAttachmentsComponent } from '../pages/messages/messages-attachments';

//import { ShowPictureComponent } from '../pages/messages/show-picture';




//import { MessagesPage } from '../pages/messages/messages';


//import { PostPage } from '../pages/page1/postpage';

//import { HausaPostPage } from '../pages/hausapage1/hausapostpage';

//import { GPostPage } from '../pages/page3/gpostpage';

//import { ProfilePage } from '../pages/profile/profile';

//import { ProfileViewPage } from '../pages/profile/pview';

//import { ProfileCViewPage } from '../pages/profile/pcview';

//import { NewChatComponent } from '../pages/chats/new-chat';

//import { HausaNewChatComponent } from '../pages/hausachats/hausanew-chat';

//import { SignupPage } from '../pages/signup/signup';

//import { GuestupPage } from '../pages/guestup/guestup';

//import { VerificationPage } from '../pages/verification/verification';
//import { MenuOptionsComponent } from '../pages/home/menu-options';

//import { AdminApprovePostPage } from '../pages/home/adminapprove';

//import { HausaMenuOptionsComponent } from '../pages/hausahome/hausamenu-options';

//import { HausaAdminApprovePostPage } from '../pages/hausahome/hausaadminapprove';

//import { PageMenuOptionsComponent } from '../pages/page1/menu-options';

//import { ReportPost } from '../pages/page1/reportpost';

//import { HausaPageMenuOptionsComponent } from '../pages/hausapage1/hausamenu-options';

//import { HausaReportPost } from '../pages/hausapage1/hausareportpost';

//import { PageMenuOptionsComponent3 } from '../pages/page3/menu-options';

//import { ReportPost3 } from '../pages/page3/reportpost';

//import { AdminPostPage } from '../pages/home/adminppage';

//import { HausaAdminPostPage } from '../pages/hausahome/hausaadminppage';
 
import { ImagePicker } from '@ionic-native/image-picker';
import { Network } from '@ionic-native/network';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { IonicStorageModule } from '@ionic/storage'; 

//import { File } from '@ionic-native/file';



import { InAppBrowser } from '@ionic-native/in-app-browser';

import { EmojiPickerModule } from '@ionic-tools/emoji-picker';



import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';

import { Device } from '@ionic-native/device';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';  
import { HoldPage } from '../pages/hold/hold';  

import { HausaHomePage } from '../pages/hausahome/hausahome';

//import { HausaGroupComsPage } from '../pages/hausapage3/hausagroupcoms';
//import { HausaGroupPostsPage } from '../pages/hausapage3/hausagroupppage'; 

//import { HausaGroupPostEntry } from '../pages/hausapage3/hausagrouppentry';

//import { HausaGPostPage } from '../pages/hausapage3/hausagpostpage';

//import { HausaPageMenuOptionsComponent3 } from '../pages/hausapage3/hausamenu-options';
//import { HausaReportPost3 } from '../pages/hausapage3/hausareportpost';

import { IonicImageViewerModule } from 'ionic-img-viewer';






@NgModule({  
  declarations: [
    MyApp,
//    HomePage,
//    LoginPage,
//    SignupPage,
//    VerificationPage,
//    MenuOptionsComponent,
//    CityPostPage,
 //   AdminPostPage,
//    PostPage,
/*    ProfilePage,
    CityComsPage,
//    NewChatComponent,
    MessagesPage,
    MessagesOptionsComponent,
    MessagesAttachmentsComponent,
    ShowPictureComponent,
    GroupPostsPage,
    GroupPostEntry,
    GroupComsPage,
    GPostPage,
    PageMenuOptionsComponent,
    ReportPost,
    PageMenuOptionsComponent3,
    ReportPost3, */
//    Autosize,
//    Autosize2,
 //   ProfileViewPage,
 //   ProfileCViewPage,
 //   AdminApprovePostPage,
 //   GuestupPage,
//    HoldPage,
//    HausaHomePage,
/**    HausaMenuOptionsComponent,
    HausaAdminApprovePostPage,
    HausaAdminPostPage,
    HausaReportPost,
    HausaPageMenuOptionsComponent,
    HausaPostPage,
    HausaCityPostPage,
    HausaCityComsPage,
    HausaGroupComsPage,
    HausaGroupPostsPage,
    HausaGroupPostEntry,
    HausaGPostPage,
    HausaPageMenuOptionsComponent3,
    HausaReportPost3,
    HausaNewChatComponent */
    
  ],
  imports: [
    SuperTabsModule.forRoot(), 
//    EmojiPickerModule.forRoot(),      
//    MomentModule,   
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot({
      name: '__localstoragecd',
      driverOrder: ['sqlite', 'websql']
    }) ,
//    IonicImageViewerModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
//    HomePage,
//    HoldPage,
//    HausaHomePage,
//    LoginPage,
//    SignupPage,
//    VerificationPage,
/**    MenuOptionsComponent,
    CityPostPage,
    AdminPostPage,
    PostPage,
    ProfilePage,
    CityComsPage,
//    NewChatComponent,
    MessagesPage,
    MessagesOptionsComponent,
    MessagesAttachmentsComponent,
    ShowPictureComponent, 
    GroupPostsPage, 
    GroupPostEntry,
    GroupComsPage,
    GPostPage,
    PageMenuOptionsComponent,
    ReportPost,
    PageMenuOptionsComponent3,
    ReportPost3,
    ProfileViewPage,
    ProfileCViewPage,
    AdminApprovePostPage,
    GuestupPage,

    HausaMenuOptionsComponent,
    HausaAdminApprovePostPage,
    HausaAdminPostPage,
    HausaReportPost,
    HausaPageMenuOptionsComponent,
    HausaPostPage,
    HausaCityPostPage,
    HausaCityComsPage,
    HausaGroupComsPage,
    HausaGroupPostsPage,
    HausaGroupPostEntry,
    HausaGPostPage,
    HausaPageMenuOptionsComponent3,
    HausaReportPost3,
    HausaNewChatComponent **/
    
    
  ],
  providers: [
//    SQLite,
    StatusBar, //stay here
    SplashScreen, //stay here
    {provide: ErrorHandler, useClass: IonicErrorHandler}, //stay here
//    LoginLogoutService,
    Network,//stay here    
    ImagePicker,
		Crop,
		Camera,    
//    PictureService,
//    FCM,
//    InAppBrowser,
//    Device,

  ]
})
export class AppModule {}  

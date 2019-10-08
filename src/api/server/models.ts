export const DEFAULT_PICTURE_URL = '/assets/avatar.png';


export interface User extends Meteor.User { 
    
      profile?: Profile;
    
      alm?: string[];
     
      fcmToken?: string;
      
    }

export interface FDDP {
      
        _id?: string;
      
        meteoruser?: string;
      
        createdAt?: Date;
      }


export interface UserSearch {

       email?: string;

       nname?: string;
       
       fname?: string;

       sname?: string;

       fsname?: string;

       userid?: string;

       mycities?: string[];       

       thumbId?: string;
}


export interface Profile {
        
          fname?: string;
        
          sname?: string;

          fsname?: string;

          nname?: string;
        
          pcity?: string; 

          plang?: string;           
        
          phone?: string;
        
          sex?: string;
        
          createdAt?: Date;
        
          picture?: string;
        
          pictureId?: string;

          thumb?: string;
          
          thumbId?: string;

          usertype?: string;
        
          mycities?: string[];

          sigtext?: string;
        
        }

export interface Picture {
            
              _id?: string;
            
              complete?: boolean;
            
              extension?: string;
            
              name?: string;
            
              progress?: number;
            
              size?: number;
            
              store?: string; 
            
              token?: string;
            
              type?: string;
            
              uploadedAt?: Date;
            
              uploading?: boolean;
            
              url?: string;
            
              userId?: string;
            
            }


export interface Thumb {
            
              _id?: string;
            
              complete?: boolean;
            
              extension?: string;
            
              name?: string;
            
              progress?: number;
            
              size?: number;
            
              store?: string; 
            
              token?: string;
            
              type?: string;
            
              uploadedAt?: Date;
            
              uploading?: boolean;
            
              url?: string;
            
              userId?: string;
            
            }


            
    export interface CityPost {
              
                _id?: string;

                approved?: boolean;

                deleted?: boolean;

                edited?: boolean;

                html?: string;
                
                videoid?: string;

                cityname?: string;

                citylang?: string;

                hid?: string;

                cpid?: string;

                posttype?: string;

                uptitle?: string;                
                    
                updescr?: string;

                upsource?: string;                
            
                picture?: string;
            
                pictureId?: string; 

                thumb?: string;
                
                thumbId?: string;

                picture2?: string;
                
                pictureId2?: string;
                    
                picture3?: string;
                    
                pictureId3?: string; 
              
                posterid?: string;
            
                postername?: string;
            
                posterpicture?: string;
                
                posterpictureId?: string;
                
                createdAt?: Date;

                upDate?: Date;
            
                comusersId?: string[];
                
                comcount?: number;
            
                loveusersId?: string[];     
                          
                lovecount?: number;
                
                goodusersId?: string[];     
                              
                goodcount?: number;
                      
                notgoodusersId?: string[];     
                
                notgoodcount?: number;
          
                lastComment?: CityCom;      

                followIds?: string[];
                                
              
              }


        export interface HeadLinePost {
                
                          _id?: string;
          
                          approved?: boolean;
          
                          deleted?: boolean;
          
                          edited?: boolean;
          
                          html?: string;
                          
                          videoid?: string;
          
                          cityname?: string;

                          citylang?: string;                          
          
                          hid?: string;
          
                          cpid?: string;
          
                          posttype?: string;
          
                          uptitle?: string;                
                              
                          updescr?: string;
          
                          upsource?: string;                
                      
                          picture?: string;
                      
                          pictureId?: string;
                          
                          thumb?: string;
                          
                          thumbId?: string;
          
                          picture2?: string;
                          
                          pictureId2?: string;
                              
                          picture3?: string;
                              
                          pictureId3?: string; 
                        
                          posterid?: string;
                      
                          postername?: string;
                      
                          posterpicture?: string;
                          
                          posterpictureId?: string;
                          
                          createdAt?: Date;

                          upDate?: Date;                          
                      
                          comusersId?: string[];
                          
                          comcount?: number;
                      
                          loveusersId?: string[];     
                                    
                          lovecount?: number;
                          
                          goodusersId?: string[];     
                                        
                          goodcount?: number;
                                
                          notgoodusersId?: string[];     
                          
                          notgoodcount?: number;
                    
                          lastComment?: CityCom;      
          
                          followIds?: string[];  
                
                }

    export interface CityCom {
                
                  _id?: string;
                
                  comId?: string;
                
                  senderId?: string[];
                
                  senderName?: string[];
                
                  profilefName?: string[];
                
                  profilesName?: string[];
                
                  content?: string;
                
                  createdAt?: Date;
                
                  type?: MessageType;
                
                  ownership?: string;
          
                }

    export interface GroupCom {
                  
                    _id?: string;
                  
                    comId?: string;
                  
                    senderId?: string[];
                  
                    senderName?: string[];
                  
                    profilefName?: string[];
                  
                    profilesName?: string[];
                  
                    content?: string;
                  
                    createdAt?: Date;
                  
                    type?: MessageType;
                  
                    ownership?: string;
            
                  }


    export enum MessageType {
                  
                    TEXT = <any>'text',
                  
                    LOCATION = <any>'location',
                    
                    PICTURE = <any>'picture'
                  
                  }


    export interface Chat {
                    
               _id?: string;
                    
               title?: string;
                    
               picture?: string;
                    
               mybadge?: MyBadge;
                    
               lastMessage?: Message;
                    
               memberIds?: string[];
                    
           }


           export interface Message {
            
              _id?: string;
            
              chatId?: string;
            
              senderId?: string;
            
              senderName?: string;
              
              profilefName?: string;
              
              profilesName?: string;
            
              content?: string;

              content2?: string;
              
              createdAt?: Date;
            
              type?: MessageType;
            
              ownership?: string;
            
              isread?: boolean;
            
            }


            export interface MyBadge {
              
                  badgerefid?: string; 
                  badgecount?: number;
                  memberId?: string;
                  type?: string;
              
                }


      export interface Group {
                  
             _id?: string;

             cityname?: string;

             citylang?: string;
             
             title?: string;
                  
          //   picture?: string;
                   
             mybadge?: MyBadge;
                  
             lastGroupPost?: GroupPost;
                  
             followIds?: string[];
                  
         } 


      export interface GroupPost {
          
            _id?: string;

            approved?: boolean;

            deleted?: boolean;

            edited?: boolean;

            html?: string;

            videoid?: string;

            cityname?: string;

            citylang?: string;            
            
    //        hid?: string;

            gpid?: string;

            posttype?: string;

            uptitle?: string;                
                
            updescr?: string;

            upsource?: string;                
        
            picture?: string;
        
            pictureId?: string;

            thumb?: string;
            
            thumbId?: string;
            
            picture2?: string;
            
            pictureId2?: string;
                
            picture3?: string;
                
            pictureId3?: string;
          
            posterid?: string;
        
            postername?: string;
        
            posterpicture?: string;
            
            posterpictureId?: string;
            
            createdAt?: Date;

            upDate?: Date;            
        
            comusersId?: string[];
            
            comcount?: number;
        
            loveusersId?: string[];     
                      
            lovecount?: number;
            
            goodusersId?: string[];     
                          
            goodcount?: number;
                  
            notgoodusersId?: string[];     
            
            notgoodcount?: number;
      
            lastComment?: GroupCom;
            
            followIds?: string[];
            
          
          }

    export interface Video {

      _id?: string;

      url?: string;

      city?: string;

      createdAt?: Date;   


    }


    export interface SearchCity { 
      
        _id?: string;

        cityname?: string;

        citylang?: string;        

        type?: string;

        cpid?: string;

        uptitle?: string;                
            
        updescr?: string;

        alltext?: string;

        alltext2?: string;
        
      
      }


    export interface ReportPost {
      
        _id?: string;

        cityname?: string;

        citylang?: string;        

        updescr?: string;
        
        fname?: string;

        sname?: string;

        picture?: string;
        
        pictureid?: string;

        cpid?: string;

      
      }

      export interface RegGuest {
        
          _id?: string;
  
          did?: string;
  
          dplat?: string;
          
          dcord?: string;

          pcity?: string;

          plang?: string;
  
          createdAt?: Date;
          
        }


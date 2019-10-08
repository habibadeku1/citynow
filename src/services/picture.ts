import { Injectable,OnInit } from '@angular/core';

import { Platform, LoadingController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';

import { UploadFS } from 'meteor/jalik:ufs';

import { PicturesStore } from 'api/collections';

import { ThumbsStore } from 'api/collections';

//import { _ } from 'meteor/underscore';

import * as _ from 'lodash';

import { DEFAULT_PICTURE_URL } from 'api/models'; 

import { Crop } from '@ionic-native/crop';

import { Camera, CameraOptions } from '@ionic-native/camera';




 

@Injectable()

export class PictureService implements OnInit {

  //loading: any;



  constructor(private crop: Crop, private camera: Camera, public loadingCtrl: LoadingController, private platform: Platform,

              private imagePicker: ImagePicker) {

  }

  ngOnInit() {
    
 
    
  }




  selectprofile(camera: boolean, crop: boolean): Promise<any> {

    if (!this.platform.is('cordova') || !this.platform.is('mobile')) {

      return new Promise((resolve, reject) => {

        try {

          if (camera === true) {
            reject(new Error("Can't access the camera on Browser"));
          }
          UploadFS.selectFile((file: File) => {

            const myblob = { blobfile: file, name: file.name, type:file.type, size:file.size }
            
            resolve(myblob);

          });

        }

        catch (e) {

          reject(e);

        }

      });

    }

    return this.camera.getPicture(<CameraOptions>{
      destinationType: 1,
      quality: 100,
      correctOrientation: true,
    //  allowEdit: true,
      saveToPhotoAlbum: false,
      sourceType: camera ? 1 : 0,
      targetHeight: 500, 
      targetWidth: 500
    })
      .then((fileURI) => {
        return crop ? this.crop.crop(fileURI) : fileURI;
      })
      .then((croppedFileURI) => {
        return this.convertURLtoBlob(croppedFileURI);
      });

/**  return this.imagePicker.getPictures({maximumImagesCount: 1,width:400,height:400,quality: 100}).then((fileURI) => {
    
    return crop ? this.crop.crop(fileURI, {quality: 50, targetHeight: 400, targetWidth: 400}) : fileURI;
  })
  .then((croppedFileURI) => {
    return this.convertURLtoBlob(croppedFileURI);
  });  **/

  }

  select(): Promise<any> {
    
        if (!this.platform.is('cordova') || !this.platform.is('mobile')) {
    
          return new Promise((resolve, reject) => {
    
            try {
    
            //  if (camera === true) {
            //    reject(new Error("Can't access the camera on Browser"));
            //  }
              UploadFS.selectFile((file: File) => {
    
                const myblob = { blobfile: file, name: file.name, type:file.type, size:file.size }
                
                resolve(myblob);
    
              });
    
            }
    
            catch (e) {
    
              reject(e);
    
            }
    
          });
    
        }

        return this.camera.getPicture(<CameraOptions>{
          destinationType: 1,
          quality: 100,
          correctOrientation: true,
        //  allowEdit: true,
          saveToPhotoAlbum: false,
          sourceType: 0,
          targetHeight: 500, 
          targetWidth: 500
        })
        //  .then((fileURI) => {
        //    return crop ? this.crop.crop(fileURI) : fileURI;
        //  })
          .then((croppedFileURI) => {
            return this.convertURLtoBlob(croppedFileURI);
          });
    
  //    return this.imagePicker.getPictures({maximumImagesCount: 1,width:400,height:400,quality: 50}).then((fileURI) => {
        
    //    return crop ? this.crop.crop(fileURI, {quality: 50, targetHeight: 400, targetWidth: 400}) : fileURI;
    //  })true
    //  .then((croppedFileURI) => {
  //      return this.convertURLtoBlob(fileURI);
  //    });  
    
      }

  


  upload(blob: any): Promise<any> {

    return new Promise((resolve, reject) => {

      const metadata = _.pick(blob, 'name', 'type', 'size');

      if (!metadata.name) {

        metadata.name = DEFAULT_PICTURE_URL;

      }

      const upload = new UploadFS.Uploader({
        data: blob.blobfile,
        file: metadata,
        store: PicturesStore,
        onComplete: resolve,
        onError: reject,
        adaptive: true,
        // Define the upload capacity (if upload speed is 1MB/s, then it will try to maintain upload at 80%, so 800KB/s)
        // (used only if adaptive = true)
        capacity: 0.99, // 80%
        // The size of each chunk sent to the server
        chunkSize: 1024 * 100 * 8, // 8k
        // The max chunk size (used only if adaptive = true)
        maxChunkSize: 1024 * 100 * 128, // 128k
        onProgress(file, progress) {
          console.log('picture upload'+file.name + ' ' + (progress*100) + '% uploaded');
      },
      });

    /**  const upload = new UploadFS.Uploader({

        data: blob.blobfile,

        file: metadata,

        store: PicturesStore,

        onComplete: resolve,

        onError: reject,

        adaptive: false,
        // Define the upload capacity (if upload speed is 1MB/s, then it will try to maintain upload at 80%, so 800KB/s)
        // (used only if adaptive = true)
     //   capacity: 0.8, // 80%
        // The size of each chunk sent to the server
        chunkSize: 1024 * 100 * 16.66, // 8k
        // The max chunk size (used only if adaptive = true)
        maxChunkSize: 1024 * 100 * 20, // 128k
        // This tells how many tries to do if an error occurs during upload

 
        onProgress(file, progress) {
            console.log('picture upload'+file.name + ' ' + (progress*100) + '% uploaded');
        },
        onStart(file) {
          //  console.log(file.name + ' started');
        },

      });    **/
      
      upload.start();


      
    })

    
  }


  upload2(blob: any): Promise<any> {
    
        return new Promise((resolve, reject) => {
    
          const metadata = _.pick(blob, 'name', 'type', 'size');
    
          if (!metadata.name) {
    
            metadata.name = DEFAULT_PICTURE_URL;
    
          }

          const upload2 = new UploadFS.Uploader({
            data: blob.blobfile,
            file: metadata,
            store: PicturesStore,
            onComplete: resolve,
            onError: reject,
            adaptive: true,
            // Define the upload capacity (if upload speed is 1MB/s, then it will try to maintain upload at 80%, so 800KB/s)
            // (used only if adaptive = true)
            capacity: 0.99, // 80%
            // The size of each chunk sent to the server
            chunkSize: 1024 * 100 * 8, // 8k
            // The max chunk size (used only if adaptive = true)
            maxChunkSize: 1024 * 100 * 128, // 128k
            onProgress(file, progress) { 
              console.log('thumb upload'+file.name + ' ' + (progress*100) + '% uploaded');
          },
          });

      /**    const upload2 = new UploadFS.Uploader({
            
                    data: blob.blobfile,
            
                    file: metadata,
            
                    store: ThumbsSt    if (!this.platform.is('cordova') || !this.platform.is('mobile')) {

      return new Promise((resolve, reject) => {

        try {

          if (camera === true) {
            reject(new Error("Can't access the camera on Browser"));
          }
          UploadFS.selectFile((file: File) => {

            const myblob = { blobfile: file, name: file.name, type:file.type, size:file.size }
            
            resolve(myblob);

          });

        }

        catch (e) {

          reject(e);

        }

      });

    }

    return this.camera.getPicture(<CameraOptions>{
      destinationType: 1,
      quality: 100,
      correctOrientation: true,
    //  allowEdit: true,
      saveToPhotoAlbum: false,
      sourceType: camera ? 1 : 0,
      targetHeight: 400, 
      targetWidth: 400
    })
      .then((fileURI) => {
        return crop ? this.crop.crop(fileURI) : fileURI;
      })
      .then((croppedFileURI) => {
        return this.convertURLtoBlob(croppedFileURI);
      });ore,
            
                    onComplete: resolve,
            
                    onError: reject, 
            
                    adaptive: false,
                    // Define the upload capacity (if upload speed is 1MB/s, then it will try to maintain upload at 80%, so 800KB/s)
                    // (used only if adaptive = true)
                 //   capacity: 0.8, // 80%
                    // The size of each chunk sent to the server
                    chunkSize: 1024 * 100 * 16.66, // 8k
                    // The max chunk size (used only if adaptive = true)
                    maxChunkSize: 1024 * 100 * 200, // 128k
                    // This tells how many tries to do if an error occurs during upload
             
                    onProgress(file, progress) { 
                        console.log('thumb upload'+file.name + ' ' + (progress*100) + '% uploaded');
                    },
                    onStart(file) {
                      //  console.log(file.name + ' started');
                    },
            
                  });    **/
          
          upload2.start()
    
    
          
        })
    
        
      } 


  convertURLtoBlob(url: string, options = {}): Promise<any> {

    return new Promise((resolve, reject) => {

      const image = document.createElement('img');

 

      image.onload = () => {

        try {

          const dataURI = this.convertImageToDataURI(image, options);

        //  console.log("dataURI" +dataURI)

          const blob = this.convertDataURIToBlob(dataURI);

        //  console.log("blob" +blob.size)          

          const pathname = (new URL(url)).pathname;

        //  console.log("pathname" +pathname)

          const filename = pathname.substring(pathname.lastIndexOf('/') + 1);

        //  console.log("filename" +filename)

          const file = new Blob([blob]);

          //console.log("file" +file.name)          

        //  console.log("file" +file.size)
          
        //  console.log("size" +file)

          const myblob = { blobfile: file, name: filename, type:file.type, size:file.size }
          

        //  new File(this.name, this.localURL, this.type, this.lastModified, this.size);

          resolve(myblob);

        }

        catch (e) {

          reject("thisistheerror:" +e);

        }

      };

 

      image.src = url;

    });

  }

 

  convertImageToDataURI(image: HTMLImageElement, {} = {}): string {

    // Create an empty canvas element

    const canvas = document.createElement('canvas');

 

    var width = image.width, height = image.height;

    canvas.width = width;

    canvas.height = height;


    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0, width, height);

    const dataURL = canvas.toDataURL('image/png');

 

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');

  }

 

  convertDataURIToBlob(dataURI): Blob {

    const binary = atob(dataURI);

 

    // Write the bytes of the string to a typed array

    const charCodes = Object.keys(binary)

      .map<number>(Number)

      .map<number>(binary.charCodeAt.bind(binary));

 
      

    // Build blob with typed array

    return new Blob([new Uint8Array(charCodes)], {type: 'image/jpeg'});

  } 

}
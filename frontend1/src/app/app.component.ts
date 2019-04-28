import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'environments/environment';
import { AuthService } from './service/auth.service';



@Component({
  moduleId: module.id,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent implements OnInit {


  stopAutoPlayOnSlide = false;
  autoPlay = true;
  constructor( public auth: AuthService) { }
  showSlideshow = false;
  
  imageBlob;
  imageFile;
  imageFileItem;
  allBase64: String[] = [];
  public uploader: FileUploader = new FileUploader({ url: environment.baseUrl + '/api/datasetss/manualimageupload', authToken: 'Bearer ' + this.auth.getToken() });
  file: any;
  imageName = 'screenshot';
  

  ngOnInit() {
    window.scrollTo(0, 0);
  }


  public uploads() {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item = this.imageFileItem


    }

    this.uploader.uploadAll();
  }


  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return blob;
  }

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let tempString = String(fileReader.result).split('</html>').pop().split(/\r?\n\r?\n/)
      tempString.shift();
      this.allBase64 = tempString;
      this.allBase64 = this.allBase64.filter(str => str.startsWith('/'));

      
      let i = 1;
      this.allBase64.forEach(base64 => {
        this.imageBlob = this.dataURItoBlob(this.allBase64[i - 1]);
        this.imageFile = new File([this.imageBlob], this.imageName + i + '.jpeg', { type: 'image/jpeg' });
        this.imageFileItem = new FileItem(this.uploader, this.imageFile, { url: environment.baseUrl + '/api/datasetss/manualimageupload', authToken: 'Bearer ' + this.auth.getToken() })

        this.uploader.queue.push(this.imageFileItem)

        this.uploads();
        i++;
      });

    }
    fileReader.readAsText(this.file);



  }






}

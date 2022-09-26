import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { FileService } from 'src/app/shared/file.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectP !: FileList;
  currentPU !: FileMetaData;
  per : number =0;

  listOfFiles : FileMetaData[] = [];

  constructor(private fservice : FileService, private afstorage : AngularFireStorage) { }

  ngOnInit(): void {
    this.getAllP();
  }

  selectProfile(event : any) {
    this.selectP = event.target.files;
  }

  uploadP() {
    this.currentPU =  new FileMetaData(this.selectP[0]);
    const path = 'Uploads/'+this.currentPU.file.name;

    const sRef = this.afstorage.ref(path);
    const uploadT = sRef.put(this.selectP[0]);

    uploadT.snapshotChanges().pipe(finalize( () => {
       sRef.getDownloadURL().subscribe(downloadLink => {
         this.currentPU.id = '';
         this.currentPU.url = downloadLink;
         this.currentPU.size = this.currentPU.file.size;
         this.currentPU.name = this.currentPU.file.name;

         this.fservice.saveProfile(this.currentPU);
       })
       this.ngOnInit();
    })
    ).subscribe( (res : any) => {
       this.per = (res.bytesTransferred * 100 / res.totalBytes);
    }, err => {
       console.log('Error');
    });

 }

  getAllP() {
    this.fservice.getAllProfiles().subscribe( res => {
        this.listOfFiles = res.map((e : any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
        });
    }, err => {
        alert('Error');
    })
  }

  deleteP(file : FileMetaData) {
    if(window.confirm('Delete Profile')) {
      this.fservice.deleteProfile(file);
      this.ngOnInit();
    }

  }

}

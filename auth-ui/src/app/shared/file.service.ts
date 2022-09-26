import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileMetaData } from '../model/file-meta-data';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private afstore : AngularFirestore, private afstorage : AngularFireStorage) { }

  saveProfile(fileObj : FileMetaData) {

    const pMeta = {
        id : '',
        name : fileObj.name,
        url : fileObj.url,
        size : fileObj.size
      }
  
      pMeta.id = this.afstore.createId();
  
      this.afstore.collection('/Upload').add(pMeta);
    }

    getAllProfiles() {
      return this.afstore.collection('/Uploads').snapshotChanges();
    }

    deleteProfile(pMeta : FileMetaData) {
      this.afstore.collection('/Uploads').doc(pMeta.id).delete();
      this.afstorage.ref('/Uploads/'+pMeta.name).delete();
    }

}



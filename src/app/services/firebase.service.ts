import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface Image {
  url: string;
  name: string;
  user_id: string;  
}

@Injectable({
  providedIn: 'root'
})



export class FirebaseService {

  private imagesCollection: AngularFirestoreCollection<Image>; 


  constructor(private afs: AngularFirestore ) { }

  getImages = ():Observable<Image[]> => {
    this.imagesCollection = this.afs.collection<Image>('images',ref => ref.orderBy('username','asc'));
    // Obtain id from the document (metadata)
    return this.imagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Image;
        const id = a.payload.doc.id;        
        return { id, ...data };
      }))
    )
    
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Image } from '../interfaces/image';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  private imagesCollection: AngularFirestoreCollection<Image>; 
  private imageDocument: AngularFirestoreDocument<Image>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
    ) { }

  getImages = ():Observable<Image[]> => {
    this.imagesCollection = this.afs.collection<Image>('images',ref => ref.orderBy('date','asc'));
    // Obtain id from the document (metadata)
    return this.imagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Image;
        const id = a.payload.doc.id;        
        return { id, ...data };
      }),
      catchError(this.handleError('getImages', []))
      )
    )    
  }

  // Add or remove like to the image
  setLike = (image: Image) : Promise<any> => {    
    this.imageDocument = 
      this.afs.collection<Image>('images').doc(image.id);  
    
    if (image.likes){
      //Search the user within the array to pop from it
      if (image.likes.indexOf(image.user_id)){
        image.likes.splice(image.likes.indexOf(image.user_id),1);
      }
      console.log('Image setLike',image);
      return this.imageDocument.update(image);
    }
    console.log('this.authService.user.id:',this.authService.user.id)
    image.likes = [this.authService.user.id];    
    console.log('Image setLike',image);
    return this.imageDocument.update(image);
  }

      /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}

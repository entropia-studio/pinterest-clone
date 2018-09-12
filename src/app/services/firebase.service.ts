import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Image } from '../interfaces/image';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  private imagesCollection: AngularFirestoreCollection<Image>; 
  private imageDocument: AngularFirestoreDocument<Image>;  


  constructor(
    private afs: AngularFirestore,    
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
  // If the user didn't click before its user_id is add to the links array
  // If the user clicked before its user_id is remove to the links array
  setLike = (image: Image, user_id: string) : Promise<any> => {    
    this.imageDocument = 
      this.afs.collection<Image>('images').doc(image.id);      
    if (image.likes){      
      //Search the user within the array to pop from it
      if (image.likes.indexOf(user_id) >= 0){           
        image.likes.splice(image.likes.indexOf(user_id),1);        
        return this.imageDocument.update(image);
      }      
    }    
    image.likes = [user_id];        
    return this.imageDocument.update(image);
  }

  deleteImage = (image: Image) : Promise<any> => {
    this.imagesCollection = this.afs.collection<Image>('images');
    return this.imagesCollection.doc(image.id).delete();    
  }

  /** User functions */

  addUser = (user: User ) : Promise<void> => {
    return this.afs.collection<User>('users').doc(user.id).set(user).then(() => {
      console.log('User add to document: ',user);
    });
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

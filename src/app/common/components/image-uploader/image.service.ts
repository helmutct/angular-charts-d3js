import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ImageService {

    constructor(private http: HttpClient) { }

    get(imageUrl: string): Observable<any> {
        return this.http
            .get(imageUrl, { responseType: 'blob' });
    }

    loadFileFromBlob(image: Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        return Observable.create(observer => {
            reader.onloadend = () => {
                observer.next(reader.result);
                observer.complete();
            };
        });
    }
}

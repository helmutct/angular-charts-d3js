import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { ImageService } from './image.service';

@Component({
    selector: 'cd-image-uploader',
    providers: [ImageService],
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnChanges {

    @Input() imageURL: string;
    @Output() onImageChanged = new EventEmitter();
    @Output() onImageError = new EventEmitter();

    public image: any;
    public imageBeforeValidation: any;

    constructor(private imageService: ImageService) { }

    ngOnChanges(...args: any[]) {
        if (this.imageURL != null && this.imageURL !== '') {
            if (this.image != null && this.image != '') {
                this.removeImage();
            }
            this.fileFromUrl();
        }
    }

    isValidExtension(filename: string) {
        
        let filenameArray = filename.split('.');
        let extension = filenameArray.length > 0? filenameArray[1]: "";

        let validExtenstions = [ 'jpg', 'jpeg', 'gif', 'png'];
        let isValid = validExtenstions.includes(extension);

        return isValid;
    }

    // From the internal button letting the user to pick another image
    fileChange(input) {
        if (input.files.length) {

            let file = input.files[0];
            
            this.resizeImage(file, 360, 360).then(blob => {

                if (file && file.type.match('image.*') && this.isValidExtension(file.name)) {
                    this.createImageFromBlob(blob, true);
                } else {
                    // Show invalid file format error message
                    this.onImageError.emit("O arquivo selecionado tem um formato inválido de imagem, são aceitos arquivos nas extensões jpg, jpeg, gif ou png. Verifique a integridade do seu arquivo e tente novamente.");
                }
            }, err => {
                console.error("Photo error", err);
            });            
        }
    }

    // from a external url
    fileFromUrl() {

        this.imageService.get(this.imageURL).subscribe(data => {
            this.createImageFromBlob(data, false);
        }, error => {
            this.onImageError.emit("Oops, houve um erro ao carregar sua imagem, você pode tentar novamente mais tarde.");
        });
    }

    createImageFromBlob(imageFile: Blob, upload: boolean) {

        this.imageBeforeValidation = this.image;

        this.imageService.loadFileFromBlob(imageFile).subscribe((fileReaderResult) => {

            this.image = fileReaderResult;

            if (upload) {
                this.onImageChanged.emit(imageFile);
            }
        });
    }

    removeImage(): void {
        this.onImageChanged.emit(null);
        this.image = '';
    }

    private resizeImage(file:File, maxWidth:number, maxHeight:number):Promise<Blob> {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                let width = image.width;
                let height = image.height;
                
                if (width <= maxWidth && height <= maxHeight) {
                    resolve(file);
                }
    
                let newWidth;
                let newHeight;
    
                if (width > height) {
                    newHeight = height * (maxWidth / width);
                    newWidth = maxWidth;
                } else {
                    newWidth = width * (maxHeight / height);
                    newHeight = maxHeight;
                }
    
                let canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
    
                let context = canvas.getContext('2d');
    
                context.drawImage(image, 0, 0, newWidth, newHeight);
    
                canvas.toBlob(resolve, file.type);
            };
            image.onerror = reject;
        });
    }
}
function findCurrentPhotoById(images, id) {
    for (let i = 0; i < images.length; i++) {
        if (images[i].id == id) {
            return images[i];
        }
    }
}

class Gallery {
    constructor() {
        this.images = [];
        this.currentPhotoId = 0;
        this.buildImagesArray();
        this.displayCurrentPhoto();
        this.setupClickListeners();
        this.selectedPhoto();
    }

    buildImagesArray() {
        for (let i = 0; i < 5; i++) {
            this.images.push({
                id: i,
                src: './images/photo' + i + '.jpg'
            });
        }
    }

    displayCurrentPhoto() {
        let currentArrayPhoto = findCurrentPhotoById(this.images, this.currentPhotoId);
        let $currentPhoto = document.getElementById('current-photo');
        $currentPhoto.src = currentArrayPhoto.src;
    }

    setupClickListeners() {
        let $previousButton = document.getElementById('previous-button');
        let $nextButton = document.getElementById('next-button');
        $previousButton.addEventListener('click', () => {
            this.clickHandler('prev');
            this.displayCurrentPhoto();
        });
        $nextButton.addEventListener('click', () => {
            this.clickHandler('next');
            this.displayCurrentPhoto();
        });
        let $photo = document.querySelector('#thumbs-gallery');
        $photo.addEventListener('click', (e) => {
            try {
                this.currentPhotoId = e.target.id;
                this.displayCurrentPhoto();
                this.selectedPhoto(this.currentPhotoId);
            }
            catch (error) {
                console.log('Nie wskazałeś obrazku: ', error.message);
            }
        })
    }

    clickHandler(value) {
        switch (value) {
            case 'next':
                if (this.currentPhotoId >= (this.images.length - 1)) {
                    this.currentPhotoId = 4;
                } else {
                    this.currentPhotoId++;
                }
                break;
            case 'prev':
                if (this.currentPhotoId <= 0) {
                    this.currentPhotoId = 0;
                } else {
                    this.currentPhotoId--;
                }
                break;
            default:
        }
        this.selectedPhoto(this.currentPhotoId);
    }

    selectedPhoto(id) {
        let $allPhotos = document.querySelectorAll('img');
        let $currentPhoto = $allPhotos.item(this.currentPhotoId);
        if (id == this.currentPhotoId) {
            $currentPhoto.className = 'currentphoto';
            console.log($currentPhoto);
            for(let i = 0; i != this.currentPhotoId; i++)
            {
                let $restOfPhoto = document.getElementById(i);
                $restOfPhoto.className = '';
            }
        }
    }

}

document.addEventListener('DOMContentLoaded', function () {
    let gallery = new Gallery();
});
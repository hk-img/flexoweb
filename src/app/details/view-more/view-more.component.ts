import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
// import { GlobalVariables } from '../global/global-variables';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'filters',
    templateUrl: './view-more.component.html',
    styleUrls: ['./view-more.component.css']
})

export class ViewMoreDialog implements OnInit {
    public ref;
    public images;
    public imageAlt;
    public id;
    public aws_base_url = "https://s3.ap-south-1.amazonaws.com/" + environment.s3_bucket_path + '/details_images/';

    constructor(
        public dialogRef: MatDialogRef<any>,
        public snackBar: MatSnackBar,

        // private _appGlobals: AppGlobals,
        // private loaderService: LoaderService

    ) { }
    @ViewChild('slickMainCarousel', { static: false }) slickMainCarousel: SlickCarouselComponent;
    public mainSliderConfig = {
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'arrows': false,
        'centerMode': true,
        "dots": true,
        'centerPadding': "0",
        'swipeToSlide': true,
        'infinite': true
    };


    onImageError(event: Event, imageAlt:string) {
        const target = event.target as HTMLImageElement;
        target.src = 'assets/images/details_placeholder_image.jpg';
        target.alt = `${imageAlt} details_placeholder_image.jpg`;
    }
    next() {
        this.slickMainCarousel.slickNext();
    }

    prev() {
        this.slickMainCarousel.slickPrev();
    }
    ngOnInit() {
        
        
    }
}
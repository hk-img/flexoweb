import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-list-with-us',
  templateUrl: './list-with-us.component.html',
  styleUrls: ['./list-with-us.component.css']
})
export class ListWithUsComponent implements OnInit {

  
  

  @ViewChild('spaceListSlider', { static: false })
  spaceListSlider: SlickCarouselComponent;
  public spaceListConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="slick-prev">></button>',
    nextArrow: '<button class="slick-next"><</button>',
    variableHeight: false,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  @ViewChild('successSlider', { static: false })
  successSlider: SlickCarouselComponent;
  public successConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableHeight: false,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: true,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  constructor(
    private metaService: Meta,
    private titleService: Title,
  ) { }

  public isMobile: boolean = false;
  public frame_height

  ngOnInit(): void {
    if (window.innerWidth < 700) {
      this.isMobile = true;
      this.frame_height = 300;
    } else {
      this.frame_height = 600;
    }
    this.titleService.setTitle(`List Your Space On Flexo and Grow Your Business`);
    this.metaService.updateTag(
      {
        name: 'description', content: `Listing is free. Get qualified leads and referrals. Increase occupancy levels and monetise unused space. `
      });
    this.metaService.updateTag({
      name: 'keywords', content: ``
    })
  }

}


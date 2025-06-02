import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-list-with-us',
  templateUrl: './list-with-us.component.html',
  styleUrls: ['./list-with-us.component.css']
})
export class ListWithUsComponent implements OnInit {

  
  faqs = [
    {
      question: 'What types of spaces can I list on Flexo?',
      answer: 'You can list coworking spaces, office spaces for lease, and short-term spaces such as meeting rooms, podcast studios, photo studios, and more that can be booked by the hour.',
    },
    {
      question: 'Is there a fee to list my space on Flexo?',
      answer: 'For coworking spaces: Standard listing is free, but you can opt for our premium subscription packages to enhance visibility and maximize leads. For short-term spaces: Listing is completely free, and Flexo charges a service fee based on successful bookings. For Office Spaces: Listing is free.',
    },
    {
      question: "How can I improve my listing’s visibility?",
      answer: "For coworking spaces, we offer premium subscription packages that provide enhanced visibility, priority placement, and additional benefits to attract more bookings. Standard listings are free, but premium plans help boost exposure. For office spaces for lease and short-term spaces, optimizing your listing with high-quality photos, detailed descriptions, and quick response times will help improve ranking.",
    },
    {
      question: 'Can I manage multiple spaces under one account?',
      answer: 'Yes! You can list and manage multiple spaces from a single account, making it easy to track all your bookings.',
    },
    {
      question: 'How does the booking process work?',
      answer: 'For short-term bookings, you can choose between two options: Request to Book – Users submit a request, and you can accept or decline it. Instant Book – Users can book and pay instantly, with no manual approval needed.',
    },
    {
      question: 'How will I be notified of new bookings?',
      answer: 'You’ll receive notifications via email and WhatsApp for new booking requests. If you don’t respond within a set time, reminders will be sent.',
    },
    {
      question: 'Can I set my own pricing and availability?',
      answer: 'Yes, you have full control over your pricing, availability, amenities, and any other inclusions or services.',
    },
    {
      question: 'How do I receive payments for bookings?',
      answer: 'For hourly bookings, payments are processed securely through our platform, and payouts are made directly to your bank account. For long-term leases, negotiations and payments happen offline.',
    },
    {
      question: 'Who do I contact for support?',
      answer: 'You can reach out to our support team via listings@flexospaces.com for any assistance regarding your listing, payments, or platform-related queries.',
    }
  ];

  @ViewChild('spaceListSlider', { static: false })
  spaceListSlider: SlickCarouselComponent;
  public spaceListConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="slick-prev"><</button>',
    nextArrow: '<button class="slick-next">></button>',
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
    dots: false,
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
  public hostWebUrl:any=environment.HOST_WEBLINK;

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


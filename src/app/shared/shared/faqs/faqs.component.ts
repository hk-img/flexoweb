import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpaceService } from 'src/app/services/space.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class FaqsComponent implements OnInit {
  @Input() faqs: Observable<any>;
  @Input() spaceType: '';
  @Input() cityName: '';
  @Input() location: '';
  shortQuestions: any[] = [];
  briefQuestions: any[] = [];
  @Input() showMap = false;
  data: any[] = [];
  public schema: any;
  constructor(private spaceService: SpaceService) { }

  ngOnInit() {
    this.spaceService.faqsSubject.subscribe((data) => {
      this.data = data;
      
      this.shortQuestions = this.data.filter((x) => x.type == 1);
      this.briefQuestions = this.data.filter((x) => x.type == 2);
    });
   /*  setTimeout(() => {
      if (this.data.length > 0) {
        this.schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `${this.data[0].question}`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `${this.data[0].answer}`
              }
            },
            {
              "@type": "Question",
              "name": `${this.data[1].question}`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `${this.data[1].answer}`
              }
            }
          ]
        }
      }
    }, 3000); */
  }
}

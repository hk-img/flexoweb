import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-list-with-us',
  templateUrl: './list-with-us.component.html',
  styleUrls: ['./list-with-us.component.css']
})
export class ListWithUsComponent implements OnInit {

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

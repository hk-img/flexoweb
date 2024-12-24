import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private metaService: Meta,
    private titleService: Title,
  ) { }

  public isMobile: boolean = false;
  public frame_height;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth < 700) {
        this.isMobile = true;
        this.frame_height = 300;
      } else {
        this.frame_height = 600;

      }
    }
    this.titleService.setTitle(`Flexo™ | Our Story`);
    this.metaService.updateTag(
      {
        name: 'description', content: ``
      });
    this.metaService.updateTag({
      name: 'keywords', content: ``
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-joy-of-giving',
  templateUrl: './joy-of-giving.component.html',
  styleUrls: ['./joy-of-giving.component.css']
})
export class JoyOfGivingComponent implements OnInit {

  constructor(
    private metaService: Meta,
    private titleService: Title,
  ) { }

  public isMobile: boolean = false;
  public frame_height;

  ngOnInit(): void {
    if (window.innerWidth < 700) {
      this.isMobile = true;
      this.frame_height = 300;
    } else {
      this.frame_height = 600;
    }
    this.titleService.setTitle(`Giving Is A New Way`);
    this.metaService.updateTag(
      {
        name: 'description', content: ``
      });
    this.metaService.updateTag({
      name: 'keywords', content: ``
    })
  }

}

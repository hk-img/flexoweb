import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  constructor(
    private metaService: Meta,
    private titleService: Title,
  ) { }

  public isMobile;
  ngOnInit(): void {
    if (window.innerWidth < 700) {
      this.isMobile = true;
    } else {
    }
    this.titleService.setTitle(`Get The Ideal Workspace Setup For Large Teams`);
    this.metaService.updateTag(
      {
        name: 'description', content: `Adapt to the new normal with cusomised space solutions, distributed offices, bespoke and managed office spaces.`
      });
    this.metaService.updateTag({
      name: 'keywords', content: ``
    })
  }

}

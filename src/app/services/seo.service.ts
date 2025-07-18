import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SEOService {
    constructor(private title: Title, @Inject(DOCUMENT) private dom: any) {
    }
    setPageTitle(title: string) {
        this.title.setTitle(title);
    }
    getPageTitle() {
        return this.title.getTitle();
    }
    createLinkForCanonicalURL() {
        let link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link.setAttribute('href', this.dom.URL.toLowerCase());
    }
} 
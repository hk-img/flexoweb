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
        let link: HTMLLinkElement = this.dom.querySelector("link[rel='canonical']");
        if (link) {
            link.setAttribute('href', window.location.href.toLowerCase());
        } else {
            link = this.dom.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', window.location.href.toLowerCase());
            this.dom.head.appendChild(link);
        }
    }
} 
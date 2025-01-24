import { Injectable } from '@angular/core';
import { defineOneEntry } from 'oneentry';
import { Link } from '../types/link.type';

const ONEENTRY_URL = 'https://linktree-angular-cms.oneentry.cloud';
const ONEENTRY_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGlua3RyZWUtYW5ndWxhci1jbXMiLCJzZXJpYWxOdW1iZXIiOjEsImlhdCI6MTczNzY4NjMzMSwiZXhwIjoxNzY5MjIyMzEzfQ.129k6BFW9rALUdKOEaAiXRojLSys9qfmOa8CKJ5cpCI';

let { Pages } = defineOneEntry(ONEENTRY_URL, {
  token: ONEENTRY_TOKEN,
  langCode: 'en_US',
});

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor() {}

  async getLinks(): Promise<Link[]> {
    try {
      const pages = await Pages.getPages();
      return pages.map((page: any) => {
        const pageExistsOutside = page.attributeValues?.['page-exists-outside']?.value === 1;
        const htmlContent = page.localizeInfos?.['htmlContent'] || '';
        const urlFormatted = htmlContent.replace(/^<p>|<\/p>$/g, '');
        const extractedUrl = urlFormatted.match(/https?:\/\/[^\s"<>]+/)?.[0] || '';

        return {
          title: page.localizeInfos?.['title'] || 'No Title',
          isVisible: page.isVisible ?? true,
          url: pageExistsOutside ? extractedUrl : page.pageUrl || '#',
        };
      });
    } catch (error) {
      console.error('Error when trying to get links from OneEntry:', error);
      return [];
    }
  }
}

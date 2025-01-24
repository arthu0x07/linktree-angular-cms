import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { Link } from '../../types/link.type';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent implements OnInit {
  links: Link[] = [];
  constructor(private linkService: LinkService) {}

  ngOnInit(): void {
    this.linkService.getLinks().then((links) => {
      this.links = links.filter((link) => link.isVisible);
    });
  }
}

import { Component } from '@angular/core';
import { LinksComponent } from '../../components/links/links.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LinksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

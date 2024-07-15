import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MovieService} from "./movie.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-app';
}

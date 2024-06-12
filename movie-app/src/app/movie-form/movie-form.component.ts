import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie.service";


@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss'
})
export class MovieFormComponent {
  movie: any = {};

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(id).subscribe(data => {
        this.movie = data;
      });
    }
  }

  saveMovie(): void {
    if (this.movie.id) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(() => {
        this.router.navigate(['/movies']).then(r => {});
      });
    } else {
      this.movieService.createMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies']).then(r => {});
      });
    }
  }
}

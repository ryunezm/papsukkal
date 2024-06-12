import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('id');
    if (typeof id === "string") {
      this.movieService.getMovieById(id).subscribe(data => {
        this.movie = data;
      })
    }
  }

  deleteMovie(): void{
    const id = this.movie.id;
    if (id){
      this.movieService.deleteMovie(id).subscribe(()=>{this.router.navigate(['/movies']).then(() => {})})
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {Genre, SubGenre} from '../enums/genre.enum';
import {Country} from '../enums/country.enum';
import {SubgenreValidatorService} from '../subgenre-validator.service';
import {NgForOf, NgIf} from "@angular/common";
import {Language} from '../enums/language.enum';


@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  movie: any = {
    genres: [],
    subgenres: [],
    countries: [],
    languages: [],
    personalRating: {}
  };

  genres = Object.values(Genre);
  subgenres = Object.values(SubGenre);
  countries = Object.values(Country);
  languages = Object.values(Language);
  filteredSubgenres: SubGenre[] = [];

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private router: Router,
              private subgenreValidatorService: SubgenreValidatorService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(id).subscribe(data => {
        this.movie = data;
        this.initializePersonalRating();
        this.onGenresChange();
      });
    } else {
      this.initializePersonalRating();
    }
  }

  saveMovie(): void {
    this.subgenreValidatorService.validateSubgenres(this.movie.subgenres, this.movie.genres);
    if (this.movie.id) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(() => {
        this.router.navigate(['/movies']).then(r => {console.log("nothing")});
      });
    } else {
      this.movieService.createMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies']).then(r => {console.log("nothing")});
      });
    }
  }

  onGenresChange(): void {
    if (this.movie.genres.length > 0) {
      this.filteredSubgenres = this.subgenres.filter(subgenre => {
        return this.movie.genres.some((genre: any) => this.subgenreValidatorService.getGenreFromSubgenre(subgenre) === genre);
      });
    } else {
      this.filteredSubgenres = [];
    }
  }

  onCheckboxChange(event: Event, type: string): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.movie[type].push(value);
    } else {
      const index = this.movie[type].indexOf(value);
      if (index !== -1) {
        this.movie[type].splice(index, 1);
      }
    }

    if (type === 'genres') {
      this.onGenresChange();
    }
  }

  validateNumberInput(event: KeyboardEvent): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  private initializePersonalRating(): void {
    if (!this.movie.personalRating) {
      this.movie.personalRating = {
        screenplay: 0,
        acting: 0,
        photography: 0,
        entertainment: 0,
        recommended: 0
      };
    }
  }
}

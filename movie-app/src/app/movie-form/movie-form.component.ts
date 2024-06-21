import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {Genre, SubGenre} from '../enums/genre.enum';
import {Country} from '../enums/country.enum';
import {SubgenreValidatorService} from '../subgenre-validator.service';
import {Language} from '../enums/language.enum';


@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  movie: any = {
    directedBy: [],
    directedByString: '',
    screenplayBy: [],
    screenplayByString: '',
    producedBy: [],
    producedByString: '',
    starring: [],
    starringString: '',
    cinematography: [],
    cinematographyString: '',
    editedBy: [],
    editedByString: '',
    musicBy: [],
    musicByString: '',
    productionCompany: [],
    productionCompanyString: '',
    genres: [],
    subgenres: [],
    countries: [],
    languages: [],
    personalRating: {
      screenplay: 0,
      acting: 0,
      photography: 0,
      entertainment: 0,
      recommended: 0
    }
  };

  @ViewChild('ngForm') form: NgForm | undefined;

  ratingOptions: number[] = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

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
        this.movie.directedByString = this.movie.directedBy.join(';');
        this.movie.screenplayByString = this.movie.screenplayBy.join(';');
        this.movie.producedByString = this.movie.producedBy.join(';');
        this.movie.starringString = this.movie.starring.join(';');
        this.movie.cinematographyString = this.movie.cinematography.join(';');
        this.movie.editedByString = this.movie.editedBy.join(';');
        this.movie.musicByString = this.movie.musicBy.join(';');
        this.movie.productionCompanyString = this.movie.productionCompany.join(';');
        this.initializePersonalRating();
        this.onGenresChange();
      });
    } else {
      this.initializePersonalRating();
    }
  }

  saveMovie(): void {
    this.subgenreValidatorService.validateSubgenres(this.movie.subgenres, this.movie.genres);
    this.movie.directedBy = this.movie.directedByString.split(';').map((item: string) => item.trim());

    const fieldsToSplit = [
      'directedBy',
      'screenplayBy',
      'producedBy',
      'starring',
      'cinematography',
      'editedBy',
      'musicBy',
      'productionCompany'
    ];

    fieldsToSplit.forEach(field => {
      this.movie[field] = Array.from(new Set((this.movie[`${field}String`] || '').split(';').map((item: string) => item.trim())));
    });

    if (this.movie.id) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(() => {
        this.router.navigate(['/movies']).then(r => {
        });
      });
    } else {
      this.movieService.createMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies']).then(r => {
        });
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

    console.log(`${type} current values:`, this.movie[type]);

    if (type === 'genres') {
      this.onGenresChange();
    }
  }

  onFieldChange(fieldName: string, value: any): void {
    const arrayValue = Array.from(new Set(value.split(';').map((item: string) => item.trim())));
    this.movie[fieldName.replace('String', '')] = arrayValue;
    console.log(`${fieldName} array:`, arrayValue);
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

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


  @ViewChild('ngForm', {static: false}) form!: NgForm; //TODO

  ratingOptions: number[] = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

  genres = Object.values(Genre);
  genreMap: { [key: string]: string } = {};
  subgenres = Object.values(SubGenre);
  subGenreMap: { [key: string]: string } = {};
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

    this.genreMap = this.createEnumMap(Genre);
    this.subGenreMap = this.createEnumMap(SubGenre);
    this.genres.sort();
    this.subgenres.sort();
  }

  saveMovie(): void {
    this.subgenreValidatorService.validateSubgenres(this.movie.subgenres, this.movie.genres);
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
      this.movie[field] = Array.from(new Set((this.movie[`${field}String`] || '')
        .split(';')
        .map((item: string) => item.trim())
        .sort()));
    });

    if (this.movie.id) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(() => {
        this.router.navigate(['/movies']).then(() => {
        });
      });
    } else {
      this.movieService.createMovie(this.movie).subscribe(() => {
        this.router.navigate(['/movies']).then(() => {
        });
      });
    }
  }

  onFieldChange(fieldName: string, value: any): void {
    // TODO
    // Now prints everything as array, so it must be fixed this in future.
    const arrayValue = Array.from(new Set(value.split(';').map((item: string) => item.trim()).sort()));
    this.movie[fieldName.replace('String', '')] = arrayValue;
    console.log(`${fieldName} array:`, arrayValue);
  }

  onCheckboxChange(event: Event, type: string): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    const transformedValue = (type === 'genres' ? this.genreMap[value] : this.subGenreMap[value]) || value;

    if (checkbox.checked) {
      this.movie[type].push(transformedValue);
    } else {
      const index = this.movie[type].indexOf(transformedValue);
      if (index !== -1) {
        this.movie[type].splice(index, 1);
      }
    }

    this.movie[type] = this.movie[type].sort();

    console.log(`${type} current values:`, this.movie[type]);

    if (type === 'genres') {
      this.onGenresChange();
      this.removeInvalidSubgenres();
    }
  }

  onGenresChange(): void {
    if (this.movie.genres.length > 0) {
      const inverseGenreMap = Object.fromEntries(Object.entries(this.genreMap).map(([key, value]) => [value, key]));

      this.filteredSubgenres = this.subgenres.filter(subgenre => {
        const genre = this.subgenreValidatorService.getGenreFromSubgenre(subgenre);
        return this.movie.genres.some((selectedGenre: string) => inverseGenreMap[selectedGenre] === genre);
      });
    } else {
      this.filteredSubgenres = [];
    }
    this.subgenres.sort();
  }

  validateNumberInput(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || event.key === 'Delete') {
      return;
    }

    if (event.target instanceof HTMLInputElement) {
      const inputValue = event.target.value;
      if (inputValue === '' && event.key === '0') {
        event.preventDefault();
        return;
      }
      if (inputValue === '' && !(/[1-9]/.test(event.key))) {
        event.preventDefault();
        return;
      }
      if (inputValue.length > 0 && !(/[0-9]/.test(event.key))) {
        event.preventDefault();
        return;
      }
    }
  }

  private removeInvalidSubgenres(): void {
    const inverseGenreMap = Object.fromEntries(Object.entries(this.genreMap).map(([key, value]) => [value, key]));

    const validSubgenres = this.subgenres.filter(subgenre => {
      const genre = this.subgenreValidatorService.getGenreFromSubgenre(subgenre);
      return this.movie.genres.some((selectedGenre: string) => inverseGenreMap[selectedGenre] === genre);
    });

    this.movie.subgenres = this.movie.subgenres.filter((subgenre: SubGenre) => validSubgenres.includes(subgenre));
  }


  private createEnumMap(enumObject: object): { [key: string]: string } {
    const enumMap: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(enumObject)) {
      enumMap[value as string] = key;
    }

    return enumMap;
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

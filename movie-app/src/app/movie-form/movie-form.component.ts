import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {Genre, Subgenre} from '../enums/genre.enum';
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
  subgenres = Object.values(Subgenre);
  subgenreMap: { [key: string]: string } = {};
  countries = Object.values(Country);
  languages = Object.values(Language);

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private router: Router,
              private subgenreValidatorService: SubgenreValidatorService) { }

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
    this.subgenreMap = this.createEnumMap(Subgenre);
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
    let transformedValue: string;

    if (type === 'genres') {
      transformedValue = this.genreMap[value] || value;
      if (checkbox.checked) {
        this.movie[type].push(transformedValue);
      } else {
        const index = this.movie[type].indexOf(transformedValue);
        if (index !== -1) {
          this.movie[type].splice(index, 1);
        }
        // Remove subgenres associated with the unchecked genre
        this.movie.subgenres = this.movie.subgenres.filter((subgenre: Subgenre) => {
          try {
            const parentGenre = this.subgenreValidatorService.getGenreFromSubgenre(subgenre);
            return parentGenre !== transformedValue;
          } catch (error) {
            console.error('Error getting parent genre for subgenre:', subgenre, error);
            return false;
          }
        });
      }
    } else { // subgenres
      transformedValue = this.subgenreMap[value] || value;
      if (checkbox.checked && this.isSubgenreEnabled(transformedValue as Subgenre)) {
        this.movie[type].push(transformedValue);
      } else {
        const index = this.movie[type].indexOf(transformedValue);
        if (index !== -1) {
          this.movie[type].splice(index, 1);
        }
      }
    }

    this.movie[type] = this.movie[type].sort();

    console.log(`${type} current values:`, this.movie[type]);

    if (type === 'genres') {
      this.onGenresChange();
    }
  }

  onGenresChange(): void {
    if (this.movie.genres.length > 0) {
      this.movie.subgenres = this.movie.subgenres.filter((subgenre: Subgenre) => {
        return this.isSubgenreEnabled(subgenre);
      });
    } else {
      this.movie.subgenres = [];
    }

    this.movie.subgenres = [...new Set(this.movie.subgenres)];
    this.subgenres.sort();
  }

  isSubgenreEnabled(subgenre: Subgenre): boolean {
    const parentGenre = this.subgenreValidatorService.getGenreFromSubgenre(subgenre);
    return this.movie.genres.includes(parentGenre);
  }

  getAvailableSubgenres(): Subgenre[] {
    return this.movie.genres.flatMap((genreString: string) => {
      const genre = this.getGenreFromString(genreString);
      return this.subgenreValidatorService.getSubgenresForGenre(genre);
    });
  }

  private getGenreFromString(genreString: string): Genre {
    for (const [key, value] of Object.entries(this.genreMap)) {
      if (value === genreString) {
        return key as Genre;
      }
    }
    throw new Error(`Invalid genre string: ${genreString}`);
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

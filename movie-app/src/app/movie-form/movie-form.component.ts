import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {Genre, Subgenre} from '../enums/genre.enum';
import {Country} from '../enums/country.enum';
import {SubgenreValidatorService} from '../subgenre-validator.service';
import {Language} from '../enums/language.enum';
import {NgClass} from "@angular/common";
import {ToastrService} from "ngx-toastr";


@Component({
    selector: 'app-movie-form',
    imports: [
        FormsModule,
        NgClass,
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

  @ViewChild('ngForm') ngForm!: NgForm;
  ratingOptions: number[] = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10];

  genres = Object.entries(Genre);
  subgenres = Object.entries(Subgenre);
  countries = Object.entries(Country);
  languages = Object.entries(Language);
  availableSubgenres = Object.entries((this.getAvailableSubgenresObject(this.movie.genres)));
  filteredCountries: any[] = [];
  filteredLanguages: any[] = [];

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private router: Router,
              private subgenreValidatorService: SubgenreValidatorService,
              private toast: ToastrService) {
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
    } else { this.initializePersonalRating(); }

    this.genres.sort();
    this.subgenres.sort();
    this.availableSubgenres.sort();
    this.filteredCountries = [...this.countries];
    this.filteredLanguages = [...this.languages];
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
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe({
        next:() => {
          this.toast.success("Movie successfully updated", "Success");
          this.router.navigate(['/movies']).then(() => {});
        },
         error:() => {
          this.toast.error("Error updating the movie", "Error")
         }
      });
    } else {
      this.movieService.createMovie(this.movie).subscribe({
        next: () => {
          this.toast.success("Movie successfully created","Success");
          this.router.navigate(['/movies']).then(() => {});
        },
        error: () => {
          this.toast.error("Error creating the movie", "Error")
        }
      });
    }

    console.log('Form validity:', this.ngForm.form.valid);
    console.log('Form values:', this.ngForm.form.value);
    console.log('Form errors:', this.ngForm.form.errors);
  }

  onCheckboxChange(event: Event, type: string): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (!this.movie[type]) { this.movie[type] = []; }

    if (type === 'genres') {
      if (checkbox.checked) {
        this.movie[type].push(value);
      } else {
        const index = this.movie[type].indexOf(value);
        if (index !== -1) {
          this.movie[type].splice(index, 1);
        }
        // Remove subgenres associated with the unchecked genre
        this.movie.subgenres = this.movie.subgenres.filter((subgenre: Subgenre) => {
          try {
            const parentGenre = this.subgenreValidatorService.getGenreFromSubgenre(subgenre);
            return parentGenre !== value;
          } catch (error) {
            console.error('Error getting parent genre for subgenre:', subgenre, error);
            return false;
          }
        });
      }
    } else if (type === 'subgenres') {
      if (checkbox.checked && this.isSubgenreEnabled(value as Subgenre)) {
        this.movie[type].push(value);
      } else {
        const index = this.movie[type].indexOf(value);
        if (index !== -1) {
          this.movie[type].splice(index, 1);
        }
      }
    } else {
      if (checkbox.checked) {
        this.movie[type].push(value);
      } else {
        const index = this.movie[type].indexOf(value);
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
    this.availableSubgenres = Object.entries((this.getAvailableSubgenresObject(this.movie.genres)));
  }

  isSubgenreEnabled(subgenre: Subgenre): boolean {
    const parentGenre = this.subgenreValidatorService.getGenreFromSubgenre(subgenre);
    const parentGenreKey = Object.entries(Genre).find(([, value]) => value === parentGenre)?.[0];
    return this.movie.genres.includes(parentGenreKey);
  }

  getAvailableSubgenresObject(genres: string[]): { [key: string]: Subgenre } {
    return this.subgenreValidatorService.getAvailableSubgenresObject(genres);
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

  onSearchChange(event: Event, type: 'country' | 'language'): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();

    if (type === 'country') {
      this.filteredCountries = this.countries.filter(([, value]) =>
        value.toLowerCase().includes(searchValue)
      );
    } else {
      this.filteredLanguages = this.languages.filter(([, value]) =>
        value.toLowerCase().includes(searchValue)
      );
    }
  }
}

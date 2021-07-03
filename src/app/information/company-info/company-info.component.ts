import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InformationService } from '../information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
})
export class CompanyInfoComponent implements OnInit {
  companyInfoForm: FormGroup;
  autocompleteItems: any[];
  GoogleAutocomplete: google.maps.places.AutocompleteService;

  constructor(
    private informationService: InformationService,
    private router: Router,
    public zone: NgZone
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
  }

  ngOnInit(): void {
    const {
      companyName = '',
      department = '',
      street = '',
      city = '',
      zip = '',
      website = '',
    } = this.informationService.getCompanyInformation() || {};
    this.companyInfoForm = new FormGroup({
      companyName: new FormControl(companyName, Validators.required),
      department: new FormControl(department),
      street: new FormControl(street),
      city: new FormControl(city),
      zip: new FormControl(zip),
      website: new FormControl(website),
    });
    this.companyName.valueChanges.subscribe((value) => {
      const index = this.autocompleteItems.findIndex(
        (item) => item.description === value
      );
      if (
        index > -1 &&
        this.autocompleteItems[index].place_id &&
        this.autocompleteItems[index].terms &&
        this.autocompleteItems[index].terms[0] &&
        this.autocompleteItems[index].terms[0].value
      ) {
        this.selectSearchResult(this.autocompleteItems[index].place_id);
        this.companyName.setValue(
          this.autocompleteItems[index].terms[0].value,
          { emitEvent: false }
        );
        this.autocompleteItems = [];
      } else if(value) {
        this.updateSearchResults(value);
      }
    });
  }

  get companyName() {
    return this.companyInfoForm.get('companyName');
  }

  selectSearchResult(placeId) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (
        status == google.maps.GeocoderStatus.OK &&
        results[0] &&
        results[0].address_components
      ) {
        const address = this.getAddressObject(results[0].address_components);
        this.companyInfoForm
          .get('street')
          .setValue(address.street + ' ' + address.home);
        this.companyInfoForm.get('city').setValue(address.city);
        this.companyInfoForm.get('zip').setValue(address.postal_code);
      }
    });
  }

  getAddressObject(address_components) {
    var ShouldBeComponent = {
      home: ['street_number'],
      postal_code: ['postal_code'],
      street: ['street_address', 'route'],
      region: [
        'administrative_area_level_1',
        'administrative_area_level_2',
        'administrative_area_level_3',
        'administrative_area_level_4',
        'administrative_area_level_5',
      ],
      city: [
        'locality',
        'postal_town',
        'sublocality',
        'sublocality_level_1',
        'sublocality_level_2',
        'sublocality_level_3',
        'sublocality_level_4',
      ],
      country: ['country'],
    };

    var address = {
      home: '',
      postal_code: '',
      street: '',
      region: '',
      city: '',
      country: '',
    };
    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === 'country') {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });
    return address;
  }

  updateSearchResults(input: string) {
    if (input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: ['SE'] },
        types: ['establishment'], //  / 'address' / 'geocode'
      },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  onSubmit() {
    if (this.companyInfoForm.invalid) {
      Object.keys(this.companyInfoForm.controls).forEach((field) => {
        const control = this.companyInfoForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    } else {
      this.informationService.setCompanyInformation({
        companyName: this.companyInfoForm.value.companyName,
        department: this.companyInfoForm.value.department
          ? this.companyInfoForm.value.department
          : null,
        street: this.companyInfoForm.value.street
          ? this.companyInfoForm.value.street
          : null,
        city: this.companyInfoForm.value.city
          ? this.companyInfoForm.value.city
          : null,
        zip: this.companyInfoForm.value.zip
          ? this.companyInfoForm.value.zip
          : null,
        website: this.companyInfoForm.value.website
          ? this.companyInfoForm.value.website
          : null,
      });
      this.router.navigateByUrl('/information/add-files');
    }
  }

  onClear(){
    this.companyInfoForm.reset();
  }

};

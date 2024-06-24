import { Component, OnInit } from '@angular/core';
import { UserPetInfoServiceService } from '../../Services/user-pet-info-service.service';
import { UserPetInfo } from '../../Models/user-pet-info';
import { AddPet } from '../../Models/add-pet';
import { InputSectionComponent } from "../../Components/input-section/input-section.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breed } from '../../Models/breed';
import { AddPetService } from '../../Services/add-pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PetBreed } from '../../Models/pet-breed';
import { EditPet } from '../../Models/edit-pet';

@Component({
    selector: 'app-user-pet-info-edit',
    standalone: true,
    templateUrl: './user-pet-info-edit.component.html',
    styleUrl: './user-pet-info-edit.component.css',
    imports: [InputSectionComponent, FormsModule, CommonModule]
})
export class UserPetInfoEditComponent implements OnInit {
    constructor(public userPetInfoService: UserPetInfoServiceService,
                public addPet: AddPetService,
                public activatedRoute: ActivatedRoute,
                public route: Router) { }

    breedList: Breed[] = []
    editedUserPetInfo: EditPet = new EditPet(0,"", null, 0, "", null, 0, false, "", "");
    petBreedID: PetBreed = new PetBreed(0, 0);
    petID: number = 0;
    url:string='https://localhost:7066/Resources/'

    validationErrorsForPet: { [key in keyof EditPet]?: boolean | string | null } = {};
    validationErrorsForBreedPet: { [key in keyof PetBreed]?: boolean | string | null } = {};

    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (d) => {
                console.log(d['id']);
                this.addPet.getPetBreed(d['id']).subscribe({
                    next: (PetBreed) => {
                        this.petBreedID = PetBreed;
                        console.log(this.petBreedID);
                    }
                });
            }
        });

        this.activatedRoute.params.subscribe({
            next: (d) => {
                this.petID = d['id'];
                this.userPetInfoService.getPetById(this.petID).subscribe({
                    next: (d) => {
                        this.editedUserPetInfo.PetID=this.petID;
                        this.editedUserPetInfo = d;
                        this.editedUserPetInfo.photo=this.url+d.photo;
                        const photoPreview = document.getElementById('photoPreview') as HTMLImageElement;
                        photoPreview.src = this.editedUserPetInfo.photo;
                        this.editedUserPetInfo.idNoteBookImage=this.url+d.idNoteBookImage;
                        console.log(d);
                    }
                });
            }
        });

        this.addPet.getBreed().subscribe({
            next: (response) => {
                this.breedList = response;
                console.log(this.breedList);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    triggerFileInput() {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.editedUserPetInfo.photo = file;
            this.validationErrorsForPet.photo = false;
            this.previewImage(file);
        }
    }

    previewImage(file: File) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const photoPreview = document.getElementById('photoPreview') as HTMLImageElement;
            photoPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    onFileSelectedBookImage(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.editedUserPetInfo.idNoteBookImage = file;
            this.validationErrorsForPet.idNoteBookImage = false;
        }
    }

    isFormValid(): boolean {
        let isValid = true;
    
        for (const key in this.editedUserPetInfo) {
          if (this.editedUserPetInfo.hasOwnProperty(key)) {
            const fieldPet = key as keyof EditPet;
            if (!this.editedUserPetInfo[fieldPet]) {
              this.validationErrorsForPet[fieldPet] = true;
              isValid = false;
            } else {
              this.validationErrorsForPet[fieldPet] = false;
            }
          }
        }
        
        for (const key in this.petBreedID) {
          if (this.petBreedID.hasOwnProperty(key)) {
            const fieldBreedPet = key as keyof PetBreed;
            if (!this.petBreedID[fieldBreedPet] && fieldBreedPet != "PetID") {
              this.validationErrorsForBreedPet[fieldBreedPet] = true;
              isValid = false;
            } else {
              this.validationErrorsForBreedPet[fieldBreedPet] = false;
            }
          }
        }
    
        return isValid;
    }

    SaveEdit() {
        if(this.isFormValid()){
            this.userPetInfoService.editUserPet(this.editedUserPetInfo ,this.petID).subscribe({ 
                next: (d) => { console.log(d);
                this.route.navigateByUrl("userPetInfo");
                }
            });
        }
    }

    onInputValueChangeForPet(event: { field: keyof EditPet, value: any }) {
        const { field, value } = event;
        if (field in this.editedUserPetInfo) {
          (this.editedUserPetInfo as any)[field] = value;
          if (value) {
            this.validationErrorsForPet[field] = false;
          }
        }
    }
    
    onInputValueChangeForBreedPet(event: { field: keyof PetBreed, value: any }) {
        const { field, value } = event;
        if(this.petBreedID !== null){
            if (field in this.petBreedID) {
                (this.petBreedID as any)[field] = value;
                if (value) {
                    this.validationErrorsForBreedPet[field] = false;
                }
            }
        }
    }
    
    onSexChange(event: any) {
        const selectedValue = event.target.value;
        // Assuming you have validation logic, update validationErrors object accordingly
        this.validationErrorsForPet.sex = selectedValue ? null : 'Gender is required.';
    }
    
    onTypeChange(event: any) {
        const selectedValue = event.target.value;
        // Assuming you have validation logic, update validationErrors object accordingly
        this.validationErrorsForPet.type = selectedValue ? null : 'Type is required.';
    }
    
    onTBreedChange(event: any) {
        const selectedValue = event.target.value;
        // Assuming you have validation logic, update validationErrors object accordingly
        this.validationErrorsForBreedPet.BreedID = selectedValue ? null : 'Breed is required.';
    }
    
    onReadyForBreedChange(event: any) {
        const selectedValue = event.target.value;
        // Assuming you have validation logic, update validationErrors object accordingly
        this.validationErrorsForPet.readyForBreeding = selectedValue ? null : 'Is Ready for breeding is required.';
    }

    Cancel(){
        this.route.navigateByUrl("/userPetInfo");
    }
}



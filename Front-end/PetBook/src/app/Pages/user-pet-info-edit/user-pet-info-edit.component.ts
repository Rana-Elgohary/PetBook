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
    petBreedID: PetBreed | null = null;
    petID: number = 0;
    photoPreview: string | ArrayBuffer | null |undefined= null; // For previewing the uploaded photo
    bookImagePreview: string | ArrayBuffer | null |undefined= null; // For previewing the uploaded book ID image
    url:string='https://localhost:7066/Resources/'

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
                        this.editedUserPetInfo.photo=this.url+d.photo
                        this.editedUserPetInfo.idNoteBookImage=this.url+d.idNoteBookImage
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

    onFileSelected(event: any) {
        const file = event.target.files[0];
        this.editedUserPetInfo.photo = file;
        // Create a preview URL for the uploaded image
        const reader = new FileReader();
        reader.onload = (e) => {
            this.photoPreview = e.target?.result;
            
        };
        reader.readAsDataURL(file);
    }

    onFileSelectedBookImage(event: any) {
        const file = event.target.files[0];
        this.editedUserPetInfo.idNoteBookImage = file;

        // Create a preview URL for the uploaded book ID image
        const reader = new FileReader();
        reader.onload = (e) => {
            this.bookImagePreview = e.target?.result;
        };
        reader.readAsDataURL(file);
    }
    

    SaveEdit() {
        this.userPetInfoService.editUserPet(this.editedUserPetInfo ,this.petID).subscribe({ 
            next: (d) => { console.log(d);
            this.route.navigateByUrl("userPetInfo");
            }
        });
    }
}



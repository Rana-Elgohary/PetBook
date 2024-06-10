export class AddPet {
    constructor(
    public  name: string,
    public photo: File|null,
    public ageInMonth: number,
    public  sex: string,
    public  idNoteBookImage: File|null,
    public  userID: number,
    public  readyForBreeding: boolean,
    public  type: string,
    public other: string){}    
}
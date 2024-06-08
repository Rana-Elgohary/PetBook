export class UserPetInfo {
    constructor(
       public Name: string,
       public Photo: string,
       public AgeInMonth: number,
       public Sex: string,
       public IdNoteBookImage: string,
       public ReadyForBreeding: boolean,
       public Type: string,
       public Other: string
    ){};
}

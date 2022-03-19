import Character1 from '../assets/images/character1.jpg';
import Character2 from '../assets/images/character2.jpg';
import Character3 from '../assets/images/character3.jpg';


export interface Character {
    name: string;
    imageUrl: string;
    value: string
}


export const characters: Character[] = [
    {imageUrl: Character1, name: 'Calvary', value: "C"},
    {imageUrl: Character2, name: 'Archers', value: "A"},
    {imageUrl: Character3, name: 'Pikemen', value: 'P'},
]

export module Film {
    export interface IFilm {
        name: string
    }

    export class Film implements IFilm {
        constructor(public name: string) {
        }
    }
}
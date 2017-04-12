import { Product } from './product';
import { ProductService } from '../services/dataAccessService'

export module app.MovieListCtrl {

    export interface IMovieListModel {
        title: string;
        person: any[];
        // showImage: boolean;
        // toggleImage(): void;
        service: any;
        getCharactersInfo(characterUrl: string): any[];
    }


    export default class MovieListCtrl implements IMovieListModel {
        title: string;
        products: Product.IProduct[];
        person: any[];
        renderedCharacters: any[];
        favoriteCharacters: any[];
        leastFavoriteCharacters: any[];
        service: any;
        characters: string[];
        selected: string[]

        constructor(service: ProductService) {

            this.title = "Boom"
            this.service = service;
            const that = this;
            this.person;
            this.characters = [];
            this.renderedCharacters = [];
            let selected: string[];

            //this.products = service.listProducts(1)
            service.listProducts(1).then((person: any) => {
                this.person = person.films;
                this.getFilmCharacters(this.person);
                this.chunkFilms(this.person);
                this.favoriteCharacters = this.renderedCharacters;
            });
            // [
            //     {
            //         "productId": 1,
            //         "productName": "Leaf Rake",
            //         "productCode": "GDN-0011",
            //         "releaseDate": new Date(2009, 2, 19),
            //         "description": "Leaf rake with 48-inch wooden handle.",
            //         "price": 19.95,
            //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            //     },
            //     {
            //         "productId": 1,
            //         "productName": "Leaf Rake",
            //         "productCode": "GDN-0011",
            //         "releaseDate": new Date(2009, 2, 19),
            //         "description": "Leaf rake with 48-inch wooden handle.",
            //         "price": 19.95,
            //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            //     },
            //     {
            //         "productId": 1,
            //         "productName": "Leaf Rake",
            //         "productCode": "GDN-0011",
            //         "releaseDate": new Date(2009, 2, 19),
            //         "description": "Leaf rake with 48-inch wooden handle.",
            //         "price": 19.95,
            //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            //     }

            // ];

            //var prod = new Product.Product(1,"adsf","asdf", new Date(2002, 2,2), 123, "adsf","http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png" )
            //this.products.push(prod);
        }
        chunkFilms(films: any) {
            var i, j, temparray, chunk = 2;
            for (let i = 0, j = films.length; i < j; i += chunk) {
                temparray = films.slice(i, i + chunk);
                this.renderedCharacters.push(temparray);
            }
        }
        renderFavoriteCharacter() {
            this.renderedCharacters = [];
            this.renderedCharacters = this.favoriteCharacters;
        }
        renderLeastFavoriteCharacter() {
            this.renderedCharacters = [];
            if (this.leastFavoriteCharacters) {
                console.log('Already cached. least fcs no need to make new api request');
                this.renderedCharacters = this.leastFavoriteCharacters;
            } else {
                this.service.listProducts(2).then((person: any) => {
                    this.person = person.films;
                    this.getFilmCharacters(this.person);
                    this.chunkFilms(this.person);
                    this.leastFavoriteCharacters = this.renderedCharacters;
                    console.log(this.leastFavoriteCharacters, 'least fav.......');
                });
            }
        }
        getFilmCharacters(films: any) {
            films.map((film: any) => {
                let characters = film.characters;
                film.charactersInfo = [];
                for (let i = 0; i < 3; i++) {
                    let randomCharacter = characters[Math.floor(Math.random() * characters.length)]
                    let res = this.getCharactersInfo(randomCharacter);
                    res.then((data: any) => {
                        film.charactersInfo.push(data.name);
                    })
                }
            })
        }
        getCharactersInfo(characterUrl: string) {
            let newCharactersInfo: Array<string> = [];
            return this.service.callApi(characterUrl)
                .then((data: any) => data);
        }
        logItem(param: any) {
            console.log(param, '...')
        }

        // toggleImage(): void{
        //     this.showImage = !this.showImage;
        // }

    }
    //HomeController.$inject = ['$timeout', 'bookShelfSvc'];
    MovieListCtrl.$inject = ['ProductService'];

    angular
        .module('starwarsApp')
        .controller('MovieListCtrl', MovieListCtrl)

}

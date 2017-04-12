import { Product } from './product';
import { ProductService } from '../services/dataAccessService'

export module app.MovieListCtrl {
    
    export interface IMovieListModel {
        title: string;
        person: any[];
        // showImage: boolean;
        // toggleImage(): void;
        service : any;
        getCharactersInfo(characterUrl: string): any[];
    }
    

    export default class MovieListCtrl implements IMovieListModel {
        title: string;
        products: Product.IProduct[];
        person: any[] ;
        service: any;
        characters: string[];
        selected: string[]

        constructor(service : ProductService){

            this.title = "Boom"
            this.service = service;
            const that = this;
            this.person;
            this.characters = [];
            let selected: string[];

            //this.products = service.listProducts(1)
            service.listProducts(1).then((person: any) => {
                this.person = person;
                let mainCharacters = person.films[0].characters;
                person.films.map((film: any) => {
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
        getCharactersInfo(characterUrl: string){
            let newCharactersInfo: Array<string> = [];
            return this.service.callApi(characterUrl)
                .then((data: any) => data);
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

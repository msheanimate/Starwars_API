import { Product } from './product';
import { ProductService } from '../services/dataAccessService'

export module app.ProductListCtrl {
    
    export interface IProducListModel {
        title: string;
        showImage: boolean;
        products: Product.IProduct[];
        toggleImage(): void;
        service : any;

        getCharactersInfo(characters: any[]): any[];
    }
    

    export default class ProductListCtrl implements IProducListModel {
        title: string;
        products: Product.IProduct[];
        person ;
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
            service.listProducts(1).then(person => {
                this.person = person;
                let mainCharacters = person.films[0].characters;
                person.films.map(film => {
                    let characters = film.characters;
                    film.charactersInfo = [];
                    for (let i = 0; i < 3; i++) {
                        let randomCharacter = characters[Math.floor(Math.random() * characters.length)]
                        let res = this.getCharactersInfo(randomCharacter);
                        res.then(data => {
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
                .then(data => data);
        }

        toggleImage(): void{
            this.showImage = !this.showImage;
        }

    }
    //HomeController.$inject = ['$timeout', 'bookShelfSvc'];
    ProductListCtrl.$inject = ['ProductService'];

    angular
        .module('starwarsApp')
        .controller('ProductListCtrl', ProductListCtrl)

}

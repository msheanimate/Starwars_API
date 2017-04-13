
import { DataService } from '../services/dataAccessService'
import { graphOptions } from './graphOptions'

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
        person: any[];
        data: any;
        options: any;
        renderedCharacters: any[];
        favoriteCharacters: any[];
        leastFavoriteCharacters: any[];
        service: any;
        characters: string[];
        selected: string[]

        constructor(service: DataService) {

            this.title = "Boom"
            this.service = service;
            const that = this;
            this.person;
            this.characters = [];
            this.renderedCharacters = [];
            let selected: string[];
            this.options = graphOptions;


            this.data = [{
                key: "Cumulative Return",
                values: []
            }];

            service.listData(1).then((person: any) => {
                this.person = person.films;
                this.getFilmCharacters(this.person);
                this.chunkFilms(this.person);
                this.favoriteCharacters = this.renderedCharacters;
                this.updateGraph();
            });

        }
        chunkFilms(films: any) {
            var i, j, temparray, chunk = 2;
            for (let i = 0, j = films.length; i < j; i += chunk) {
                temparray = films.slice(i, i + chunk);
                this.renderedCharacters.push(temparray);
            }
        }
        renderFavoriteCharacter() {
            console.log("this.renderedCharacters")
            this.renderedCharacters = [];
            this.renderedCharacters = this.favoriteCharacters;
            this.updateGraph();
        }
        renderLeastFavoriteCharacter() {
            
            this.renderedCharacters = [];
            if (this.leastFavoriteCharacters) {
                this.renderedCharacters = this.leastFavoriteCharacters;
                this.updateGraph();
            } else {
                this.renderedCharacters = [];
                this.service.listData(2).then((person: any) => {
                    this.person = person.films;
                    this.getFilmCharacters(this.person);
                    this.chunkFilms(this.person);
                    this.leastFavoriteCharacters = this.renderedCharacters;
                    this.updateGraph();
                });
            }
        }
        updateGraph() {
            let flattened: Array<any> = [];
            this.renderedCharacters.map((chunk: any) => {
                chunk.map((item: any) => {
                    flattened.push(item);
                })
            });

            flattened.map((item: any) => {
                this.data[0].values.push({
                    "label": item.title,
                    "value": item.opening_crawl.length
                });
            });
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
            //console.log(param, '...')
        }

        // toggleImage(): void{
        //     this.showImage = !this.showImage;
        // }

    }
    //HomeController.$inject = ['$timeout', 'bookShelfSvc'];
    MovieListCtrl.$inject = ['DataService'];

    angular
        .module('starwarsApp')
        .controller('MovieListCtrl', MovieListCtrl)

}

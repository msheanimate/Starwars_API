export class ProductService {

  constructor(private $http: ng.IHttpService) {
    console.log(`CommentsService register`);
  }


    listProducts(person:number) {
        
         return this.callApi('http://swapi.co/api/people/'+ person + '/')
          .then((person: any) => {
            return Promise.all(person.films.map((filmUrl: string) => this.callApi(filmUrl)))
              .then((films: any) => ({...person, films: films}))
          })
    }

    callApi(url:string){
      return this.$http.get(url)
          .then(response => response.data)
          .then(data => data);
    }



}
    angular
        .module('starwarsApp')
        .service('ProductService', ProductService)
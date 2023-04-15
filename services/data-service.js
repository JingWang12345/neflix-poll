class DataService{

    static getSeries(){
        return fetch('https://6436ba0b3e4d2b4a12da1343.mockapi.io/series')
        .then(resp => resp.json())
    }

    static putSerie(serie){

    }


}
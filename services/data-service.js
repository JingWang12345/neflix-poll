class DataService{
    static DATA_URL = 'https://6436ba0b3e4d2b4a12da1343.mockapi.io/series'
    static getSeries(){
        return fetch(this.DATA_URL).then(resp => resp.json())
    }

    static putSerie(serie){
        return fetch(this.DATA_URL+'/'+serie.id,{method:'PUT', headers:{'content-type':'application/json'},body:JSON.stringify(serie)}).then(resp => resp.json())
    }

    static postSerie(serie){
        const jsonSerie = JSON.stringify(serie);
        return fetch(this.DATA_URL,{method:'POST', headers:{'content-type':'application/json'},body:jsonSerie}).then(resp => resp.json())
    }
}
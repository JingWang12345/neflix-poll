class Collection{


    constructor(title, series = []){
        this.title = title;
        this.series = series;
    }
    addSerie(serie) {
        this.series.push(serie);
    }

}
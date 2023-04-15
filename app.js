let netflixSeries = new Collection();

displaySeries();
DataService.getSeries().then(data => {
    fillSeriesArrayFromServer(data);
    displaySeries();
})

function fillSeriesArrayFromServer(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const serie = new Serie(element.title, element.creator, element.seasons, element.isCompleted, element.upVotes, elemrnt.downVotes, element.id);
        netflixSeries.addSeries(series)
    }
}
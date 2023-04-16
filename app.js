let netflixSeries = new Collection('which serie do you like?');

displaySeries();

DataService.getSeries().then(data => {
    fillSeriesArrayFromServer(data);
    displaySeries();
})


function fillSeriesArrayFromServer(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const serie = new Serie(element.title, element.creator, element.seasons, element.isCompleted, element.upVotes, element.downVotes, element.id);
        netflixSeries.addSerie(serie)
    }
}


function displaySeries() {
    const seriesTitle = document.getElementById('list-name');
    const seriesUl = document.getElementById('series-list');


    const titleNode = document.createTextNode(netflixSeries.title);
    seriesTitle.innerHTML = '';
    seriesTitle.appendChild(titleNode);
    seriesUl.innerHTML = '';

    for (let i = 0; i < netflixSeries.series.length; i++) {
        const serie = netflixSeries.series[i];
        const newLi = document.createElement('li');
        newLi.classList.add('serie-li');
        const seriesImg = document.createElement('img');
        seriesImg.src = serie.imageUrl;
        newLi.appendChild(seriesImg);

        const upvotesBtn = document.createElement('button');
        newLi.appendChild(upvotesBtn);
        const downvotesBtn = document.createElement('button');
        newLi.appendChild(downvotesBtn);
        const serieTitle = document.createTextNode('titolo: ' + serie.title);
        const serieSeasons = document.createTextNode('stagioni: ' + serie.seasons);
        newLi.appendChild(serieTitle);
        newLi.appendChild(serieSeasons);

        seriesUl.appendChild(newLi);





    }
}

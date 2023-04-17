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
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        const spanTitle = document.createElement('span');
        const spanSeasons = document.createElement('span');

        newLi.appendChild(textContainer);
        const upvotesBtn = document.createElement('button');
        newLi.appendChild(upvotesBtn);
        const downvotesBtn = document.createElement('button');
        downvotesBtn.classList.add('button-1');
        newLi.appendChild(downvotesBtn);
        const serieTitle = document.createTextNode('titolo: ' + serie.title);

        const serieSeasons = document.createTextNode('stagioni: ' + serie.seasons);
       spanTitle.appendChild(serieTitle);
       spanSeasons.appendChild(serieSeasons);
        textContainer.appendChild(spanTitle);
        textContainer.appendChild(spanSeasons);

       
        seriesUl.appendChild(newLi);





    }
}

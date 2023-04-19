DataService.getSeries().then(data => console.log(data));

let seriesCollection = new Collection('which serie do you like?');

displayCollection();

DataService.getSeries().then(data => {
    addDatToCollection(data);
    console.log(seriesCollection);
    displayCollection();
})


function addDatToCollection(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const serie = new Serie(element.title, element.creator, element.seasons, element.isCompleted, element.upVotes, element.downVotes, element.imageUrl, element.id);
        seriesCollection.addSerie(serie);
    }
}


function displayCollection() {
    const container = document.getElementById('series-container');
    container.innerHTML = '';
    for (let i = 0; i < seriesCollection.series.length; i++) {
        const serie = seriesCollection.series[i];
        container.innerHTML += `
        <div class="card">
            <div class="serie-data">
                <img class="serie-img" src="${serie.imageUrl}" alt="image from ${serie.title}">
                <div>
                    <span class="title">${serie.title}</span>
                    <div class="subtitle">
                        <span class="creator">${serie.creator}</span>
                         <span class="seasons">${serie.seasons}${serie.isCompleted ? 'completed':''}</span>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <div id="up-container${i}">
                    <span>${serie.upVotes}</span>
                </div>
                <div id="down-container${i}">
                    <span>${serie.downVotes}</span>
                </div>
            </div>
        </div>
        `
    }
    for (let i = 0; i < seriesCollection.series.length; i++) {
        const serie = seriesCollection.series[i];


        const upContainer = document.getElementById('up-container' + i);
        const downContainer = document.getElementById('down-container' + i);

        const upButton = document.createElement('button');
        const downButton = document.createElement('button');

        upButton.appendChild(document.createTextNode('UP'));
        downButton.appendChild(document.createTextNode('DOWN'))

        upButton.addEventListener('click', (event) => upVoteClicked(serie));
        downButton.addEventListener('click', (event) => downVoteClicked(serie));


        upContainer.appendChild(upButton);
        downContainer.appendChild(downButton);

    }

}

function upVoteClicked(serie) {
   serie.upVotes += 1;
   DataService.putSerie(serie).then(modifiedSerie =>  displayCollection() )
 
}


function downVoteClicked(serie) {
    serie.downVotes += 1;
    DataService.putSerie(serie).then(modifiedSerie =>  displayCollection() )


}

function sortCollectionByTitle() {
    seriesCollection.sortByTitle();
    displayCollection();
}

function sortCollectionByUpVotes() {
    seriesCollection.sortByUpVotes();
    displayCollection();

}

function sortCollectionByDownVotes() {
    seriesCollection.sortByDownVotes();
    displayCollection();
}


function sortCollectionByRating() {
    seriesCollection.sortByRating();
    displayCollection();
}  


// function displayCollection() {
//     const seriesTitle = document.getElementById('list-name');
//     const seriesUl = document.getElementById('series-list');


//     const titleNode = document.createTextNode(netflixSeries.title);
//     seriesTitle.innerHTML = '';
//     seriesTitle.appendChild(titleNode);
//     seriesUl.innerHTML = '';

//     for (let i = 0; i < netflixSeries.series.length; i++) {
//         const serie = netflixSeries.series[i];
//         const newLi = document.createElement('li');
//         newLi.classList.add('serie-li');
//         const seriesImg = document.createElement('img');
//         seriesImg.src = serie.imageUrl;
//         newLi.appendChild(seriesImg);

//         const textContainer = document.createElement('div');
//         textContainer.classList.add('text-container');
//         const spanTitle = document.createElement('span');
//         const spanSeasons = document.createElement('span');
//         newLi.appendChild(textContainer);

//         const buttonContainer = document.createElement('div');
//         buttonContainer.classList.add('button-container');
//         newLi.appendChild(buttonContainer);
//         const upvotesBtn = document.createElement('button');
//         const downvotesBtn = document.createElement('button');


//         const upvotesImg = document.createElement('img');
//         const downvotesImg = document.createElement('img');
//         upvotesImg.classList.add('likeButtonImg');
//         downvotesImg.classList.add('unlikeButtonImg');
//         upvotesImg.src = './assets/images.png'
//         downvotesImg.src = './assets/images2.png'
//         upvotesBtn.appendChild(upvotesImg);
//         downvotesBtn.appendChild(downvotesImg);

//         upvotesBtn.classList.add('button-1');
//         downvotesBtn.classList.add('button-2');

//         buttonContainer.appendChild(upvotesBtn);
//         buttonContainer.appendChild(downvotesBtn);


//         const serieTitle = document.createTextNode('titolo: ' + serie.title);
//         const serieSeasons = document.createTextNode('stagioni: ' + serie.seasons);

//         spanTitle.appendChild(serieTitle);
//         spanSeasons.appendChild(serieSeasons);

//         textContainer.appendChild(spanTitle);
//         textContainer.appendChild(spanSeasons);





//         seriesUl.appendChild(newLi);





//     }
// }

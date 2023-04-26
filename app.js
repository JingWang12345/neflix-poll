DataService.getSeries().then(data => console.log(data));

let seriesCollection = new Collection('which serie do you like?');

displayCollection();


startLoading()
DataService.getSeries()
.then(data => {
    addDatToCollection(data);
    console.log(seriesCollection);
    displayCollection();
    stopLoading();
})
.catch( err => {
    // const errorMessage = document.getElementById('error-message');
    // const errorNode = document.createTextNode('accidenti, si è verificato un errore');
    // errorMessage.appendChild(errorNode);
    displayErrorMessage('accidenti, si è verificato un errore')
    stopLoading();
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
                         <span class="seasons">${serie.seasons}${serie.isCompleted ? 'completed' : ''}</span>
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
    startLoading();
    DataService.putSerie(serie)
    .then(modifiedSerie => {
        stopLoading();
        displayCollection();
    })
    .catch(error =>{
        stopLoading();
        displayErrorMessage('Accidenti! In questo momento non puoi votare');
    })

}


function downVoteClicked(serie) {
    serie.downVotes += 1;
    startLoading();
    DataService.putSerie(serie)
    .then(modifiedSerie => {
        stopLoading();
        displayCollection();
    })
    .catch(error =>{
        stopLoading();
        displayErrorMessage('Accidenti! In questo momento non puoi votare');
    })


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

function saveNewSerie() {
    const titleInput = document.getElementById('title-input');
    const creatorInput = document.getElementById('creator-input');

    const newSerieTitle = titleInput.value;
    const newSerieCreator = creatorInput.value;

    const newSerie = new Serie(newSerieTitle, newSerieCreator);

    console.log('newSerie',newSerie);
startLoading();
    DataService.postSerie(newSerie).then(savedSerie => {
        stopLoading();
        // const finalSerie = new Serie(savedSerie.title, savedSerie.creator, savedSerie.seasons, savedSerie.isCompleted, savedSerie.upVotes, savedSerie.downVotes)
        newSerie.id = savedSerie.id;
        seriesCollection.addSerie(newSerie);
        displayCollection();
    })
    .catch(err => {
        stopLoading();
        displayErrorMessage('Accidenti! non puoi salvare nuove serie')
    }
        )
    // seriesCollection.addSerie(newSerie);
    // displayCollection();
}



function displayErrorMessage(message) {
     const errorMessage = document.getElementById('error-message');
    const errorNode = document.createTextNode(message);
    errorMessage.appendChild(errorNode);
}

function startLoading() {
    const loadingIcon = document.getElementById('loading-icon');
    loadingIcon.style.display = 'inline-block'
}

function stopLoading() {
    const loadingIcon = document.getElementById('loading-icon');
    loadingIcon.style.display = 'none'
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

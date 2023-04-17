class Serie{

    constructor(title, creator, seasons, isCompleted, upVotes, downVotes, imageUrl, id){
        this.title = title;
        this.creator = creator;
        this.seasons = seasons;
        this.isCompleted = isCompleted;
        this.upVotes = upVotes;
        this.downVotes= downVotes;
        this.imageUrl = imageUrl;
        if (id) {
            this.id = id;
        }
    }


}
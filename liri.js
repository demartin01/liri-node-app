require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

// ============================================

App(process.argv[2], process.argv[3]);

// ============================================

function App(command, params) {

    switch (command) {
        case "concert-this":
            getConcerts(params);
            break;

        case "spotify-this-song":
            getMySong(params);
            break;

        case "movie-this":
            getMyMovie(params);
            break;

        case "do-what-it-says":
            doIt();
            break;

        default:
            "Liri doesn't know that command.  Please try again"
            break;
    }
}

// ============================================================

function getConcerts(params) {
    const queryURL = "https://rest.bandsintown.com/artist" + params + "/events?app_id=codingbootcamp";

    axios.get(queryURL)
        .then(function (response) {
            console.log("Upcoming concerts for: " + params)
            for (let i = 0; i < response.data.length; i++) {
                var show = response.data[i];
                console.log(show.venue.city + "," + (show.venue.region || show.venue.country)
                    + " at " + show.venue.name + " " + moment(show.daytime).format("MM/DD/YYYY"))
            }
        })
        .catch(function (err) {
            if (err) throw err;
        })

}
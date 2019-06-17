require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const moment = require("moment");   
const axios = require("axios");
const fs = require("fs");

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
    const queryURL = "https://rest.bandsintown.com/artists/" + params + "/events?app_id=codingbootcamp";

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

};

function getMySong(params) {
    
    spotify.search({ type: 'track', query: params }, function(err, data) {
        if (err) throw err;
      
        // console.log(JSON.stringify(data.tracks.items[0].name,null, 2)); 
        console.log(data.tracks.items[0].name); 
        for (let i = 0; i < data.tracks.items.length; i++) {
            var song = data.tracks.items[i];
            console.log("artist(s): ",song.artists[0].name);
            console.log("Song Name: ", song.name);
            console.log("Song Preview: ",song.preview_url);
            console.log("Songs Album Name: ", song.album.name);
            console.log("-----------------------------------------------");
            
        }
      });
};

function getMyMovie(movie) {
    if (movie===undefined || movie ===" ") {
        movie = "Mr. Nobody"
    };
    const queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
        .then(function (response) {

			console.log("Title: " + response.data.Title);
			console.log("Year: " + response.data.Year);
			console.log("Rated: " + response.data.Rated);
			console.log("IMDB Rating: " + response.data.imdbRating);
			console.log("Country: " + response.data.Country);
			console.log("Language: " + response.data.Language);
			console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("-------------------------------------------------");
        }
	)
    };

    function doIt(){
      let commands;
      let params;
      
      fs.readFile("random.txt", "utf8", function (error, data) {
          if (error) throw error;
          const dataArray = data.split(",");
          for (let i = 0; i < dataArray.length; i++) {
              commands = dataArray[i];
              i++;
              params = dataArray[i];
              App(commands, params);
          }
      })
    }

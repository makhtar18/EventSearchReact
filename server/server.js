const path = require('path');
const axios = require('axios').default;
const express = require('express');
const app = express()
app.use(express.static(path.join(__dirname,"./build")));
const ticketmasterApiKey = "zMcFauK2bK6lA8H3JfTHqncFofsT8qtK";
var SpotifyWebApi = require('spotify-web-api-node');
var geohash = require('ngeohash');
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: 'bfd2e4e08b8745a29aa8803da2c2f95b',
  clientSecret: '109c6d664d50470db269a0cab628e83b'
});

spotifyApi.setAccessToken("");

app.get("/geohash", async (req,res)=>{
    res.set('Access-Control-Allow-Origin',"*");
    var lat = req.query.lat;
    var long = req.query.long;
    var geohashResponse = geohash.encode(lat, long);
    console.log(geohashResponse);
    res.json(geohashResponse);
});
app.get("/spotifyResults", async(req,res)=>{
    res.set('Access-Control-Allow-Origin',"*");
    var musicRelatedArtists = req.query.musicRelatedArtists.split(',');
    var mRA = {
        musicRelatedArtists:[],
        spotifyAlbumnResponse:{},
    };
    var index=0;
    //const token = await spotifyApi.clientCredentialsGrant();
    //spotifyApi.setAccessToken(token.body.access_token);
    for (let artist of musicRelatedArtists) {
        try{
          const data = await spotifyApi.searchArtists(artist);
          console.log("Spotify status code: " + data.statusCode);
          mRA.musicRelatedArtists.push(data.body.artists.items[0]);
          var artistId = data.body.artists.items[0].id;
          try{
            const albumData = await spotifyApi.getArtistAlbums(artistId, { limit: 3 });
            mRA.spotifyAlbumnResponse[artistId] = albumData.body.items;
          }
          catch(err){
            console.log("Spotify albumn error");
            break;
          }
        }
        catch(err){
            console.log("Spotify error");
            break;
        }
    }
    res.json(mRA)
});


app.get("/eventsInfo", async (req,res)=>{
    res.set('Access-Control-Allow-Origin',"*");
    var eventId = req.query.eventId;
    console.log("Executing ticketmaster api");
    var responseData = {
        'date':'',
        'dateWithoutTime':'',
        'artist':'',
        'venue':'',
        'genres':'',
        'priceRanges':'',
        'ticketStatus':'',
        'buyTicketAt':'',
        'seatMap':'',
        'artists':[],
        'musicRelatedArtists':[],
        'eventName':'',
        'error':''
    }
    try {
        var response = await axios.get("https://app.ticketmaster.com/discovery/v2/events/"+eventId+"?apikey="+ticketmasterApiKey);
        var segment, genre, subGenre, type, subType, min, max;
        responseData.eventName = response.data.name;
        if(response.data.dates!=undefined && response.data.dates.start!=undefined){
            if(response.data.dates.start.localDate!=undefined){
                responseData.date = responseData.date+response.data.dates.start.localDate
                responseData.dateWithoutTime = response.data.dates.start.localDate;
            }
            if(response.data.dates.start.localTime!=undefined){
                if(response.data.dates.start.localTime!=undefined){
                    if(responseData.date!='')
                        responseData.date = responseData.date + " ";
                    responseData.date = responseData.date+response.data.dates.start.localTime;
                }
            }
        }

        if(response.data._embedded.venues!=undefined && response.data._embedded.venues.length>0)
            responseData.venue = response.data._embedded.venues[0].name;
        
        if(response.data.classifications!=undefined && response.data.classifications.length>0){
            if(response.data.classifications[0].segment!=undefined && response.data.classifications[0].segment.name.toLowerCase()!='undefined'){
                segment=response.data.classifications[0].segment.name;
                if(responseData.genres=='')
                    responseData.genres = segment;
                else
                    responseData.genres = responseData.genres+' | '+segment;
            }
    
            if(response.data.classifications[0].genre!=undefined && response.data.classifications[0].genre.name.toLowerCase()!='undefined'){
                genre=response.data.classifications[0].genre.name;
                if(responseData.genres=='')
                    responseData.genres= genre;
                else
                    responseData.genres=responseData.genres+' | '+genre;
            }
                
            if(response.data.classifications[0].subGenre!=undefined && response.data.classifications[0].subGenre.name.toLowerCase()!='undefined') {
                subGenre=response.data.classifications[0].subGenre.name;
                    if(responseData.genres=='')
                        responseData.genres= subGenre;
                    else
                        responseData.genres=responseData.genres+' | '+subGenre;
            }
    
            if(response.data.classifications[0].type!=undefined && response.data.classifications[0].type.name.toLowerCase()!='undefined'){
                type=response.data.classifications[0].type.name;
                if(responseData.genres=='')
                    responseData.genres = type;
                else
                    responseData.genres=responseData.genres+' | '+type;
            }
    
            if(response.data.classifications[0].subType!=undefined && response.data.classifications[0].subType.name.toLowerCase()!='undefined'){
                subType=response.data.classifications[0].subType.name;
                if(responseData.genres=='')
                    responseData.genres = subType;
                else
                    responseData.genres = responseData.genres+' | '+subType;
            }
        }

        if(response.data.priceRanges!=undefined && response.data.priceRanges.length>0){
            min = response.data.priceRanges[0].min;
            max = response.data.priceRanges[0].max;
            if(min!=undefined & max==undefined){
                responseData.priceRanges=min+' - '+min+' USD';
            }
            else if(max!=undefined & min==undefined){
                responseData.priceRanges=max+' - '+max+' USD';
            }
            else
                responseData.priceRanges=min+' - '+max+' USD';
        }

        if(response.data.dates.status!=undefined){
            responseData.ticketStatus = response.data.dates.status.code;
        }

        if(response.data.url!=undefined)
            responseData.buyTicketAt = response.data.url;
    
        if(response.data.seatmap!=undefined)
            responseData.seatMap = response.data.seatmap.staticUrl;
    

        if(response.data._embedded.attractions!=undefined) {
            for(attraction of response.data._embedded.attractions){
                if(attraction.name!=undefined && attraction.name!=null) {
                    responseData.artists.push(attraction.name);
                    if(responseData.artist=='')
                        responseData.artist = attraction.name;
                    else
                        responseData.artist = responseData.artist+' | '+attraction.name;
                    if(attraction.classifications.length>0 && attraction.classifications[0].segment!=undefined && attraction.classifications[0].segment.name.toLowerCase()=='music'){
                        responseData.musicRelatedArtists.push(attraction.name);
                    }
                        
                }
            }
        }    
        console.log("eventinfo response sent");
    }
    catch(error) {
            responseData.error = error;
            console.log(error);
    };
    res.json(responseData);
})

app.get("/keywordAutocomplete", (req,res)=>{
    res.set('Access-Control-Allow-Origin',"*");
    var keyword = req.query.keyword;
    axios.get("https://app.ticketmaster.com/discovery/v2/suggest?apikey="+ticketmasterApiKey+"&keyword="+keyword)
        .then(function (response) {
            console.log(response.data);
            res.json(response.data);
            console.log("keyword autocomplete response sent");
        })
        .catch(function (error) {
            console.log(error);
        });
})

app.get("/getVenueDetails", async (req,res)=>{
    res.set('Access-Control-Allow-Origin',"*");
    var venue = req.query.venue;
    try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/venues/?apikey=${ticketmasterApiKey}&keyword=${venue}`
        );
    
        const venueResponse = {
          address: "",
          showAddress: true,
          phoneNumber: "",
          showPhoneNumber: false,
          openHours: "",
          showOpenHours: false,
          generalRule: "",
          showGeneralRule: false,
          childRule: "",
          showChildRule: false,
          name: venue,
          lat: "",
          long: "",
        };
    
        if (response.data.page.totalElements > 0) {

          const v = response.data._embedded.venues[0];
          venueResponse.lat = v.location.latitude;
          venueResponse.long = v.location.longitude;
          if (v.address != undefined && v.address.line1)
            venueResponse.address = venueResponse.address + v.address.line1;
          if (v.city != undefined && v.city.name != undefined) {
            if (venueResponse.address == "")
              venueResponse.address = venueResponse.address + v.city.name;
            else venueResponse.address = venueResponse.address + ", " + v.city.name;
          }
          if (v.state != undefined && v.state.name != undefined) {
            if (venueResponse.address == "")
              venueResponse.address = venueResponse.address + v.state.name;
            else venueResponse.address = venueResponse.address + ", " + v.state.name;
          }
          if (venueResponse.address != "") showAddress = false;
          if (v.boxOfficeInfo != undefined) {
            if (v.boxOfficeInfo.phoneNumberDetail != undefined) {
              venueResponse.showPhoneNumber = true;
              venueResponse.phoneNumber = v.boxOfficeInfo.phoneNumberDetail;
            }
            if (v.boxOfficeInfo.openHoursDetail != undefined) {
              venueResponse.openHours = v.boxOfficeInfo.openHoursDetail;
              venueResponse.showOpenHours = true;
            }
            if (v.generalInfo != undefined) {
              if (v.generalInfo.generalRule != undefined) {
                venueResponse.generalRule = v.generalInfo.generalRule;
                venueResponse.showGeneralRule = true;
              }
              if (v.generalInfo.childRule != undefined) {
                venueResponse.childRule = v.generalInfo.childRule;
                venueResponse.showChildRule = true;
              }
            }
          }
        }
        res.json(venueResponse);
    }
    catch(err){
        console.log(err);
    }
})

app.get("/getSpotifyAuthToken", async (req,res)=>{
    res.set('Access-Control-Allow-Origin',"*");
    try{
        const token = await spotifyApi.clientCredentialsGrant();
        console.log('The access token expires in ' + token.body['expires_in']);
        console.log('The access token is ' + token.body['access_token']);
        spotifyApi.setAccessToken(token.body.access_token);
        res.json({});
        console.log("spotify token response sent");
    }
    catch(err){
        console.log('Something went wrong when retrieving an access token');
        res.json(err);
    }
    
})

app.get("/resultsTable", (req,res)=>{
    res.set('Access-Control-Allow-Origin',"*");
    var keyword = req.query.keyword;
    var segmentId = req.query.segmentId;
    var radius = req.query.radius;
    var geoPoint = req.query.geoPoint;
    axios.get("https://app.ticketmaster.com/discovery/v2/events.json?apikey="+ticketmasterApiKey+"&keyword="+keyword+"&segmentId="+segmentId+"&radius="+radius+"&unit=miles&geoPoint="+geoPoint)
        .then(function (response) {
            var responseData = [];
            console.log(response.data);
            if(response.data.page.totalElements>0){
                var ticketMasterEvents = response.data._embedded.events;
                for(ticketMasterEvent of ticketMasterEvents){
                    var date='', time='',icon='',event='',genre='',venue='',eventId='';
                    event = ticketMasterEvent.name;
                    eventId = ticketMasterEvent.id;
                    if(ticketMasterEvent.images!=undefined && ticketMasterEvent.images.length>0 && ticketMasterEvent.images[0].url!=undefined){
                        icon = ticketMasterEvent.images[0].url;
                    }
                    if(ticketMasterEvent.dates!=undefined && ticketMasterEvent.dates.start.localDate!=undefined)
                        date = ticketMasterEvent.dates.start.localDate;
                    if(ticketMasterEvent.dates!=undefined && ticketMasterEvent.dates.start.localTime!=undefined)
                        time = ticketMasterEvent.dates.start.localTime;
                    if(ticketMasterEvent.classifications!=undefined && ticketMasterEvent.classifications.length>0 && ticketMasterEvent.classifications[0].segment!=undefined)
                        genre = ticketMasterEvent.classifications[0].segment.name;
                    if(ticketMasterEvent._embedded!=undefined && ticketMasterEvent._embedded.venues!=undefined)
                        venue = ticketMasterEvent._embedded.venues[0].name;
                    var responseEvent = {
                        'date':date,
                        'time':time,
                        'icon':icon,
                        'event':event,
                        'genre':genre,
                        'venue':venue,
                        'eventId':eventId
                    }
                    responseData.push(responseEvent);
                }
                responseData.sort(function(a, b) {
                    var dateA = new Date(a.date+' '+a.time),
                      dateB = new Date(b.date+' '+b.time);
                    // Compare the 2 dates
                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;
                    return 0;
                  });
            }
            res.json(responseData);
            console.log("results table response sent");
        })
        .catch(function (error) {
            console.log(error);
        });
})

app.get("/search", (req,res)=>{
    res.sendFile(__dirname + '/build/index.html');
})

app.get("/favorites", (req,res)=>{
    res.sendFile(__dirname + '/build/index.html');
})


app.listen(8080, ()=>{console.log("Server started on 8080")});
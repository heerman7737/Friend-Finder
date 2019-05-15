const friends = require("../data/friends.js");

module.exports = function(app) {

  // GET and POST to and from the same friends location
  app.get("/api/friends", function(request, response) {
    response.json(friends);
  });
  app.post("/api/friends", function(request, response) 
  {
    let userData = request.body;      
    let userScores = userData.scores;
    let change;

    let match = {
      unique: "",
      name: "",
      photo: "",
      friendDifference: 0
    };
    for (let i = 0; i < friends.length; i++) // Examine friends one by one
    {
      let currentFriend = friends[i];
      change = 0;
        for (let j = 0; j < currentFriend.scores.length; j++) //Loop through each score
        {
          let currentFriendScore = currentFriend.scores[j];
          let currentUserScore = userScores[j];

          change += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
        }
      if (change <= match.friendDifference) {
        // Reset the match
        match.name = currentFriend.name;
        match.photo = currentFriend.photo;
        match.friendDifference = change;
      }
    }
    friends.push(userData);
    response.json(match);
  });
};
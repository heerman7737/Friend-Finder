/* apiRoutes.js */
const friends = require("../data/friends");

module.exports = function(app) {

  // GET and POST to and from the same friends location
  app.get("/api/friends", function(request, response) {
    response.json(friends);
  });

  // Within the post request the user is added to the friends JSON data also
  // To make sure the user isn't themself chosen as a best match a filter
  // must be used to exclude the user as their own best match. This will
  // require the use of a unique identifier to search for and skip.
  app.post("/api/friends", function(request, response) 
  {
    // Step 1: Declarations
    let userData = request.body;      // holds user input
    let userScores = userData.scores; // holds score data
    let delta;

    let closestMatch = {
      unique: "",
      name: "",
      photo: "",
      friendDifference: 0
    };


    // Outer Loop: Points to each friend object
    for (let i = 0; i < friends.length; i++) // Examine friends one by one
    {
      let currentFriend = friends[i];
      delta = 0;

      console.log(currentFriend.name);

        // Inner loop: Check the array of scores in each friends object
        for (let j = 0; j < currentFriend.scores.length; j++) //Loop through each score
        {
          let currentFriendScore = currentFriend.scores[j];
          let currentUserScore = userScores[j];

          delta += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
        }

      // If the sum of differences is less then the differences of the current "best match"
      if (delta <= closestMatch.friendDifference) {
        // Reset the closestMatch to be the new friend.
        closestMatch.name = currentFriend.name;
        closestMatch.photo = currentFriend.photo;
        closestMatch.friendDifference = delta;
      }
    }
    friends.push(userData);
    response.json(closestMatch);
  });
};
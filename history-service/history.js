import axios from 'axios'

export async function getUserMatchHist(req, res) {
    const userId = req.params.userId;
  
    try {
      // Get match information for the user requesting from match-service
      const matchResponse = await axios.get(`${process.env.MATCHING_SERVICE_URL}/api/match/get/user`, {
          data: {
              "userId": userId
          }
      });
      
      if (matchResponse && matchResponse.status == 200) {
          let matches = matchResponse.data.matches;

          for (var i = 0; i < matches.length; i++) {
            if (matches[i].user1Id == userId) {
                matches[i]["partner"] = matches[i].user2Id;
            } else {
                matches[i]["partner"] = matches[i].user1Id;
            }

            delete matches[i]["user1Id"];
            delete matches[i]["user2Id"];
          }
          
          console.log(`Sending past match info for ${userId}`)
          return res.status(200).json(matches);
      } else {
          console.log(`Matching service returns bad response: ${res}`)
      }
  } catch (err) {
      return res.status(400).json({message: `Problem collecting past match information. ${err}`})
  }
}

export async function getMatchCode(req, res) {
    const roomId = req.params.roomId;
  
    try {
      // Get match information for the user requesting from match-service
      const collabResponse = await axios.get(`${process.env.COLLAB_SERVICE_URL}/api/code`, {
          data: {
              "roomId": roomId
          }
      });
  
  
      if (collabResponse && collabResponse.status == 200) {
          return res.status(200).json(collabResponse.data);
      } else {
          console.log(`Matching service returns bad response: ${res}`)
      }
  } catch (err) {
      return res.status(400).json({message: `Problem collecting past code. ${err}`})
  }
}
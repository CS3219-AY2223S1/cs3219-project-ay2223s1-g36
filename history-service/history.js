import axios from 'axios'

export async function getUserMatchHist(req, res) {
    const userId = req.params.userId;

    let matches;

    try {
        // Get match information for the user requesting from match-service
        const matchResponse = await axios.get(`${process.env.MATCHING_SERVICE_URL}/api/match/get/user`, {
            data: {
                "userId": userId
            }
        });

        if (matchResponse && matchResponse.status == 200) {
            matches = matchResponse.data.matches;

            for (var i = 0; i < matches.length; i++) {
                if (matches[i].user1Id == userId) {
                    matches[i]["partner"] = matches[i].user2Id;
                } else {
                    matches[i]["partner"] = matches[i].user1Id;
                }

                delete matches[i]["user1Id"];
                delete matches[i]["user2Id"];
                
                // Collect code for every match in the list
                const collabResponse = await axios.get(`${process.env.COLLAB_SERVICE_URL}/api/code`, {
                    data: {
                        "roomId": matches[i]["roomId"]
                    }
                });

                if (collabResponse && collabResponse.status == 200) {
                    matches[i] = Object.assign(matches[i], collabResponse.data);
                } else {
                    console.log(`Collab service returns bad response: ${res}`);
                }

                // Collect question for the qid of the match
                const quesResponse = await axios.get(`${process.env.QUESTION_SERVICE_URL}/api/question/getQues/${matches[i]["questionId"]}`);

                if (quesResponse && quesResponse.status == 200) {
                    matches[i] = Object.assign(matches[i], {ques_title: quesResponse.data["question_title"], ques_text: quesResponse.data["question_text"]});
                } else {
                    console.log(`Question service returns bad response: ${res}`)
                }
            }

            console.log(`Sending past match info for ${userId}`)

            return res.status(200).json(matches);

        } else {
            console.log(`Matching service returns bad response: ${res}`)
            return res.status(400).json({ message: `Matching service bad response ${res}` })
        }
        
    } catch (err) {
        return res.status(400).json({ message: `Problem collecting past match information. ${err}` })
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
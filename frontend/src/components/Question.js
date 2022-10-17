import { Box, colors, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_QN_SVC_GETID } from '../configs';
import { STATUS_CODE_OK, STATUS_CODE_BADREQ, STATUS_SERVER_ERROR } from '../constants';

export default function Question({ qid = 0, difficulty = '' }) {
  // FOR TESTING
  // difficulty = 'medium';

  const [title, setTitle] = useState('');
  const [qnText, setQnText] = useState('');

  const handleQnFetch = async (param) => {
    console.log(param);
    const res = await axios.get(URL_QN_SVC_GETID + param).catch((err) => {
      if (
        err.response.status === STATUS_CODE_BADREQ ||
        err.response.status === STATUS_SERVER_ERROR
      ) {
        console.log(err);
      } else {
        console.log('Please try again later');
      }
    });
    if (res && res.status === STATUS_CODE_OK) {
      console.log(res);
      setTitle(res.data.question_title);
      setQnText(res.data.question_text);
    }
  };

  const getDiffLevel = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return 3;
      default:
        return 0;
    }
  };

  const getDiffColour = (level) => {
    switch (level) {
      case 1:
        return colors.green[500];
      case 2:
        return colors.orange[500];
      case 3:
        return colors.red[500];
      default:
        return colors.grey[500];
    }
  };

  const difficultyLevel = getDiffLevel(difficulty);
  useEffect(() => {
    handleQnFetch(qid);
  }, [qid, difficulty]);

  return (
    <Box
      sx={{
        maxHeight: '70vh',
        overflowY: 'auto',
        padding: 3
      }}
    >
      {difficultyLevel > 0 ? (
        <>
          <Typography
            variant="h6"
            sx={{
              my: 1,
              fontFamily: 'Public Sans,sans-serif',
              fontWeight: '700'
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ color: getDiffColour(difficultyLevel) }}>
            {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
          </Typography>
          <Typography variant="body1">
            <div dangerouslySetInnerHTML={{ __html: qnText }} />
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="body1">Oops!</Typography>
          <Typography variant="body2">
            The question could not be loaded. Please try again!
          </Typography>
        </>
      )}
    </Box>
  );
}

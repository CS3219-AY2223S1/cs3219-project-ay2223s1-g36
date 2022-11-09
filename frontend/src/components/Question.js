import { Box, colors, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_QN_SVC_GETID } from '../configs';
import { STATUS_CODE_OK, STATUS_CODE_BADREQ, STATUS_SERVER_ERROR } from '../constants';
import { intToDiffMap } from '../utils/question';

export default function Question({ qid = 0 }) {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [qnText, setQnText] = useState('');

  const handleQnFetch = async (param) => {
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
      setTitle(res.data.question_title);
      setDifficulty(res.data.difficulty);
      setQnText(res.data.question_text);
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

  useEffect(() => {
    handleQnFetch(qid);
  }, [qid, difficulty]);

  return (
    <Box
      sx={{
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: 3
      }}
    >
      {difficulty > 0 ? (
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
          <Typography sx={{ color: getDiffColour(difficulty) }}>
            {intToDiffMap[difficulty]?.charAt(0).toUpperCase() + intToDiffMap[difficulty]?.slice(1)}
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

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useOutletContext } from 'react-router-dom';
import Split from 'react-split';
import CodeEditor from '../components/editor/CodeEditor';
import Page from '../components/Page';
import Question from '../components/Question';

export default function Room() {
  const { roomID, difficulty } = useOutletContext();
  return (
    <Page title="Room" navbar={false}>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ mb: 1, ml: 1.5, cursor: 'pointer' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                borderRadius: '12px',
                backgroundColor: 'rgba(145, 158, 171, 0.12)',
                maxWidth: '400px'
              }}
            >
              <Box sx={{ ml: 0.5, mr: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(33, 43, 54)', fontWeight: '600' }}
                >
                  Room ID: {roomID}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mb: 1, mx: 1.5, cursor: 'pointer' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                borderRadius: '12px',
                backgroundColor: 'rgba(145, 158, 171, 0.12)',
                maxWidth: '400px'
              }}
            >
              <Box sx={{ ml: 0.5, mr: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'rgb(33, 43, 54)', fontWeight: '600' }}
                >
                  Difficulty: {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Split
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
          sizes={[25, 75]}
          minSize={400}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <Question type="attempt" difficulty={difficulty} />
          <CodeEditor />
        </Split>
      </Box>
    </Page>
  );
}

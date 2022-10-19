import { Box } from '@mui/system';
import Split from 'react-split';
import { useOutletContext } from 'react-router-dom';

import Page from '../components/Page';
import Question from '../components/Question';
import CodeEditor from '../components/editor/CodeEditor';

export default function PastAttempt() {
  const { questionId, code } = useOutletContext();
  return (
    <Page title="Attempt" navbar={false}>
      <Box>
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
          <Question qid={questionId} />
          <CodeEditor readOnly={true} code={code} />
        </Split>
      </Box>
    </Page>
  );
}

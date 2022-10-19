import { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { MonacoServices } from 'monaco-languageclient';
import { Box, MenuItem, FormControl, InputLabel } from '@mui/material';
import { CODE_EDITOR_OPTIONS, CODE_EDITOR_LANGUAGE } from './EditorConfig';
import Select from '@mui/material/Select';

export default function CodeEditor({
  defaultLanguage = 'JavaScript',
  readOnly = false,
  code = '',
  collabSocket
}) {
  const [language, setLanguage] = useState(defaultLanguage);
  const editorOptions = CODE_EDITOR_OPTIONS;
  let isFromSocket = false;
  const editorRef = useRef();

  if (readOnly) {
    editorOptions['readOnly'] = true;
    editorOptions['domReadOnly'] = true;
  }

  useEffect(() => {
    if (collabSocket) {
      collabSocket.on('editor:update', (data) => {
        isFromSocket = true;
        editorRef.current.getModel().applyEdits(data.changes);
      });
    }
  }, []);

  const handleEditorDidMount = (editor) => {
    MonacoServices.install(monaco);
    editor.focus();
    editorRef.current = editor;
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleOnChange = (event, change) => {
    if (collabSocket && !readOnly) {
      if (isFromSocket === false) {
        collabSocket.emit('editor:key', { key: change });
      } else {
        isFromSocket = false;
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginLeft: '1%',
        marginRight: '1%',
        backgroundColor: 'white',
        '@media only screen and (max-width: 600px)': {
          maxWidth: '100%'
        }
      }}
    >
      {!readOnly && (
        <FormControl sx={{ margin: '10px 0', paddingLeft: '1%' }}>
          <InputLabel id="demo-simple-select-label" sx={{ marginLeft: '5%' }}>
            Language
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Language"
            value={language}
            placeholder="Select Language"
            onChange={handleLanguageChange}
            sx={{ minWidth: '150px', maxHeight: '40px' }}
          >
            {CODE_EDITOR_LANGUAGE.map((element) => {
              return (
                <MenuItem key={element} value={element}>
                  {element}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
      <Box sx={{ border: '1px #d9d9d9 solid' }}>
        <MonacoEditor
          width="100%"
          height={!readOnly ? '60vh' : '85vh'}
          language={language.toLocaleLowerCase()}
          theme="vs"
          value={code}
          options={editorOptions}
          onChange={handleOnChange}
          editorDidMount={handleEditorDidMount}
        />
      </Box>
    </Box>
  );
}

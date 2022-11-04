import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import * as monaco from 'monaco-editor';
import { MonacoServices } from 'monaco-languageclient';
import { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { URL_COLLAB_SVC } from '../../configs';
import { CODE_EDITOR_LANGUAGE, CODE_EDITOR_OPTIONS } from './EditorConfig';

export default function CodeEditor({ readOnly = false, code, collabSocket, roomId = '' }) {
  const [language, setLanguage] = useState('JavaScript');
  const [codeValue, setCodeValue] = useState(code);
  const editorOptions = CODE_EDITOR_OPTIONS;
  const isFromSocket = useRef(false);
  const isLanguageFromSocket = useRef(false);
  const editorRef = useRef();

  if (readOnly) {
    editorOptions['readOnly'] = true;
    editorOptions['domReadOnly'] = true;
  }

  async function retrieveCodeInfo() {
    if (roomId) {
      const response = await fetch(`${URL_COLLAB_SVC}/api/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId })
      });
      const result = await response.json();
      setLanguage(result.language);
      setCodeValue(result.code);
    }
  }

  useEffect(() => {
    if (collabSocket) {
      collabSocket.on('editor:update', (data) => {
        isFromSocket.current = true;
        editorRef.current.getModel().applyEdits(data.changes);
      });

      collabSocket.on('language:update', (data) => {
        isLanguageFromSocket.current = true;
        setLanguage(data);
      });
    }

    if (!readOnly) {
      retrieveCodeInfo();
    }
  }, []);

  useEffect(() => {
    retrieveCodeInfo();
  }, [language]);

  const handleEditorDidMount = (editor) => {
    MonacoServices.install(monaco);
    editor.focus();
    editorRef.current = editor;
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    if (isLanguageFromSocket.current === false) {
      collabSocket.emit('editor:language', {
        code: editorRef.current.getValue(),
        language: newLanguage
      });
      setLanguage(newLanguage);
    } else {
      isLanguageFromSocket.current = false;
    }
  };

  const handleOnChange = (event, change) => {
    if (collabSocket && !readOnly) {
      if (isFromSocket.current === false) {
        collabSocket.emit('editor:key', { key: change });
        collabSocket.emit('editor:save', {
          code: editorRef.current.getValue(),
          language: language
        });
      } else {
        isFromSocket.current = false;
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
          <Box display={'flex'}>
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
          </Box>
        </FormControl>
      )}
      <Box sx={{ border: '1px #d9d9d9 solid' }}>
        <MonacoEditor
          width="100%"
          height={!readOnly ? '64vh' : '85vh'}
          language={language.toLocaleLowerCase()}
          theme="vs"
          value={codeValue}
          options={editorOptions}
          onChange={handleOnChange}
          editorDidMount={handleEditorDidMount}
        />
      </Box>
    </Box>
  );
}

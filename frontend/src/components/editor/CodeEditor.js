import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { MonacoServices } from 'monaco-languageclient';
import { Box, MenuItem, FormControl, InputLabel } from '@mui/material';
import { CODE_EDITOR_OPTIONS, CODE_EDITOR_LANGUAGE } from './EditorConfig';
import Select from '@mui/material/Select';

export default function CodeEditor({ defaultLanguage = 'JavaScript' }) {
  const [language, setLanguage] = useState(defaultLanguage);

  const editorDidMount = (editor) => {
    MonacoServices.install(monaco);
    if (editor && editor.getModel()) {
      const editorModel = editor.getModel();
      if (editorModel) {
        editorModel.setValue('const hello = () => null;\nconst ans = [];');
      }
    }
    editor.focus();
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleOnChange = (event, newCode) => {
    console.log('onChange', newCode);
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
      <Box sx={{ border: '1px #d9d9d9 solid' }}>
        <MonacoEditor
          width="100%"
          height="70vh"
          language={language.toLocaleLowerCase()}
          theme="vs"
          options={CODE_EDITOR_OPTIONS}
          onChange={handleOnChange}
          editorDidMount={editorDidMount}
        />
      </Box>
    </Box>
  );
}

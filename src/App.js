import React, { useState } from 'react';
import FileImport from './FileImport';
import HtmlEditor from './HtmlEditor';
import HtmlToDocx from './HtmlToDocx';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';

const App = () => {
  const [fileContent, setFileContent] = useState('');

  return (
    <ChakraProvider>
    <div className="App">
      <h1>WORD to HTML Converter</h1>
      <FileImport onFileLoad={setFileContent} />
      <HtmlEditor initialContent={fileContent} />
      <h2>HTML TO WORD CONVERTER</h2>
      <HtmlToDocx />
    </div>
    </ChakraProvider>
  );
};

export default App;

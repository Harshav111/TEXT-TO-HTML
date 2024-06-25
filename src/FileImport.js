import React, { useState } from 'react';
import mammoth from 'mammoth';
import { Box, Button, Input, Text } from '@chakra-ui/react';

const FileImport = ({ onFileLoad }) => {
  const [fileContent, setFileContent] = useState('');
  const [showContent, setShowContent] = useState(true);
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setFileContent(result.value);
      setFileName(file.name);
      onFileLoad(result.value);
    }
  };

  const handleToggleContent = () => {
    setShowContent((prevShowContent) => !prevShowContent);
  };

  const handleConvertToHtml = () => {
    const blob = new Blob([fileContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveFile = () => {
    setFileContent('');
    setFileName('');
    onFileLoad('');
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Input type="file" accept=".doc, .docx" onChange={handleFileChange} mb={4} />
      <Button onClick={handleToggleContent} colorScheme="blue" mr={2}>
        {showContent ? 'Hide Content' : 'Show Content'}
      </Button>
      <Button onClick={handleConvertToHtml} colorScheme="green" mr={2} disabled={!fileContent}>
        Convert to HTML
      </Button>
      <Button onClick={handleRemoveFile} colorScheme="red" disabled={!fileContent}>
        Remove File
      </Button>
      {fileName && <Text mt={2}>Uploaded File: {fileName}</Text>}
      {showContent && (
        <Box
          mt={4}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          dangerouslySetInnerHTML={{ __html: fileContent }}
        />
      )}
    </Box>
  );
};

export default FileImport;

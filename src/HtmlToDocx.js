import React, { useState } from 'react';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';

const HtmlToDocx = () => {
  const [htmlContent, setHtmlContent] = useState('<p>This is some <strong>HTML</strong> content.</p>');
  const [showContent, setShowContent] = useState(true);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // to reset the file input

  const handleToggleContent = () => {
    setShowContent((prevShowContent) => !prevShowContent);
  };

  const handleExportToDocx = () => {
    const converted = htmlDocx.asBlob(htmlContent);
    saveAs(converted, 'document.docx');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        setHtmlContent((prevContent) => prevContent + fileContent);
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setHtmlContent(''); // Clear the content
    setFileInputKey(Date.now()); // Reset the file input by changing the key
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Input key={fileInputKey} type="file" accept=".html" onChange={handleFileChange} mb={4} />
      <Textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        rows="10"
        placeholder="Enter HTML content here..."
        mb={4}
      />
      <Button onClick={handleToggleContent} colorScheme="blue" mr={2}>
        {showContent ? 'Hide Content' : 'Show Content'}
      </Button>
      <Button onClick={handleExportToDocx} colorScheme="green" mr={2}>
        Export to DOCX
      </Button>
      <Button onClick={handleRemoveFile} colorScheme="red">
        Remove File
      </Button>
      {showContent && (
        <Box
          mt={4}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </Box>
  );
};

export default HtmlToDocx;

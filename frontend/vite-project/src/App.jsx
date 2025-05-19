import { useEffect, useState } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/components/prism-python"; // Import Python language support
import './App.css';
import axios from 'axios';
import rehypeHightlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';
import Markdown from 'react-markdown';

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(` function sum() {
    return 1 + 1
  }`);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  
  // Sample code templates for different languages
  const codeTemplates = {
    javascript: `// This is just an example, Paste your own code and begin reviewing!
  function sum() {
    return 1 + 1
  }`,
    python: `# This is just an example, Paste your own code and begin reviewing!
    def sum():
      return 1 + 1`
  };

  // Change language and set appropriate code template
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage]);
  };

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { 
        code,
        language // Send language info to the backend
      });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error fetching review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className='app-header'>
        <h1>Code Reviewer</h1>
      </header>
      <main>
        <div className="left">
          <div className="language-selector">
            <button 
              className={language === 'javascript' ? 'active' : ''} 
              onClick={() => changeLanguage('javascript')}
            >
              JavaScript
            </button>
            <button 
              className={language === 'python' ? 'active' : ''} 
              onClick={() => changeLanguage('python')}
            >
              Python
            </button>
          </div>
          <div className='code'>
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages[language], language)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div onClick={reviewCode} className='review'>
            {loading ? "Loading..." : "Review"}
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHightlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;

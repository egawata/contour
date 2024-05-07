import './App.css';
import { Helmet } from 'react-helmet';

// aa
export const App = () => {
  return (
    <div className="container">
        <img id="input-image" src="./images/input.jpg" width="300" alt="input" />
        <img src="./images/output.jpg" width="300" alt="output" />
        <input type="text" name="threshold1" value="100" />
        <input type="text" name="threshold2" value="200" />
        <button type="button" id="read-file">Read File</button>
        file path: <strong id="filePath"></strong>
        <button>Generate</button>
        <button>Export</button>
        <Helmet>
          <script src='./renderer.js'></script>
        </Helmet>
    </div>
  );
};
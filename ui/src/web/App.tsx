import './App.css';
import { Helmet } from 'react-helmet';

// aa
export const App = () => {
  return (
    <div className="container">
        <InputImage src="./images/input.jpg" />
        <OutputImage src="./images/output.jpg" />
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

interface InputImageProps {
  src: string;
}

const InputImage: React.FC<InputImageProps> = ({ src }) => {
  return (
    <img src={src} width="300" alt="input" />
  );
};

interface outputImageProps {
  src: string;
}

const OutputImage: React.FC<outputImageProps> = ({ src }) => {
  return (
    <img src={src} width="300" alt="output" />
  );
};
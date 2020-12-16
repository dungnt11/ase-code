import React from 'react';
import * as FileSaver from 'file-saver';
import AesCtr from './libs/aes-ctr';
import { Input } from './components/input';

export default function () {
  const [pass, setPass] = React.useState('');
  const [bitRead, setBitRead] = React.useState(256);
  const [timeEncrypt, setTimeEncrypt] = React.useState('');
  const [timeDecrypt, setTimeDecrypt] = React.useState('');

  let fileReader;
  
  const encodeFile = (e) => {
    const t1 = performance.now();

    fileReader = new FileReader();
    const nameSaveFile = `${e.target.files[0].name}.encript`;
    fileReader.onloadend = () => {
      const content = fileReader.result;
      const ciphertext = AesCtr.encrypt(content, pass, bitRead);
      const blob = new Blob([ciphertext], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, nameSaveFile);
      const t2 = performance.now();
      const t = ((t2-t1)/1000).toFixed(3)+'s';
      setTimeEncrypt(t);
    };
    fileReader.readAsText(e.target.files[0], 'text/plain');
  };

  const decodeFile = (e) => {
    const t1 = performance.now();
    fileReader = new FileReader();
    const nameSaveFile = e.target.files[0].name.replace('.encript', '');
    fileReader.onloadend = () => {
      const content = fileReader.result;
      const ciphertext = AesCtr.decrypt(content, pass, bitRead);
      const blob = new Blob([ciphertext], {type: "application/octet-stream"});
      FileSaver.saveAs(blob, nameSaveFile);
      const t2 = performance.now();
      const t = ((t2-t1)/1000).toFixed(3)+'s';
      setTimeDecrypt(t);
    };
    fileReader.readAsText(e.target.files[0], 'iso-8859-1');
  }
  
  return (
    <div className='upload-expense'>
      <div className="frame">
      <div className="center">
        <Input
          label="Password"
          value={pass}
          onChange={setPass}   
        />
        <Input
          label="Bits"
          value={bitRead}
          onChange={setBitRead}   
        />

        <div className="title">
          <div className="time">Time: {timeEncrypt}</div>
          <h1>Drop file to encrypt</h1>
        </div>
        <div className="dropzone">
          <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon" />
          <input type="file" className="upload-input" onChange={encodeFile} />
        </div>
        <button type="button" className="btn" name="uploadbutton">Upload file</button>
        
        <div className="title">
          <div className="time">Time: {timeDecrypt}</div>
          <h1>Drop file to decrypt</h1>
        </div>
        <div className="dropzone">
          <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon" />
          <input type="file" className="upload-input" onChange={decodeFile} />
        </div>
        <button type="button" className="btn" name="uploadbutton">Upload file</button>

      </div>
    </div>
    </div>
  );
}
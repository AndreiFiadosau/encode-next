'use client';

import React, { useState } from "react";
import CryptoJS from "crypto-js";

const encrypt = (text, key) => {
  const encrypted = CryptoJS.AES.encrypt(text, key);
  return encrypted.toString();
};

const decrypt = (encryptedText, key) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [mode, setMode] = useState("decrypt");
  const [result, setResult] = useState("");

  const handleEncryptDecrypt = () => {
    let output = "";
    if (mode === "decrypt") {
      output = decrypt(input1, input2);
    } else if (mode === "encrypt") {
      output = encrypt(input1, input2);
    }
    setResult(output);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Result copied to clipboard!");
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Enter text for input1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter text for input2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <div>
          <label>
            <input
              type="radio"
              value="decrypt"
              checked={mode === "decrypt"}
              onChange={() => setMode("decrypt")}
            />
            Decrypt
          </label>
          <label>
            <input
              type="radio"
              value="encrypt"
              checked={mode === "encrypt"}
              onChange={() => setMode("encrypt")}
            />
            Encrypt
          </label>
        </div>
        <button onClick={handleEncryptDecrypt}>GO</button>
        <button onClick={copyToClipboard} disabled={!result}>
          Copy to Clipboard
        </button>
        <div>Result: {result}</div>
      </div>
    </div>
  );
}

export default App;

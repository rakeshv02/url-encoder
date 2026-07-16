import React, { useState } from 'react';
export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const handleEncode = (text) => setOutput(encodeURIComponent(text));
  const handleDecode = (text) => { try { setOutput(decodeURIComponent(text)); } catch { setOutput('Error decoding.'); } };
  const handleChange = (text) => { setInput(text); mode === 'encode' ? handleEncode(text) : handleDecode(text); };
  const toggleMode = () => { setMode(m => m === 'encode' ? 'decode' : 'encode'); setInput(''); setOutput(''); };
  const copyToClipboard = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const clear = () => { setInput(''); setOutput(''); };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-4">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">URL Encoder</h1>
        <p className="text-gray-400 mb-8">Encode and decode URLs instantly. Essential for APIs, query strings, and web development.</p>
        <button onClick={toggleMode} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded mb-6">Switch to {mode === 'encode' ? 'Decode' : 'Encode'}</button>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{mode === 'encode' ? 'URL to Encode' : 'URL to Decode'}</label>
          <textarea value={input} onChange={(e) => handleChange(e.target.value)} placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter URL to decode...'} className="w-full h-32 px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-gray-500 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">{mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}</label>
          <textarea value={output} readOnly className="w-full h-32 px-4 py-3 bg-slate-800 border border-slate-700 text-gray-300 rounded" />
        </div>
        <div className="flex gap-3">
          <button onClick={copyToClipboard} disabled={!output} className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded">{copied ? '✓ Copied' : 'Copy Result'}</button>
          <button onClick={clear} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded">Clear</button>
        </div>
        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-3">What is URL Encoding?</h2>
          <p className="text-gray-400 text-sm">URL encoding converts special characters into a format that can be safely transmitted over the internet. Essential for query strings, APIs, and web development.</p>
        </div>
      </div>
    </div>
  );
}

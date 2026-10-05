import React, { useState, useEffect, useMemo } from 'react';
import { Database, Binary, Dna, FileSearch, ArrowDown, Activity, ChevronRight, HardDrive } from 'lucide-react';
import ScrollVideo from './ScrollVideo';
import './index.css';

const DNA_MAPPING = {
  '00': { letter: 'A', class: 'dna-a' },
  '01': { letter: 'C', class: 'dna-c' },
  '10': { letter: 'G', class: 'dna-g' },
  '11': { letter: 'T', class: 'dna-t' }
};

function App() {
  const [inputText, setInputText] = useState('Enter text to synthesize into DNA memory. The future of data storage is biological.');
  
  // Simulation logic
  const binaryString = useMemo(() => {
    return inputText.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
  }, [inputText]);

  const dnaSequence = useMemo(() => {
    let dna = [];
    for (let i = 0; i < binaryString.length; i += 2) {
      const pair = binaryString.substring(i, i + 2);
      if (pair.length === 2 && DNA_MAPPING[pair]) {
        dna.push(DNA_MAPPING[pair]);
      }
    }
    return dna;
  }, [binaryString]);

  // Calculations for stats
  const bytes = (new Blob([inputText]).size);
  // 1 gram of DNA can theoretically store ~215 Petabytes (215 * 10^15 bytes).
  // Thus, mass = bytes / (215 * 10^15) grams.
  const dnaMassGrams = bytes / (215e15); 
  const dnaMassStr = dnaMassGrams < 1e-25 ? "~ 0" : dnaMassGrams.toExponential(4);
  const dataDensity = "215,000,000 GB / Gram";

  return (
    <>
      <div className="ambient-bg"></div>
      <div className="grid-overlay"></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <ScrollVideo />

        {/* How It Works Section */}
        <section className="section">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="glass-card step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <Binary color="white" size={24} />
              </div>
              <h3>Encoding</h3>
              <p>Digital files (0s and 1s) are converted into a DNA sequence (A, C, G, T) using an encoding algorithm.</p>
            </div>
            
            <div className="glass-card step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <Dna color="white" size={24} />
              </div>
              <h3>Synthesis</h3>
              <p>The sequence is chemically synthesized into actual DNA molecules (oligonucleotides) strand by strand.</p>
            </div>

            <div className="glass-card step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <Database color="white" size={24} />
              </div>
              <h3>Storage</h3>
              <p>The physical DNA is dried and sealed in a tiny test tube, taking up millions of times less space than hard drives.</p>
            </div>

            <div className="glass-card step-card">
              <div className="step-number">4</div>
              <div className="step-icon">
                <FileSearch color="white" size={24} />
              </div>
              <h3>Decoding</h3>
              <p>To read data, the DNA is sequenced using standard lab equipment and translated back to binary code.</p>
            </div>
          </div>
        </section>

        {/* Interactive Simulation Section */}
        <section className="section">
          <h2>Interactive Simulation</h2>
          <p className="subtitle">Experience the encoding process in real-time. Type text below to see it transformed.</p>
          
          <div className="glass-card">
            <div className="simulator-layout">
              {/* Input Area */}
              <div>
                <div className="input-group">
                  <label>1. Input Digital Data (Text)</label>
                  <textarea 
                    className="sim-input" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type here..."
                  />
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'right' }}>
                    {bytes} Bytes
                  </div>
                </div>

                <div className="conversion-arrow">
                  <ArrowDown size={32} />
                </div>

                <div className="input-group">
                  <label>2. Binary Translation (0s & 1s)</label>
                  <div className="output-box">
                    {binaryString || 'Waiting for input...'}
                  </div>
                </div>
              </div>

              {/* Output Area */}
              <div>
                <div className="input-group" style={{ height: '100%' }}>
                  <label>3. DNA Oligonucleotide Sequence (A, C, G, T)</label>
                  <div className="output-box dna-output" style={{ flexGrow: 1, maxHeight: '400px' }}>
                    {dnaSequence.length === 0 && <span style={{color: 'var(--text-secondary)', letterSpacing: 'normal'}}>Waiting for input...</span>}
                    {dnaSequence.map((base, i) => (
                      <span key={i} className={base.class}>{base.letter}</span>
                    ))}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    Total Base Pairs: {dnaSequence.length}
                  </div>
                </div>

                {/* Storage Analysis */}
                <div className="memory-comparison">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary-color)', fontWeight: '600' }}>
                      <Activity size={18} /> Storage Analysis
                    </label>
                  </div>
                  
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Physical Mass Required:</span>
                      <span style={{ color: 'var(--primary-color)', fontFamily: 'Fira Code' }}>{dnaMassStr} grams</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Standard Drive Equivalent:</span>
                      <span style={{ color: 'var(--primary-color)', fontFamily: 'Fira Code' }}>1 Micro-drop</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Density:</span>
                      <span style={{ color: 'var(--primary-color)', fontFamily: 'Fira Code' }}>{dataDensity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)' }}>
          <p>Built with React & Vite. Simulating the biological data revolution.</p>
        </footer>
      </div>
    </>
  );
}

export default App;

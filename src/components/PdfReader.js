import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import samplePdf from './sample.pdf';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./pdfview.css";
// import { attachmentPlugin } from '@react-pdf-viewer/attachment';
import { themePlugin } from '@react-pdf-viewer/theme';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import MenuIcon from '@mui/icons-material/Menu';


export default function PdfViewer({ fileUrl = samplePdf }) {
    const [currentTheme, setCurrentTheme] = useState('light');
    const [showThumbnails, setShowThumbnails] = useState(true);
    const themePluginInstance = themePlugin();
    // const attachmentPluginInstance = attachmentPlugin();
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Thumbnails } = thumbnailPluginInstance;

    // Toggle theme 
    const toggleTheme = () => {
        setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Toggle thumbnail visibility
    const toggleThumbnails = () => {
        setShowThumbnails(prev => !prev);
    };

    return (
        <>
            <div className="my-mainview"   >
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <div className="toggle-items">
                        {/* Toggle button for thumbnails */}
                        <div>
                            <button onClick={toggleThumbnails}>
                               <MenuIcon />
                            </button>
                        </div>
                        {/* Toggle switch for theme */}
                        <div className="toggle-container">
                            <input
                                type="checkbox"
                                id="theme-switch"
                                className="toggle-checkbox"
                                onChange={toggleTheme}
                                checked={currentTheme === 'dark'}
                            />
                            <label className="toggle-label" htmlFor="theme-switch">
                                <span className="toggle-button" />
                                <span className="theme-text">
                                    <span className="emoji">🌞</span>
                                </span>
                                <span className="theme-text">
                                    <span className="emoji">🌙</span>
                                </span>
                            </label>
                        </div>

                    </div>


                    {/* mypages */}
<div className="My-pagess" >
                    <div 
                        style={{ borderColor: currentTheme === 'dark' ? '#4caf50' : '#4caf50', display: 'flex', height: '100vh', overflow: 'hiden' }}>

                        {/* thumbnailss preview */}
                        {showThumbnails && (
                            <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.3)', overflow: 'hiden', width: '18%' }}>
                                <Thumbnails />
                            </div>
                        )}


                        {/* pagesss */}
                        <div className="pdf-viewer-container" style={{ flexGrow: 1, overflow: 'hiden' }}>
                            <Viewer
                                fileUrl={fileUrl}
                                plugins={[themePluginInstance, thumbnailPluginInstance]}
                                theme={currentTheme}
                            />
                        </div>
                    </div>
                    </div>
                </Worker>
            </div>
        </>
    );
}
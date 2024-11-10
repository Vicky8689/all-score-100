import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import samplePdf from './sample.pdf';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./pdfview.css";
import { themePlugin } from '@react-pdf-viewer/theme';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { zoomPlugin } from '@react-pdf-viewer/zoom'; // Import the zoom plugin
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

export default function PdfViewer({ fileUrl = samplePdf }) {
    const [currentTheme, setCurrentTheme] = useState('light');
    const [currentscreensize, setcurrentscreensize] = useState('off');
    const [showThumbnails, setShowThumbnails] = useState(true);

    const themePluginInstance = themePlugin();
    const thumbnailPluginInstance = thumbnailPlugin();
    const fullScreenPluginInstance = fullScreenPlugin();
    const zoomPluginInstance = zoomPlugin(); // Create an instance of the zoom plugin

    const { Thumbnails } = thumbnailPluginInstance;
    const { EnterFullScreen } = fullScreenPluginInstance;

    // Toggle theme
    const toggleTheme = () => {
        setCurrentTheme(prevScr => (prevScr === 'light' ? 'dark' : 'light'));
    };

    // Full-screen toggle
    const fullscreen = () => {
        setcurrentscreensize(prevScr => (prevScr === 'off' ? 'on' : 'off'));
    };

    // Toggle thumbnail visibility
    const toggleThumbnails = () => {
        setShowThumbnails(prev => !prev);
    };

    return (
        <div className={`my-mainview-${currentscreensize}`} style={{ backgroundColor: currentTheme === 'dark' ? '#333' : '#fff' }}>
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

                    {/* Full-screen button */}
                    <div>
                        <Button onClick={fullscreen} variant="outlined">Toggle Full-Screen</Button>
                    </div>

                    {/* Custom Zoom In button using RenderZoomInProps */}
                    <div>
                        <zoomPluginInstance.ZoomIn>
                            {(props) => (
                                <Button
                                    {...props}
                                    variant="outlined"
                                    style={{
                                        margin: '5px',
                                        backgroundColor: currentTheme === 'dark' ? '#444' : '#f0f0f0',
                                        color: currentTheme === 'dark' ? '#fff' : '#000',
                                    }}
                                    onClick={props.onClick}
                                >
                                    Zoom In
                                </Button>
                            )}
                        </zoomPluginInstance.ZoomIn>
                    </div>

                    {/* Custom Zoom Out button using RenderZoomOutProps */}
                    <div>
                        <zoomPluginInstance.ZoomOut>
                            {(props) => (
                                <Button
                                    {...props}
                                    variant="outlined"
                                    style={{
                                        margin: '5px',
                                        backgroundColor: currentTheme === 'dark' ? '#444' : '#f0f0f0',
                                        color: currentTheme === 'dark' ? '#fff' : '#000',
                                    }}
                                    onClick={props.onClick}
                                >
                                    Zoom Out
                                </Button>
                            )}
                        </zoomPluginInstance.ZoomOut>
                    </div>
                </div>

                {/* Pages */}
                <div className="My-pagess">
                    <div style={{ borderColor: currentTheme === 'dark' ? '#4caf50' : '#4caf50', display: 'flex', height: '100vh', overflow: 'hidden' }}>

                        {/* Thumbnails preview */}
                        {showThumbnails && (
                            <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.3)', overflow: 'hidden', width: '18%' }}>
                                <Thumbnails />
                            </div>
                        )}

                        {/* PDF viewer */}
                        <div className="pdf-viewer-container" style={{ flexGrow: 1, overflow: 'hidden' }}>
                            <Viewer
                                fileUrl={fileUrl}
                                plugins={[themePluginInstance, thumbnailPluginInstance, zoomPluginInstance, fullScreenPluginInstance]}
                                theme={currentTheme}
                            />
                        </div>
                    </div>
                </div>
            </Worker>
        </div>
    );
}

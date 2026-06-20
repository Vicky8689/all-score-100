import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Worker, Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";

import "./pdfview.css";

import { themePlugin } from "@react-pdf-viewer/theme";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { getNotesPdf } from "../../Services/contentService";





export default function PdfViewer() {

    // ROUTE PARAMS
    const { optionTopicId, srNo } = useParams();

    // STATES
    const [fileUrl, setFileUrl] = useState("");

    const [loading, setLoading] = useState(true);

    const [currentTheme, setCurrentTheme] = useState("light");

    const [currentscreensize, setcurrentscreensize] = useState("off");

    const [showThumbnails, setShowThumbnails] = useState(true);

    // PLUGINS
    const themePluginInstance = themePlugin();

    const thumbnailPluginInstance = thumbnailPlugin();

    const fullScreenPluginInstance = fullScreenPlugin();

    const zoomPluginInstance = zoomPlugin();

    const { Thumbnails } = thumbnailPluginInstance;

    // LOAD PDF
    useEffect(() => {

        loadPdf();

    }, [optionTopicId, srNo]);

    const loadPdf = async () => {

        try {

            setLoading(true);

            const response = await getNotesPdf(
                optionTopicId,
                srNo
            );

            console.log(response);

            // API RESPONSE
            // { pdfUrl: "https://....pdf" }

            setFileUrl(response.data);

        } catch (error) {

            console.error("PDF Load Error", error);

        } finally {

            setLoading(false);

        }

    };

    // THEME TOGGLE
    const toggleTheme = () => {

        setCurrentTheme((prev) =>
            prev === "light" ? "dark" : "light"
        );

    };

    // FULL SCREEN
    const fullscreen = () => {

        setcurrentscreensize((prev) =>
            prev === "off" ? "on" : "off"
        );

    };

    // THUMBNAILS
    const toggleThumbnails = () => {

        setShowThumbnails((prev) => !prev);

    };

    // LOADING SCREEN
    if (loading) {

        return (
            <div className="pdf-loading">

                <h2>Loading PDF...</h2>

            </div>
        );

    }

    return (

        <div
            className={`my-mainview-${currentscreensize}`}
            style={{
                backgroundColor:
                    currentTheme === "dark"
                        ? "#333"
                        : "#fff",
            }}
        >

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">

                {/* TOP BAR */}
                <div className="toggle-items">

                    {/* MENU */}
                    <div>

                        <button onClick={toggleThumbnails}>

                            <MenuIcon />

                        </button>

                    </div>

                    {/* THEME */}
                    <div className="toggle-container">

                        <input
                            type="checkbox"
                            id="theme-switch"
                            className="toggle-checkbox"
                            onChange={toggleTheme}
                            checked={currentTheme === "dark"}
                        />

                        <label
                            className="toggle-label"
                            htmlFor="theme-switch"
                        >

                            <span className="toggle-button" />

                            <span className="theme-text">
                                🌞
                            </span>

                            <span className="theme-text">
                                🌙
                            </span>

                        </label>

                    </div>

                    {/* FULL SCREEN */}
                    <div>

                        <Button
                            onClick={fullscreen}
                            variant="outlined"
                        >
                            Toggle Full-Screen
                        </Button>

                    </div>

                    {/* ZOOM IN */}
                    <div>

                        <zoomPluginInstance.ZoomIn>

                            {(props) => (

                                <Button
                                    {...props}
                                    variant="outlined"
                                    onClick={props.onClick}
                                >
                                    Zoom In
                                </Button>

                            )}

                        </zoomPluginInstance.ZoomIn>

                    </div>

                    {/* ZOOM OUT */}
                    <div>

                        <zoomPluginInstance.ZoomOut>

                            {(props) => (

                                <Button
                                    {...props}
                                    variant="outlined"
                                    onClick={props.onClick}
                                >
                                    Zoom Out
                                </Button>

                            )}

                        </zoomPluginInstance.ZoomOut>

                    </div>

                </div>

                {/* PDF AREA */}
                <div className="My-pagess">

                    <div
                        style={{
                            display: "flex",
                            height: "100vh",
                            overflow: "hidden",
                        }}
                    >

                        {/* THUMBNAILS */}
                        {showThumbnails && (

                            <div
                                style={{
                                    borderRight:
                                        "1px solid rgba(0,0,0,0.2)",
                                    width: "18%",
                                    overflow: "hidden",
                                }}
                            >

                                <Thumbnails />

                            </div>

                        )}

                        {/* VIEWER */}
                        <div
                            className="pdf-viewer-container"
                            style={{
                                flexGrow: 1,
                                overflow: "hidden",
                            }}
                        >

                            <Viewer
                                fileUrl={fileUrl}
                                plugins={[
                                    themePluginInstance,
                                    thumbnailPluginInstance,
                                    zoomPluginInstance,
                                    fullScreenPluginInstance,
                                ]}
                                theme={currentTheme}
                            />

                        </div>

                    </div>

                </div>

            </Worker>

        </div>
    );
}
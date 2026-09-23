import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoGallery from "../components/VideoLectures/VideoGallery";
import { getLectureVideo } from "../Services/contentService";  // update path

const VideoPage = () => {
  const { optionTopicId ,optionId} = useParams();

  const [paperData, setPaperData] = useState([]);
  const [previousId, setPreviousId] = useState(null);
const [nextId, setNextId] = useState(null);
const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const response = await getLectureVideo(optionTopicId, optionId);
        console.log("Fetched video data:", response);
        // If API returns array directly
       // setPaperData(response || []);
        // If API returns { data: [...] }
         setPaperData(response.data.data || []);
      setPreviousId(response.data.previousId);
      setCurrentId(response.data.currentId);
      setNextId(response.data.nextId);

      } catch (err) {
        console.error(err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    if (optionTopicId) {
      fetchVideos();
    }
  }, [optionTopicId, optionId]);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <VideoGallery paperData={paperData}
  previousId={previousId}
  currentId={currentId}
  nextId={nextId}
  optionId={optionId}
  />;
};

export default VideoPage;
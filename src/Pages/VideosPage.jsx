import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoGallery from "../components/VideoLectures/VideoGallery";
import { getLectureVideo } from "../Services/contentService";  // update path

const VideoPage = () => {
  const { optionTopicId } = useParams();

  const [paperData, setPaperData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const response = await getLectureVideo(optionTopicId);

        // If API returns array directly
        setPaperData(response || []);

        // If API returns { data: [...] }
        // setPaperData(response.data || []);

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
  }, [optionTopicId]);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <VideoGallery paperData={paperData} />;
};

export default VideoPage;
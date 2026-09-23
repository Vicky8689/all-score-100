import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://localhost:7010/api";

export default function CreateVideoLecture() {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [options, setOptions] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [optionId, setOptionId] = useState("");
  const [lessonId, setLessonId] = useState("");

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // Load Courses
  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const res = await axios.get(`${API}/Maseter/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses", err);
    }
  }

  // Load Subjects
  async function loadSubjects(id) {
    try {
      const res = await axios.get(
        `${API}/Maseter/courses/${id}/subjects`
      );

      setSubjects(res.data);
    } catch (err) {
      console.error("Failed to load subjects", err);
    }
  }

  // Load Topics / Options
  async function loadOptions(id) {
    try {
      const res = await axios.get(
        `${API}/Maseter/subjects/${id}/options`
      );

      setOptions(res.data);
    } catch (err) {
      console.error("Failed to load topics", err);
    }
  }

  // Load Lessons
  async function loadLessons(id) {
    try {
      const res = await axios.get(
        `${API}/Maseter/options/${id}/lessons`
      );

      setLessons(res.data);
    } catch (err) {
      console.error("Failed to load lessons", err);
    }
  }

  // Upload Video
  const uploadVideo = async () => {
    if (!lessonId) {
      alert("Select Lesson");
      return;
    }

    if (!title.trim()) {
      alert("Enter Video Title");
      return;
    }

    if (!file) {
      alert("Select Video File");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/Content/upload-video/${lessonId}`,
        formData,
        {
          params: {
            Title: title,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Response:", res.data);

      alert(
        `Video uploaded successfully.\nVideo Id: ${
          res.data.id || res.data.videoId || "Created"
        }`
      );

      // Clear video fields
      setTitle("");
      setFile(null);

      // Reset file input
      document.getElementById("videoFile").value = "";

    } catch (err) {
      console.error("Upload Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);
      }

      alert(
        err.response?.data?.message ||
        "Video upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: 600,
        margin: "40px auto",
      }}
    >
      <h2>Create Video Lecture</h2>

      {/* Course */}
      <div style={{ marginBottom: 20 }}>
        <label>Course</label>
        <br />

        <select
          value={courseId}
          onChange={(e) => {
            const id = e.target.value;

            setCourseId(id);

            setSubjectId("");
            setOptionId("");
            setLessonId("");

            setSubjects([]);
            setOptions([]);
            setLessons([]);

            if (id) {
              loadSubjects(id);
            }
          }}
        >
          <option value="">Select Course</option>

          {courses.map((x) => (
            <option
              key={x.courseId}
              value={x.courseId}
            >
              {x.title}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div style={{ marginBottom: 20 }}>
        <label>Subject</label>
        <br />

        <select
          value={subjectId}
          disabled={!courseId}
          onChange={(e) => {
            const id = e.target.value;

            setSubjectId(id);

            setOptionId("");
            setLessonId("");

            setOptions([]);
            setLessons([]);

            if (id) {
              loadOptions(id);
            }
          }}
        >
          <option value="">Select Subject</option>

          {subjects.map((x) => (
            <option
              key={x.subjectId}
              value={x.subjectId}
            >
              {x.name}
            </option>
          ))}
        </select>
      </div>

      {/* Topic */}
      <div style={{ marginBottom: 20 }}>
        <label>Topic</label>
        <br />

        <select
          value={optionId}
          disabled={!subjectId}
          onChange={(e) => {
            const id = e.target.value;

            setOptionId(id);
            setLessonId("");

            setLessons([]);

            if (id) {
              loadLessons(id);
            }
          }}
        >
          <option value="">Select Topic</option>

          {options.map((x) => (
            <option
              key={x.id}
              value={x.id}
            >
              {x.optionName}
            </option>
          ))}
        </select>
      </div>

      {/* Lesson */}
      <div style={{ marginBottom: 20 }}>
        <label>Lesson</label>
        <br />

        <select
          value={lessonId}
          disabled={!optionId}
          onChange={(e) => {
            setLessonId(e.target.value);
          }}
        >
          <option value="">Select Lesson</option>

          {lessons.map((x) => (
            <option
              key={x.id}
              value={x.id}
            >
              {x.srNo}. {x.topicName}
            </option>
          ))}
        </select>
      </div>

      {/* Video Title */}
      <div style={{ marginBottom: 20 }}>
        <label>Video Title</label>
        <br />

        <input
          type="text"
          value={title}
          placeholder="Enter video title"
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            marginTop: 5,
          }}
        />
      </div>

      {/* Video File */}
      <div style={{ marginBottom: 20 }}>
        <label>Video File</label>
        <br />

        <input
          id="videoFile"
          type="file"
          accept="video/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        {file && (
          <div style={{ marginTop: 8 }}>
            Selected: <b>{file.name}</b>
          </div>
        )}
      </div>

      {/* Upload */}
      <button
        onClick={uploadVideo}
        disabled={loading}
      >
        {loading
          ? "Uploading..."
          : "Upload Video Lecture"}
      </button>
    </div>
  );
}


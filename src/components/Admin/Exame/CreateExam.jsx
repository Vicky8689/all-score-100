import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://localhost:7010/api";

export default function CreateExam() {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [options, setOptions] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [optionId, setOptionId] = useState("");
  const [lessonId, setLessonId] = useState("");

  const [file, setFile] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const res = await axios.get(`${API}/Maseter/courses`);
    setCourses(res.data);
  }

  async function loadSubjects(id) {
    const res = await axios.get(`${API}/Maseter/courses/${id}/subjects`);
    setSubjects(res.data);
  }

  async function loadOptions(id) {
    const res = await axios.get(`${API}/Maseter/subjects/${id}/options`);
    setOptions(res.data);
  }

  async function loadLessons(id) {
    const res = await axios.get(`${API}/Maseter/options/${id}/lessons`);
    setLessons(res.data);
  }

  const upload = async () => {
    if (!lessonId) {
      alert("Select Lesson");
      return;
    }

    if (!file) {
      alert("Select Excel File");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${API}/Exam/create-from-excel/${lessonId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(
        `Exam Created Successfully.\nExam Id : ${res.data.examId}`
      );
    } catch (err) {
      alert("Upload Failed");
      console.log(err);
    }
  };

  return (
    <div style={{ width: 600, margin: "40px auto" }}>
      <h2>Create Exam From Excel</h2>

      <div style={{ marginBottom: 20 }}>
        <label>Course</label>
        <br />

        <select
          value={courseId}
          onChange={(e) => {
            setCourseId(e.target.value);
            setSubjectId("");
            setOptionId("");
            setLessonId("");
            setSubjects([]);
            setOptions([]);
            setLessons([]);
            loadSubjects(e.target.value);
          }}
        >
          <option value="">Select Course</option>

          {courses.map((x) => (
            <option key={x.courseId} value={x.courseId}>
              {x.title}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Subject</label>
        <br />

        <select
          value={subjectId}
          disabled={!courseId}
          onChange={(e) => {
            setSubjectId(e.target.value);
            setOptionId("");
            setLessonId("");
            setOptions([]);
            setLessons([]);
            loadOptions(e.target.value);
          }}
        >
          <option value="">Select Subject</option>

          {subjects.map((x) => (
            <option key={x.subjectId} value={x.subjectId}>
              {x.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Topic</label>
        <br />

        <select
          value={optionId}
          disabled={!subjectId}
          onChange={(e) => {
            setOptionId(e.target.value);
            setLessonId("");
            setLessons([]);
            loadLessons(e.target.value);
          }}
        >
          <option value="">Select Topic</option>

          {options.map((x) => (
            <option key={x.id} value={x.id}>
              {x.optionName}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Lesson</label>
        <br />

        <select
          value={lessonId}
          disabled={!optionId}
          onChange={(e) => setLessonId(e.target.value)}
        >
          <option value="">Select Lesson</option>

          {lessons.map((x) => (
            <option key={x.id} value={x.id}>
              {x.srNo}. {x.topicName}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button onClick={upload}>
        Upload Excel & Create Exam
      </button>
    </div>
  );
}
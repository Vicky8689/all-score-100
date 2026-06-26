import React, { useState } from "react";
import api from "../../../Services/api";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    order: 1,
    subjects: []
  });

  // ================= COURSE INPUT =================
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // ================= SUBJECT =================
  const addSubject = () => {
    setCourse({
      ...course,
      subjects: [
        ...course.subjects,
        {
          name: "",
          description: "",
          options: []
        }
      ]
    });
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...course.subjects];
    updated[index][field] = value;
    setCourse({ ...course, subjects: updated });
  };

  // ================= OPTION =================
  const addOption = (sIndex) => {
    const updated = [...course.subjects];
    updated[sIndex].options.push({
      optionName: "",
      description: "",
      topics: []
    });
    setCourse({ ...course, subjects: updated });
  };

  const handleOptionChange = (sIndex, oIndex, field, value) => {
    const updated = [...course.subjects];
    updated[sIndex].options[oIndex][field] = value;
    setCourse({ ...course, subjects: updated });
  };

  // ================= TOPIC =================
  const addTopic = (sIndex, oIndex) => {
    const updated = [...course.subjects];
    updated[sIndex].options[oIndex].topics.push({
      srNo: 1,
      topicName: "",
      notesType: "Theory",
      lectureType: "Video",
      testSeries: "Mock Test",
      videos: [
        {
          title: "",
          url: "",
          thumbnail: "img/admin.jpg"
        }
      ]
    });
    setCourse({ ...course, subjects: updated });
  };

  const handleTopicChange = (sIndex, oIndex, tIndex, field, value) => {
    const updated = [...course.subjects];
    updated[sIndex].options[oIndex].topics[tIndex][field] = value;
    setCourse({ ...course, subjects: updated });
  };

  // ================= VIDEO =================
  const handleVideoChange = (sIndex, oIndex, tIndex, field, value) => {
    const updated = [...course.subjects];
    updated[sIndex].options[oIndex].topics[tIndex].videos[0][field] = value;
    setCourse({ ...course, subjects: updated });
  };

  // ================= SUBMIT API =================
  const handleSubmit = async () => {
    try {
      const res = await api.post(
        "https://localhost:7010/api/Courses/add",
        course,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("Course Added Successfully!");
      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error adding course");
    }
  };

  // ================= UI =================
  return (
    <div style={{ padding: 20 }}>
      <h2>Add Course</h2>

      <input
        name="title"
        placeholder="Course Title"
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
      />

      <button onClick={addSubject}>+ Add Subject</button>

      {course.subjects.map((sub, sIndex) => (
        <div key={sIndex} style={{ border: "1px solid black", margin: 10 }}>
          <h3>Subject {sIndex + 1}</h3>

          <input
            placeholder="Subject Name"
            onChange={(e) =>
              handleSubjectChange(sIndex, "name", e.target.value)
            }
          />

          <button onClick={() => addOption(sIndex)}>+ Add Option</button>

          {sub.options.map((opt, oIndex) => (
            <div key={oIndex} style={{ marginLeft: 20 }}>
              <h4>Option</h4>

              <input
                placeholder="Option Name (11th / 12th)"
                onChange={(e) =>
                  handleOptionChange(
                    sIndex,
                    oIndex,
                    "optionName",
                    e.target.value
                  )
                }
              />

              <button onClick={() => addTopic(sIndex, oIndex)}>
                + Add Topic
              </button>

              {opt.topics.map((topic, tIndex) => (
                <div key={tIndex} style={{ marginLeft: 20 }}>
                  <input
                    placeholder="Topic Name"
                    onChange={(e) =>
                      handleTopicChange(
                        sIndex,
                        oIndex,
                        tIndex,
                        "topicName",
                        e.target.value
                      )
                    }
                  />

                  <input
                    placeholder="Video Title"
                    onChange={(e) =>
                      handleVideoChange(
                        sIndex,
                        oIndex,
                        tIndex,
                        "title",
                        e.target.value
                      )
                    }
                  />

                  <input
                    placeholder="Video URL"
                    onChange={(e) =>
                      handleVideoChange(
                        sIndex,
                        oIndex,
                        tIndex,
                        "url",
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        🚀 Submit Course
      </button>
    </div>
  );
};

export default AddCourse;

import React, { useState } from "react";
import api from "../../../Services/api";
import "./AddCourse.css";

const createVideo = () => ({
  title: "",
  url: "",
  thumbnail: "img/admin.jpg",
});

const createTopic = (srNo = 1) => ({
  srNo,
  topicName: "",
  notesType: "Theory",
  lectureType: "Video",
  testSeries: "Mock Test",
  videos: [createVideo()],
});

const createOption = (optionName = "") => ({
  optionName,
  description: "",
  topics: [],
});

const createSubject = (name, description = "") => ({
  name,
  description,
  options: [],
});

const samples = [
  {
    title: "JEE Preparation",
    description: "Complete preparation for JEE aspirants.",
    category: "Engineering Entrance",
    order: 1,
    subjects: [
      {
        ...createSubject("Physics", "Mechanics and modern physics"),
        options: [
          {
            ...createOption("Class 11"),
            topics: [
              {
                ...createTopic(1),
                topicName: "Motion in a Straight Line",
                videos: [
                  {
                    title: "Introduction to Motion",
                    url: "https://www.youtube.com/watch?v=sample1",
                    thumbnail: "img/admin.jpg",
                  },
                ],
              },
              {
                ...createTopic(2),
                topicName: "Laws of Motion",
              },
            ],
          },
          createOption("Class 12"),
        ],
      },
      {
        ...createSubject("Chemistry"),
        options: [
          createOption("JEE Main"),
          createOption("JEE Advanced"),
        ],
      },
      {
        ...createSubject("Mathematics"),
        options: [
          createOption("Class 11"),
          createOption("Class 12"),
        ],
      },
    ],
  },
  {
    title: "Class 12 Science",
    description: "Learning resources for Class 12 science students.",
    category: "School Education",
    order: 2,
    subjects: [
      {
        ...createSubject("Physics"),
        options: [createOption("CBSE Class 12")],
      },
      {
        ...createSubject("Chemistry"),
        options: [createOption("CBSE Class 12")],
      },
      {
        ...createSubject("Mathematics"),
        options: [createOption("CBSE Class 12")],
      },
      {
        ...createSubject("Biology"),
        options: [createOption("CBSE Class 12")],
      },
    ],
  },
];

const subjectChoices = [
  { name: "Physics", icon: "⚛️", color: "blue" },
  { name: "Chemistry", icon: "🧪", color: "green" },
  { name: "Mathematics", icon: "📐", color: "purple" },
  { name: "Biology", icon: "🧬", color: "orange" },
  { name: "Computer Science", icon: "💻", color: "pink" },
];

const steps = [
  "Course details",
  "Choose subjects",
  "Build content",
  "Review & publish",
];

const AddCourse = () => {
  const [step, setStep] = useState(0);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    order: 1,
    subjects: [],
  });

  const [activeSubject, setActiveSubject] = useState(0);
  const [activeOption, setActiveOption] = useState(0);
  const [customSubject, setCustomSubject] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // All sections start expanded unless explicitly collapsed.
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [expandedOptions, setExpandedOptions] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  const updateCourse = (field, value) => {
    setCourse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ----------------------------------------
  // COLLAPSIBLE SECTION HANDLERS
  // ----------------------------------------

  const toggleSubject = (index) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [index]: !(prev[index] ?? true),
    }));
  };

  const toggleOption = (sIndex, oIndex) => {
    const key = `${sIndex}-${oIndex}`;

    setExpandedOptions((prev) => ({
      ...prev,
      [key]: !(prev[key] ?? true),
    }));
  };

  const toggleTopic = (sIndex, oIndex, tIndex) => {
    const key = `${sIndex}-${oIndex}-${tIndex}`;

    setExpandedTopics((prev) => ({
      ...prev,
      [key]: !(prev[key] ?? true),
    }));
  };

  // ----------------------------------------
  // UPDATE SUBJECT, OPTION, TOPIC AND VIDEO
  // ----------------------------------------

  const updateSubject = (sIndex, field, value) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === sIndex
          ? { ...subject, [field]: value }
          : subject
      ),
    }));
  };

  const updateOption = (sIndex, oIndex, field, value) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, si) =>
        si !== sIndex
          ? subject
          : {
              ...subject,
              options: subject.options.map((option, oi) =>
                oi === oIndex
                  ? { ...option, [field]: value }
                  : option
              ),
            }
      ),
    }));
  };

  const updateTopic = (
    sIndex,
    oIndex,
    tIndex,
    field,
    value
  ) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, si) =>
        si !== sIndex
          ? subject
          : {
              ...subject,
              options: subject.options.map((option, oi) =>
                oi !== oIndex
                  ? option
                  : {
                      ...option,
                      topics: option.topics.map((topic, ti) =>
                        ti === tIndex
                          ? { ...topic, [field]: value }
                          : topic
                      ),
                    }
              ),
            }
      ),
    }));
  };

  const updateVideo = (
    sIndex,
    oIndex,
    tIndex,
    vIndex,
    field,
    value
  ) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, si) =>
        si !== sIndex
          ? subject
          : {
              ...subject,
              options: subject.options.map((option, oi) =>
                oi !== oIndex
                  ? option
                  : {
                      ...option,
                      topics: option.topics.map((topic, ti) =>
                        ti !== tIndex
                          ? topic
                          : {
                              ...topic,
                              videos: topic.videos.map(
                                (video, vi) =>
                                  vi === vIndex
                                    ? { ...video, [field]: value }
                                    : video
                              ),
                            }
                      ),
                    }
              ),
            }
      ),
    }));
  };

  // ----------------------------------------
  // ADD AND REMOVE SUBJECTS
  // ----------------------------------------

  const addSubject = (name) => {
    const trimmedName = name.trim();

    if (
      !trimmedName ||
      course.subjects.some(
        (subject) =>
          subject.name.toLowerCase() ===
          trimmedName.toLowerCase()
      )
    ) {
      return;
    }

    const newIndex = course.subjects.length;

    setCourse((prev) => ({
      ...prev,
      subjects: [
        ...prev.subjects,
        createSubject(trimmedName),
      ],
    }));

    setActiveSubject(newIndex);
    setActiveOption(0);
    setExpandedSubjects((prev) => ({
      ...prev,
      [newIndex]: true,
    }));
    setMessage("");
  };

  const removeSubject = (sIndex) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.filter(
        (_, i) => i !== sIndex
      ),
    }));

    setActiveSubject((prev) => {
      if (sIndex < prev) return prev - 1;
      if (sIndex === prev) {
        return Math.max(
          0,
          Math.min(prev, course.subjects.length - 2)
        );
      }
      return prev;
    });

    setActiveOption(0);

    // Clear collapse states because subject indexes may shift.
    setExpandedSubjects({});
    setExpandedOptions({});
    setExpandedTopics({});
  };

  // ----------------------------------------
  // ADD AND REMOVE OPTIONS
  // ----------------------------------------

  const addOption = (sIndex) => {
    const nextIndex =
      course.subjects[sIndex].options.length;

    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === sIndex
          ? {
              ...subject,
              options: [
                ...subject.options,
                createOption(),
              ],
            }
          : subject
      ),
    }));

    setActiveOption(nextIndex);
    setExpandedOptions((prev) => ({
      ...prev,
      [`${sIndex}-${nextIndex}`]: true,
    }));
  };

  const removeOption = (sIndex, oIndex) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, si) =>
        si === sIndex
          ? {
              ...subject,
              options: subject.options.filter(
                (_, oi) => oi !== oIndex
              ),
            }
          : subject
      ),
    }));

    setActiveOption(0);
    setExpandedOptions({});
    setExpandedTopics({});
  };

  // ----------------------------------------
  // ADD AND REMOVE TOPICS
  // ----------------------------------------

  const addTopic = (sIndex, oIndex) => {
    const topics =
      course.subjects[sIndex].options[oIndex].topics;

    const newIndex = topics.length;

    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, si) =>
        si !== sIndex
          ? subject
          : {
              ...subject,
              options: subject.options.map((option, oi) =>
                oi !== oIndex
                  ? option
                  : {
                      ...option,
                      topics: [
                        ...option.topics,
                        createTopic(topics.length + 1),
                      ],
                    }
              ),
            }
      ),
    }));

    setExpandedTopics((prev) => ({
      ...prev,
      [`${sIndex}-${oIndex}-${newIndex}`]: true,
    }));
  };

  const removeTopic = (sIndex, oIndex, tIndex) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, si) =>
        si !== sIndex
          ? subject
          : {
              ...subject,
              options: subject.options.map((option, oi) =>
                oi !== oIndex
                  ? option
                  : {
                      ...option,
                      topics: option.topics
                        .filter((_, ti) => ti !== tIndex)
                        .map((topic, index) => ({
                          ...topic,
                          srNo: index + 1,
                        })),
                    }
              ),
            }
      ),
    }));

    setExpandedTopics({});
  };

  // ----------------------------------------
  // ADD AND REMOVE VIDEOS
  // ----------------------------------------

  const addVideo = (sIndex, oIndex, tIndex) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, si) =>
        si !== sIndex
          ? subject
          : {
              ...subject,
              options: subject.options.map((option, oi) =>
                oi !== oIndex
                  ? option
                  : {
                      ...option,
                      topics: option.topics.map((topic, ti) =>
                        ti === tIndex
                          ? {
                              ...topic,
                              videos: [
                                ...topic.videos,
                                createVideo(),
                              ],
                            }
                          : topic
                      ),
                    }
              ),
            }
      ),
    }));
  };

  const removeVideo = (
    sIndex,
    oIndex,
    tIndex,
    vIndex
  ) => {
    setCourse((prev) => ({
      ...prev,
      subjects: prev.subjects.map((subject, si) =>
        si !== sIndex
          ? subject
          : {
              ...subject,
              options: subject.options.map((option, oi) =>
                oi !== oIndex
                  ? option
                  : {
                      ...option,
                      topics: option.topics.map((topic, ti) =>
                        ti === tIndex
                          ? {
                              ...topic,
                              videos: topic.videos.filter(
                                (_, vi) => vi !== vIndex
                              ),
                            }
                          : topic
                      ),
                    }
              ),
            }
      ),
    }));
  };

  // ----------------------------------------
  // SAMPLE COURSE
  // ----------------------------------------

  const loadSample = (sample) => {
    setCourse(JSON.parse(JSON.stringify(sample)));
    setStep(0);
    setActiveSubject(0);
    setActiveOption(0);
    setExpandedSubjects({});
    setExpandedOptions({});
    setExpandedTopics({});
    setMessage(
      "Sample course loaded. You can edit everything."
    );
  };

  // ----------------------------------------
  // VALIDATION
  // ----------------------------------------

  const validate = () => {
    if (step === 0) {
      if (!course.title.trim()) {
        return "Please enter a course title.";
      }

      if (!course.category.trim()) {
        return "Please enter a category.";
      }
    }

    if (step === 1 && course.subjects.length === 0) {
      return "Select or add at least one subject.";
    }

    if (step === 2) {
      if (
        course.subjects.some(
          (subject) => !subject.name.trim()
        )
      ) {
        return "Every subject needs a name.";
      }

      for (const subject of course.subjects) {
        if (
          subject.options.some(
            (option) => !option.optionName.trim()
          )
        ) {
          return `Enter an option name for ${subject.name}.`;
        }

        for (const option of subject.options) {
          if (
            option.topics.some(
              (topic) => !topic.topicName.trim()
            )
          ) {
            return `Enter all topic names in ${subject.name}.`;
          }

          if (
            option.topics.some((topic) =>
              topic.videos.some(
                (video) =>
                  video.url.trim() &&
                  !video.title.trim()
              )
            )
          ) {
            return "Add a title for each video URL.";
          }
        }
      }
    }

    return "";
  };

  const nextStep = () => {
    const error = validate();

    if (error) {
      setMessage(error);
      return;
    }

    setMessage("");
    setStep((prev) =>
      Math.min(prev + 1, steps.length - 1)
    );
  };

  // ----------------------------------------
  // PUBLISH COURSE
  // ----------------------------------------

  const submitCourse = async () => {
    const error = validate();

    if (error) {
      setMessage(error);
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const res = await api.post("/Courses/add", course);

      setMessage("Course published successfully!");
      console.log("Course created:", res.data);
    } catch (err) {
      const details =
        err.response?.data?.message ||
        err.response?.data?.title ||
        (typeof err.response?.data === "string"
          ? err.response.data
          : "") ||
        err.message;

      setMessage(`Could not publish course: ${details}`);

      console.error(
        "Course creation failed:",
        err.response?.data || err
      );
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------
  // DERIVED VALUES
  // ----------------------------------------

  const selectedSubject =
    course.subjects[activeSubject];

  const topicCount = course.subjects.reduce(
    (total, subject) =>
      total +
      subject.options.reduce(
        (sum, option) => sum + option.topics.length,
        0
      ),
    0
  );

  const videoCount = course.subjects.reduce(
    (total, subject) =>
      total +
      subject.options.reduce(
        (optionSum, option) =>
          optionSum +
          option.topics.reduce(
            (topicSum, topic) =>
              topicSum + topic.videos.length,
            0
          ),
        0
      ),
    0
  );

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  return (
    <div className="course-builder">
      <header className="builder-header">
        <div>
          <span className="eyebrow">
            ALLSCORE100 / CONTENT STUDIO
          </span>
          <h1>Create your course ✨</h1>
          <p>
            Build a learning experience, one step at a time.
          </p>
        </div>

        <span className="draft-badge">● Draft</span>
      </header>

      <div className="builder-progress">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            className={`progress-step ${
              index === step
                ? "active"
                : index < step
                  ? "completed"
                  : ""
            }`}
            onClick={() => {
              if (index <= step) setStep(index);
            }}
          >
            <span className="step-number">
              {index < step ? "✓" : index + 1}
            </span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      <main className="builder-content">
        <section className="builder-main">
          {message && (
            <div
              className={`builder-message ${
                message.toLowerCase().includes("successfully")
                  ? "success"
                  : ""
              }`}
              role="status"
            >
              {message}

              <button
                type="button"
                onClick={() => setMessage("")}
                aria-label="Dismiss message"
              >
                ×
              </button>
            </div>
          )}

          {/* STEP 1: COURSE DETAILS */}

          {step === 0 && (
            <>
              <div className="section-heading">
                <span className="section-kicker">
                  STEP 01
                </span>
                <h2>Let's start with the basics</h2>
                <p>
                  Give your course a name and a clear purpose.
                </p>
              </div>

              <div className="form-card">
                <label>
                  Course title{" "}
                  <span className="required">*</span>

                  <input
                    value={course.title}
                    onChange={(e) =>
                      updateCourse("title", e.target.value)
                    }
                    placeholder="e.g. Complete JEE Preparation"
                  />
                </label>

                <label>
                  Description

                  <textarea
                    value={course.description}
                    onChange={(e) =>
                      updateCourse(
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="What will students learn in this course?"
                    rows={4}
                  />
                </label>

                <div className="form-grid">
                  <label>
                    Category{" "}
                    <span className="required">*</span>

                    <input
                      value={course.category}
                      onChange={(e) =>
                        updateCourse(
                          "category",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Engineering Entrance"
                    />
                  </label>

                  <label>
                    Display order

                    <input
                      type="number"
                      min="1"
                      value={course.order}
                      onChange={(e) =>
                        updateCourse(
                          "order",
                          Number(e.target.value)
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="sample-heading">
                <div>
                  <h3>Or start with a sample</h3>
                  <p>
                    Load a sample course and customize it.
                  </p>
                </div>
              </div>

              <div className="sample-grid">
                {samples.map((sample, index) => (
                  <button
                    type="button"
                    className="sample-card"
                    key={sample.title}
                    onClick={() => loadSample(sample)}
                  >
                    <span
                      className={`sample-icon sample-${index}`}
                    >
                      {index === 0 ? "🎯" : "🎓"}
                    </span>

                    <span className="sample-name">
                      {sample.title}
                    </span>

                    <span className="sample-description">
                      {sample.subjects.length} subjects ·
                      Sample course
                    </span>

                    <span className="sample-action">
                      Use this sample →
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* STEP 2: CHOOSE SUBJECTS */}

          {step === 1 && (
            <>
              <div className="section-heading">
                <span className="section-kicker">
                  STEP 02
                </span>
                <h2>What will students learn?</h2>
                <p>
                  Select subjects to include in{" "}
                  {course.title || "your course"}.
                </p>
              </div>

              <div className="subject-grid">
                {subjectChoices.map((item) => {
                  const selected = course.subjects.some(
                    (subject) =>
                      subject.name === item.name
                  );

                  return (
                    <button
                      type="button"
                      key={item.name}
                      className={`subject-card ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => {
                        if (selected) {
                          const index =
                            course.subjects.findIndex(
                              (subject) =>
                                subject.name === item.name
                            );

                          removeSubject(index);
                        } else {
                          addSubject(item.name);
                        }
                      }}
                    >
                      <span
                        className={`subject-icon ${item.color}`}
                      >
                        {item.icon}
                      </span>

                      <strong>{item.name}</strong>

                      <span className="subject-selection">
                        {selected
                          ? "✓ Added"
                          : "+ Select subject"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="custom-subject-box">
                <h3>Have another subject?</h3>
                <p>
                  Add any custom subject to your course.
                </p>

                <form
                  className="inline-add"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addSubject(customSubject);
                    setCustomSubject("");
                  }}
                >
                  <input
                    value={customSubject}
                    onChange={(e) =>
                      setCustomSubject(e.target.value)
                    }
                    placeholder="e.g. English, Economics, Reasoning"
                  />

                  <button
                    className="secondary-button"
                    type="submit"
                  >
                    + Add subject
                  </button>
                </form>
              </div>

              <div className="selected-summary">
                <strong>
                  {course.subjects.length} subjects selected
                </strong>

                <div className="selected-chips">
                  {course.subjects.map(
                    (subject, index) => (
                      <button
                        type="button"
                        className="selected-chip"
                        key={`${subject.name}-${index}`}
                        onClick={() => removeSubject(index)}
                        title={`Remove ${subject.name}`}
                      >
                        {subject.name} <span>×</span>
                      </button>
                    )
                  )}

                  {course.subjects.length === 0 && (
                    <span className="muted">
                      Your subjects will appear here.
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {/* STEP 3: BUILD CONTENT */}

          {step === 2 && (
            <>
              <div className="section-heading">
                <span className="section-kicker">
                  STEP 03
                </span>
                <h2>Build your learning path</h2>
                <p>
                  Add class options, chapters and videos to
                  each subject.
                </p>
              </div>

              {course.subjects.length === 0 ? (
                <div className="empty-state">
                  <span>📚</span>
                  <h3>No subjects added yet</h3>
                  <p>
                    Go back and choose at least one subject first.
                  </p>

                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    Choose subjects
                  </button>
                </div>
              ) : (
                <div className="content-editor">
                  {/* SUBJECT SIDEBAR */}

                  <div className="editor-sidebar">
                    <span className="sidebar-label">
                      YOUR SUBJECTS
                    </span>

                    {course.subjects.map(
                      (subject, index) => (
                        <button
                          type="button"
                          key={`${subject.name}-${index}`}
                          className={`editor-subject ${
                            activeSubject === index
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            setActiveSubject(index);
                            setActiveOption(0);
                          }}
                        >
                          <span className="editor-subject-icon">
                            📘
                          </span>

                          <span>
                            {subject.name ||
                              "Untitled subject"}
                          </span>

                          <span className="subject-count">
                            {subject.options.length}
                          </span>
                        </button>
                      )
                    )}
                  </div>

                  {/* EDITOR PANEL */}

                  <div className="editor-panel">
                    {selectedSubject && (
                      <>
                        {/* COLLAPSIBLE SUBJECT */}

                        <div className="editor-title-row">
                          <button
                            type="button"
                            className="collapse-heading"
                            onClick={() =>
                              toggleSubject(activeSubject)
                            }
                            aria-expanded={
                              expandedSubjects[
                                activeSubject
                              ] ?? true
                            }
                          >
                            <span className="collapse-arrow">
                              {(
                                expandedSubjects[
                                  activeSubject
                                ] ?? true
                              )
                                ? "▾"
                                : "▸"}
                            </span>

                            <div>
                              <span className="section-kicker">
                                SUBJECT
                              </span>

                              <h3>
                                {selectedSubject.name ||
                                  "Untitled subject"}
                              </h3>
                            </div>
                          </button>

                          <button
                            type="button"
                            className="text-danger"
                            onClick={() =>
                              removeSubject(activeSubject)
                            }
                          >
                            Remove
                          </button>
                        </div>

                        {(
                          expandedSubjects[
                            activeSubject
                          ] ?? true
                        ) && (
                          <div className="collapsible-body">
                            <label>
                              Subject name

                              <input
                                value={selectedSubject.name}
                                onChange={(e) =>
                                  updateSubject(
                                    activeSubject,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Subject name"
                              />
                            </label>

                            <label>
                              Subject description

                              <input
                                value={
                                  selectedSubject.description
                                }
                                onChange={(e) =>
                                  updateSubject(
                                    activeSubject,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Optional description"
                              />
                            </label>
                          </div>
                        )}

                        {/* LEARNING OPTIONS HEADING */}

                        <div className="options-heading">
                          <div>
                            <h4>Learning options</h4>
                            <p>
                              Class, exam or curriculum
                            </p>
                          </div>

                         
                        </div>

                        {selectedSubject.options.length ===
                          0 && (
                          <div className="small-empty">
                            <span>🗂️</span>
                            <p>
                              Add an option like Class 11,
                              Class 12 or JEE Advanced.
                            </p>
                          </div>
                        )}

                        {/* OPTIONS */}

                        {selectedSubject.options.map(
                          (option, oIndex) => {
                            const optionKey =
                              `${activeSubject}-${oIndex}`;

                            const isOptionExpanded =
                              expandedOptions[optionKey] ??
                              true;

                            return (
                              <div
                                className="option-card"
                                key={oIndex}
                              >
                                {/* COLLAPSIBLE OPTION HEADER */}

                                <div className="option-top">
                                  <button
                                    type="button"
                                    className="collapse-heading option-collapse-heading"
                                    onClick={() =>
                                      toggleOption(
                                        activeSubject,
                                        oIndex
                                      )
                                    }
                                    aria-expanded={
                                      isOptionExpanded
                                    }
                                  >
                                    <span className="collapse-arrow">
                                      {isOptionExpanded
                                        ? "▾"
                                        : "▸"}
                                    </span>

                                    <div>
                                      <span className="option-number">
                                        OPTION {oIndex + 1}
                                      </span>

                                      <div className="collapse-title">
                                        {option.optionName ||
                                          "Untitled option"}
                                      </div>

                                      <span className="collapse-subtitle">
                                        {option.topics.length}{" "}
                                        topics
                                      </span>
                                    </div>
                                  </button>

                                  <button
                                    type="button"
                                    className="icon-button"
                                    onClick={() =>
                                      removeOption(
                                        activeSubject,
                                        oIndex
                                      )
                                    }
                                    aria-label="Remove option"
                                    title="Remove option"
                                  >
                                    ×
                                  </button>
                                </div>

                                {/* COLLAPSIBLE OPTION BODY */}

                                {isOptionExpanded && (
                                  <div className="collapsible-body">
                                    <label>
                                      Option name

                                      <input
                                        value={
                                          option.optionName
                                        }
                                        onChange={(e) =>
                                          updateOption(
                                            activeSubject,
                                            oIndex,
                                            "optionName",
                                            e.target.value
                                          )
                                        }
                                        placeholder="e.g. Class 11 / JEE Main"
                                      />
                                    </label>

                                    <label>
                                      Description

                                      <input
                                        value={
                                          option.description
                                        }
                                        onChange={(e) =>
                                          updateOption(
                                            activeSubject,
                                            oIndex,
                                            "description",
                                            e.target.value
                                          )
                                        }
                                        placeholder="Optional option description"
                                      />
                                    </label>

                                    {/* TOPICS HEADING */}

                                    <div className="topic-heading">
                                      <div>
                                        <h4>
                                          Topics & chapters
                                        </h4>
                                        <p>
                                          {option.topics.length}{" "}
                                          topics added
                                        </p>
                                      </div>

                                      <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={() =>
                                          addTopic(
                                            activeSubject,
                                            oIndex
                                          )
                                        }
                                      >
                                        + Add topic
                                      </button>
                                    </div>

                                    {option.topics.length ===
                                      0 && (
                                      <div className="small-empty">
                                        <span>📝</span>
                                        <p>
                                          No topics yet. Add
                                          your first topic.
                                        </p>
                                      </div>
                                    )}

                                    {/* TOPICS */}

                                    {option.topics.map(
                                      (topic, tIndex) => {
                                        const topicKey =
                                          `${activeSubject}-${oIndex}-${tIndex}`;

                                        const isTopicExpanded =
                                          expandedTopics[
                                            topicKey
                                          ] ?? true;

                                        return (
                                          <div
                                            className="topic-card"
                                            key={tIndex}
                                          >
                                            {/* COLLAPSIBLE TOPIC HEADER */}

                                            <div className="topic-title-row">
                                              <button
                                                type="button"
                                                className="collapse-heading topic-collapse-heading"
                                                onClick={() =>
                                                  toggleTopic(
                                                    activeSubject,
                                                    oIndex,
                                                    tIndex
                                                  )
                                                }
                                                aria-expanded={
                                                  isTopicExpanded
                                                }
                                              >
                                                <span className="topic-number">
                                                  {String(
                                                    tIndex + 1
                                                  ).padStart(
                                                    2,
                                                    "0"
                                                  )}
                                                </span>

                                                <div className="topic-heading-text">
                                                  <strong>
                                                    {topic.topicName ||
                                                      `New topic ${
                                                        tIndex +
                                                        1
                                                      }`}
                                                  </strong>

                                                  <span className="collapse-subtitle">
                                                    {topic.notesType}{" "}
                                                    ·{" "}
                                                    {topic.lectureType}
                                                  </span>
                                                </div>

                                                <span className="collapse-arrow">
                                                  {isTopicExpanded
                                                    ? "▾"
                                                    : "▸"}
                                                </span>
                                              </button>

                                              <button
                                                type="button"
                                                className="icon-button"
                                                onClick={() =>
                                                  removeTopic(
                                                    activeSubject,
                                                    oIndex,
                                                    tIndex
                                                  )
                                                }
                                                aria-label="Remove topic"
                                                title="Remove topic"
                                              >
                                                ×
                                              </button>
                                            </div>

                                            {/* COLLAPSIBLE TOPIC BODY */}

                                            {isTopicExpanded && (
                                              <div className="collapsible-body">
                                                <label>
                                                  Topic name

                                                  <input
                                                    value={
                                                      topic.topicName
                                                    }
                                                    onChange={(e) =>
                                                      updateTopic(
                                                        activeSubject,
                                                        oIndex,
                                                        tIndex,
                                                        "topicName",
                                                        e.target.value
                                                      )
                                                    }
                                                    placeholder="e.g. Laws of Motion"
                                                  />
                                                </label>

                                                <div className="form-grid">
                                                  <label>
                                                    Notes type

                                                    <select
                                                      value={
                                                        topic.notesType
                                                      }
                                                      onChange={(e) =>
                                                        updateTopic(
                                                          activeSubject,
                                                          oIndex,
                                                          tIndex,
                                                          "notesType",
                                                          e.target.value
                                                        )
                                                      }
                                                    >
                                                      <option>
                                                        Theory
                                                      </option>
                                                      <option>
                                                        Numerical
                                                      </option>
                                                      <option>
                                                        Revision
                                                      </option>
                                                      <option>
                                                        Formula
                                                      </option>
                                                      <option>
                                                        PDF
                                                      </option>
                                                    </select>
                                                  </label>

                                                  <label>
                                                    Lecture type

                                                    <select
                                                      value={
                                                        topic.lectureType
                                                      }
                                                      onChange={(e) =>
                                                        updateTopic(
                                                          activeSubject,
                                                          oIndex,
                                                          tIndex,
                                                          "lectureType",
                                                          e.target.value
                                                        )
                                                      }
                                                    >
                                                      <option>
                                                        Video
                                                      </option>
                                                      <option>
                                                        Live
                                                      </option>
                                                      <option>
                                                        Recorded
                                                      </option>
                                                      <option>
                                                        Text
                                                      </option>
                                                    </select>
                                                  </label>
                                                </div>

                                                <label>
                                                  Test series

                                                  <select
                                                    value={
                                                      topic.testSeries
                                                    }
                                                    onChange={(e) =>
                                                      updateTopic(
                                                        activeSubject,
                                                        oIndex,
                                                        tIndex,
                                                        "testSeries",
                                                        e.target.value
                                                      )
                                                    }
                                                  >
                                                    <option>
                                                      Mock Test
                                                    </option>
                                                    <option>
                                                      Chapter Test
                                                    </option>
                                                    <option>
                                                      Practice Questions
                                                    </option>
                                                    <option>
                                                      Previous Year Questions
                                                    </option>
                                                    <option>
                                                      None
                                                    </option>
                                                  </select>
                                                </label>

                                                {/* VIDEO EDITOR */}

                                                {/*
                                                <div className="video-section">
                                                  <div className="video-heading">
                                                    <h5>🎬 Videos</h5>

                                                    <button
                                                      type="button"
                                                      className="text-button"
                                                      onClick={() =>
                                                        addVideo(
                                                          activeSubject,
                                                          oIndex,
                                                          tIndex
                                                        )
                                                      }
                                                    >
                                                      + Add video
                                                    </button>
                                                  </div>

                                                  {topic.videos.map(
                                                    (video, vIndex) => (
                                                      <div
                                                        className="video-card"
                                                        key={vIndex}
                                                      >
                                                        <div className="video-title-row">
                                                          <strong>
                                                            Video {vIndex + 1}
                                                          </strong>

                                                          <button
                                                            type="button"
                                                            className="icon-button"
                                                            onClick={() =>
                                                              removeVideo(
                                                                activeSubject,
                                                                oIndex,
                                                                tIndex,
                                                                vIndex
                                                              )
                                                            }
                                                            aria-label="Remove video"
                                                          >
                                                            ×
                                                          </button>
                                                        </div>

                                                        <label>
                                                          Video title

                                                          <input
                                                            value={video.title}
                                                            onChange={(e) =>
                                                              updateVideo(
                                                                activeSubject,
                                                                oIndex,
                                                                tIndex,
                                                                vIndex,
                                                                "title",
                                                                e.target.value
                                                              )
                                                            }
                                                            placeholder="Video title"
                                                          />
                                                        </label>

                                                        <label>
                                                          Video URL

                                                          <input
                                                            type="url"
                                                            value={video.url}
                                                            onChange={(e) =>
                                                              updateVideo(
                                                                activeSubject,
                                                                oIndex,
                                                                tIndex,
                                                                vIndex,
                                                                "url",
                                                                e.target.value
                                                              )
                                                            }
                                                            placeholder="https://..."
                                                          />
                                                        </label>

                                                        <label>
                                                          Thumbnail URL or path

                                                          <input
                                                            value={video.thumbnail}
                                                            onChange={(e) =>
                                                              updateVideo(
                                                                activeSubject,
                                                                oIndex,
                                                                tIndex,
                                                                vIndex,
                                                                "thumbnail",
                                                                e.target.value
                                                              )
                                                            }
                                                            placeholder="img/admin.jpg"
                                                          />
                                                        </label>
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                                */}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                         <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                              addOption(activeSubject)
                            }
                          >
                            + Add option
                          </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 4: REVIEW AND PUBLISH */}

          {step === 3 && (
            <>
              <div className="section-heading">
                <span className="section-kicker">
                  STEP 04
                </span>
                <h2>Everything looking good?</h2>
                <p>
                  Review your course structure before publishing.
                </p>
              </div>

              <div className="review-hero">
                <span className="review-icon">🎓</span>

                <div>
                  <span className="section-kicker">
                    {course.category}
                  </span>

                  <h2>{course.title}</h2>

                  <p>
                    {course.description ||
                      "No description provided."}
                  </p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <span>📚</span>
                  <strong>{course.subjects.length}</strong>
                  <small>Subjects</small>
                </div>

                <div className="stat-card">
                  <span>🗂️</span>
                  <strong>
                    {course.subjects.reduce(
                      (sum, subject) =>
                        sum + subject.options.length,
                      0
                    )}
                  </strong>
                  <small>Options</small>
                </div>

                <div className="stat-card">
                  <span>📝</span>
                  <strong>{topicCount}</strong>
                  <small>Topics</small>
                </div>

                <div className="stat-card">
                  <span>🎬</span>
                  <strong>{videoCount}</strong>
                  <small>Videos</small>
                </div>
              </div>

              <div className="review-tree">
                <h3>Course structure</h3>

                {course.subjects.map((subject, si) => (
                  <details
                    className="review-subject"
                    key={si}
                    open
                  >
                    <summary>
                      <span>📘 {subject.name}</span>
                      <span>
                        {subject.options.length} options
                      </span>
                    </summary>

                    {subject.options.map(
                      (option, oi) => (
                        <details
                          className="review-option"
                          key={oi}
                        >
                          <summary>
                            <span>
                              📂 {option.optionName}
                            </span>
                            <span>
                              {option.topics.length} topics
                            </span>
                          </summary>

                          <ul>
                            {option.topics.map(
                              (topic, ti) => (
                                <li key={ti}>
                                  <span>
                                    📝 {topic.topicName}
                                  </span>
                                  <small>
                                    {topic.videos.length} videos
                                  </small>
                                </li>
                              )
                            )}
                          </ul>
                        </details>
                      )
                    )}
                  </details>
                ))}

                {course.subjects.length === 0 && (
                  <p className="muted">
                    No subjects have been added.
                  </p>
                )}
              </div>

              <button
                type="button"
                className="text-button"
                onClick={() => setStep(2)}
              >
                ← Edit course content
              </button>
            </>
          )}

          {/* FOOTER NAVIGATION */}

          <div className="builder-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setMessage("");
                setStep((prev) =>
                  Math.max(0, prev - 1)
                );
              }}
              disabled={step === 0 || saving}
            >
              ← Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                className="primary-button"
                onClick={nextStep}
                disabled={saving}
              >
                {step === 1
                  ? "Build course content"
                  : "Continue"}{" "}
                →
              </button>
            ) : (
              <button
                type="button"
                className="primary-button"
                onClick={submitCourse}
                disabled={saving}
              >
                {saving
                  ? "Publishing..."
                  : "🚀 Publish course"}
              </button>
            )}
          </div>
        </section>

        {/* RIGHT SIDEBAR */}

        <aside className="builder-aside">
          <div className="aside-card">
            <span className="aside-emoji">💡</span>
            <h3>Course checklist</h3>

            <div className="checklist-item">
              <span
                className={
                  course.title.trim() ? "check-done" : ""
                }
              >
                {course.title.trim() ? "✓" : "1"}
              </span>
              Course details
            </div>

            <div className="checklist-item">
              <span
                className={
                  course.subjects.length
                    ? "check-done"
                    : ""
                }
              >
                {course.subjects.length ? "✓" : "2"}
              </span>
              Add subjects
            </div>

            <div className="checklist-item">
              <span
                className={topicCount ? "check-done" : ""}
              >
                {topicCount ? "✓" : "3"}
              </span>
              Add topics
            </div>
          </div>

          <div className="aside-card course-outline">
            <span className="section-kicker">
              LIVE PREVIEW
            </span>

            <h3>{course.title || "Your new course"}</h3>
            <p>{course.category || "Course category"}</p>

            <div className="outline-line">
              {course.subjects.length ? (
                course.subjects.map(
                  (subject, index) => (
                    <div
                      className="outline-subject"
                      key={index}
                    >
                      <div className="outline-subject-name">
                        <span>📘</span>
                        <strong>
                          {subject.name ||
                            "Untitled subject"}
                        </strong>
                      </div>

                      {subject.options.map(
                        (option, oi) => (
                          <div
                            className="outline-child"
                            key={oi}
                          >
                            <span>↳</span>

                            <div>
                              <strong>
                                {option.optionName ||
                                  "New option"}
                              </strong>
                              <small>
                                {option.topics.length} topics
                              </small>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )
                )
              ) : (
                <p className="muted">
                  Your subjects and topics will appear
                  here as you build.
                </p>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default AddCourse;

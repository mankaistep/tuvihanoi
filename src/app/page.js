"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    day: "4",
    month: "11",
    year: "2001",
    hours: "20",
    minutes: "30",
    gender: "NAM",
    namHan: currentYear.toString(),
  });

  // 3 API sections: mỗi cái có url + method
  const [sections, setSections] = useState([
    { url: "/api/hello", method: "POST" },
    { url: "/api/second", method: "POST" },
    { url: "/api/third", method: "POST" },
    { url: "/api/", method: "POST" },
    { url: "/api/", method: "POST" },
    { url: "/api/", method: "POST" },
    { url: "/api/", method: "POST" },
    { url: "/api/", method: "POST" },
    { url: "/api/", method: "POST" },
    { url: "/api/", method: "POST" },
    { url: "/api/", method: "POST" },
  ]);

  const [responses, setResponses] = useState([null, null, null]);
  const [loading, setLoading] = useState([false, false, false]);
  const [errors, setErrors] = useState(["", "", ""]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    setSections((prev) => {
      const newSections = [...prev];
      newSections[index][field] = value;
      return newSections;
    });
  };

  const handleRequest = async (index) => {
    setLoading((prev) => prev.map((l, i) => (i === index ? true : l)));
    setErrors((prev) => prev.map((err, i) => (i === index ? "" : err)));

    try {
      const params = new URLSearchParams(formData);
      let response;

      if (sections[index].method === "GET") {
        response = await fetch(`${sections[index].url}?${params}`, {
          method: "GET",
        });
      } else {
        response = await fetch(sections[index].url, {
          method: sections[index].method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch data");

      setResponses((prev) => prev.map((r, i) => (i === index ? data : r)));
    } catch (err) {
      setErrors((prev) =>
        prev.map((e, i) => (i === index ? err.message : e))
      );
    } finally {
      setLoading((prev) => prev.map((l, i) => (i === index ? false : l)));
    }
  };

  const copyResponse = (index) => {
    if (!responses[index]) return;
    navigator.clipboard.writeText(JSON.stringify(responses[index], null, 2));
  };

  // Generate options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Birth Date Analyzer</h1>

        {/* Form nhập ngày sinh */}
        <form style={formStyle}>
          <h2>Enter Your Birth Details</h2>

          {/* Day */}
          <div>
            <label>Day:</label>
            <select name="day" value={formData.day} onChange={handleChange} required style={selectStyle}>
              <option value="">Select day</option>
              {days.map((day) => <option key={day} value={day}>{day}</option>)}
            </select>
          </div>

          {/* Month */}
          <div>
            <label>Month:</label>
            <select name="month" value={formData.month} onChange={handleChange} required style={selectStyle}>
              <option value="">Select month</option>
              {months.map((month, index) => (
                <option key={index} value={index + 1}>{month}</option>
              ))}
            </select>
          </div>

          {/* Year (birth year) */}
          <div>
            <label>Year of Birth:</label>
            <select name="year" value={formData.year} onChange={handleChange} required style={selectStyle}>
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Nam Han */}
          <div>
            <label>Year to Analyze (Năm xem hạn):</label>
            <select name="namHan" value={formData.namHan} onChange={handleChange} style={selectStyle}>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label>Hour:</label>
              <select name="hours" value={formData.hours} onChange={handleChange} style={selectStyle}>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Minute:</label>
              <select name="minutes" value={formData.minutes} onChange={handleChange} style={selectStyle}>
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} style={selectStyle}>
              <option value="NAM">Nam</option>
              <option value="NU">Nữ</option>
            </select>
          </div>
        </form>

        {/* 3 Sections output */}
        {sections.map((section, index) => (
          <div key={index} style={sectionStyle}>
            <h3>API Section {index + 1}</h3>
            <input
              type="text"
              value={section.url}
              onChange={(e) => handleSectionChange(index, "url", e.target.value)}
              style={inputStyle}
            />
            <select
              value={section.method}
              onChange={(e) => handleSectionChange(index, "method", e.target.value)}
              style={{ ...inputStyle, marginTop: "8px" }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleRequest(index)}
                disabled={loading[index]}
                style={buttonStyle}
              >
                {loading[index] ? "Loading..." : "Send Request"}
              </button>
              <button
                onClick={() => copyResponse(index)}
                disabled={!responses[index]}
                style={{ ...buttonStyle, marginLeft: "10px", backgroundColor: "#444" }}
              >
                Copy Response
              </button>
            </div>
            {errors[index] && <div style={{ color: "red" }}>{errors[index]}</div>}
            <pre style={responseStyle}>
              {responses[index]
                ? JSON.stringify(responses[index], null, 2)
                : "No response yet"}
            </pre>
          </div>
        ))}
      </main>
    </div>
  );
}

// Styles
const selectStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "14px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  padding: "10px 14px",
  fontSize: "14px",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const sectionStyle = {
  marginTop: "30px",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#fafafa",
};

const responseStyle = {
  marginTop: "10px",
  padding: "10px",
  border: "1px solid #eaeaea",
  borderRadius: "6px",
  maxHeight: "400px", // updated
  overflow: "auto",
  backgroundColor: "#f9f9f9",
  fontSize: "13px",
  whiteSpace: "pre-wrap",
};

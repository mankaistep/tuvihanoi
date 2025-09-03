"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
    hours: "12",
    minutes: "00",
    gender: "NAM", // default
    namHan: currentYear.toString(), // thêm năm xem hạn
  });

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams(formData);
      const response = await fetch(`/api/hello?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setApiData(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit} style={formStyle}>
          <h2>Enter Your Birth Details</h2>

          {/* Day */}
          <div>
            <label>Day:</label>
            <select name="day" value={formData.day} onChange={handleChange} required style={selectStyle}>
              <option value="">Select day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
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

          {/* Nam Han (Year of reading / xem hạn) */}
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

          {/* Submit */}
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Analyzing..." : "Analyze Birth Details"}
          </button>

          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>

        {/* Show raw JSON */}
        {apiData && !error && (
          <pre style={resultStyle}>{JSON.stringify(apiData, null, 2)}</pre>
        )}
      </main>
    </div>
  );
}

// Small helper styles
const selectStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
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
  padding: "12px",
  fontSize: "16px",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "10px",
};

const resultStyle = {
  marginTop: "30px",
  padding: "20px",
  border: "1px solid #eaeaea",
  borderRadius: "8px",
  maxWidth: "600px",
  textAlign: "left",
  backgroundColor: "#f9f9f9",
  fontSize: "14px",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
};

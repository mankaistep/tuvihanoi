"use client";
import { useState } from "react";

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

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate select options
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
    <div style={{ padding: "20px" }}>
      <main style={{ maxWidth: "800px", margin: "0 auto" }}>
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

        {/* Render 5 API Section */}
        {[1, 2, 3, 4, 5].map((idx) => (
          <ApiSection key={idx} formData={formData} index={idx} />
        ))}
      </main>
    </div>
  );
}

// Component API Section
function ApiSection({ formData, index }) {
  const [apiConfig, setApiConfig] = useState({
    url: "/api/luangiai",
    method: "POST",
    type: "sunghiep", // default type
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    setError("");
    setResponse(null);
    setCopied(false);

    try {
      const payload = { ...formData, type: apiConfig.type };
      let res;

      if (apiConfig.method === "GET") {
        const params = new URLSearchParams(payload);
        res = await fetch(`${apiConfig.url}?${params}`, { method: "GET" });
      } else {
        res = await fetch(apiConfig.url, {
          method: apiConfig.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch data");

      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={sectionStyle}>
      <h3>API Section {index}</h3>
      <input
        type="text"
        value={apiConfig.url}
        onChange={(e) => setApiConfig((prev) => ({ ...prev, url: e.target.value }))}
        style={inputStyle}
      />
      <select
        value={apiConfig.method}
        onChange={(e) => setApiConfig((prev) => ({ ...prev, method: e.target.value }))}
        style={{ ...inputStyle, marginTop: "8px" }}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>

      {/* Type Select */}
      <select
        value={apiConfig.type}
        onChange={(e) => setApiConfig((prev) => ({ ...prev, type: e.target.value }))}
        style={{ ...inputStyle, marginTop: "8px" }}
      >
        <option value="sunghiep">Sự nghiệp</option>
        <option value="tinhduyen">Tình duyên</option>
        <option value="tochat">Tố chất</option>
        <option value="lonlen">Lớn lên</option>
      </select>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleRequest} disabled={loading} style={buttonStyle}>
          {loading ? "Loading..." : "Send Request"}
        </button>
        <button
          onClick={copyResponse}
          disabled={!response}
          style={{
            ...buttonStyle,
            marginLeft: "10px",
            backgroundColor: copied ? "green" : "#444",
          }}
        >
          {copied ? "Copied!" : "Copy Response"}
        </button>
      </div>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      {response ? (
        <div style={responseStyle}>
          {Object.keys(response).map((sectionKey) => (
            <div key={sectionKey} style={{ marginBottom: "20px" }}>
              <h4>Phần {sectionKey}</h4>
              <ul style={{ paddingLeft: "20px" }}>
                {response[sectionKey].map((item, i) => (
                  <li key={i} style={{ marginBottom: "8px", whiteSpace: "pre-wrap" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <pre style={responseStyle}>No response yet</pre>
      )}

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
  maxHeight: "400px",
  overflow: "auto",
  backgroundColor: "#f9f9f9",
  fontSize: "14px",
  whiteSpace: "pre-wrap",
};

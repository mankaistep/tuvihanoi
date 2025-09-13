"use client"

import { User, TrendingUp, Heart, Target, FileText, HelpCircle, Edit3, Save, X, Download } from "lucide-react"
import { useState } from "react"

const DestinyReport = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editableData, setEditableData] = useState({
    personalInfo: {
      name: "Nguyễn Văn A",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      birthDate: "15/03/1990",
      birthTime: "14:30",
      birthPlace: "Hà Nội",
    },
    sections: {
      personality: {
        title: "Luận về bản thân đương số",
        icon: User,
        color: "#0f172a",
        accentColor: "#64748b",
        bgPattern: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        content: [
          "Bạn là người có tính cách mạnh mẽ, quyết đoán trong công việc nhưng lại rất trân trọng tình cảm gia đình.",
          "Có khả năng lãnh đạo tự nhiên và thường được mọi người tin tưởng giao phó những việc quan trọng.",
          "Đôi khi bạn có thể hơi cứng đầu và khó thay đổi quan điểm, nhưng điều này cũng thể hiện sự kiên định của bạn.",
        ],
        conclusion:
          "Nhìn chung, bạn là người có bản lĩnh vững chắc với khả năng lãnh đạo bẩm sinh. Hãy phát huy những điểm mạnh này và học cách linh hoạt hơn trong các mối quan hệ để đạt được thành công trọn vẹn.",
        qa: [
          {
            question: "Điểm mạnh lớn nhất của tôi là gì?",
            answer:
              "Khả năng lãnh đạo tự nhiên và sự quyết đoán trong các tình huống khó khăn là điểm mạnh nổi bật nhất của bạn.",
          },
          {
            question: "Tôi cần cải thiện điều gì về tính cách?",
            answer:
              "Bạn nên học cách linh hoạt hơn và lắng nghe ý kiến của người khác trước khi đưa ra quyết định cuối cùng.",
          },
        ],
      },
      development: {
        title: "Luận về cách phát triển và lớn lên",
        icon: TrendingUp,
        color: "#064e3b",
        accentColor: "#059669",
        bgPattern: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
        content: [
          "Thời thơ ấu của bạn có nhiều biến động, gia đình có thể gặp khó khăn về tài chính.",
          "Từ tuổi thanh niên, bạn bắt đầu tự lập và có nhiều cơ hội phát triển bản thân.",
          "Giai đoạn trung niên sẽ là thời kỳ thịnh vượng nhất trong cuộc đời bạn.",
        ],
        conclusion:
          "Cuộc đời bạn như một cây tre, trải qua những cơn bão trong giai đoạn đầu nhưng sẽ càng ngày càng vững chắc và phát triển mạnh mẽ về sau.",
        qa: [
          {
            question: "Giai đoạn nào trong đời tôi sẽ thành công nhất?",
            answer:
              "Giai đoạn trung niên (35-50 tuổi) sẽ là thời kỳ hoàng kim với nhiều cơ hội phát triển và thành công vượt bậc.",
          },
          {
            question: "Làm thế nào để vượt qua khó khăn tuổi trẻ?",
            answer:
              "Hãy kiên nhẫn và không ngừng học hỏi. Những khó khăn hiện tại sẽ trở thành nền tảng vững chắc cho thành công sau này.",
          },
        ],
      },
      love: {
        title: "Luận về tình duyên",
        icon: Heart,
        color: "#881337",
        accentColor: "#e11d48",
        bgPattern: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
        sections: [
          {
            title: "Phần 2: Đặc điểm tình cảm",
            content: [
              "Bạn có xu hướng yêu đương với trách nhiệm, thể hiện tình cảm thẳng thắn, muốn bảo vệ và xây dựng sự an toàn cho mối quan hệ; nhưng đôi khi bạn khép kín hoặc rụt rè do nỗi sợ mất mát nên cần thời gian để tin tưởng thật sự.",
              "Bạn dễ bị thu hút bởi người mạnh mẽ, quyết đoán, có sức hút cá nhân và năng lực thực tế; đồng thời bạn tôn trọng người có ổn định tài chính và phong thái trưởng thành.",
              "Bạn có duyên với người khác giới, gặp nhiều cơ hội nhờ giao tiếp và ra ngoài nhưng đào hoa kèm theo thử thách nên mối quan hệ thuận lợi khi bạn chủ động, mở lòng và biết xử lý mâu thuẫn kịp thời.",
              "Sau khi kết hôn người bạn đời sẽ mang lại niềm vui tinh thần và khích lệ để bạn thay đổi phát triển, đồng thời hôn nhân cũng đặt ra những thử thách thực tế về tranh chấp, trách nhiệm và tài chính mà bạn phải đối mặt cùng nhau.",
            ],
          },
          {
            title: "Phần 3: Lời khuyên tình duyên",
            content: [
              "Mình nhìn thấy một bức tranh tình cảm có cả đam mê lẫn thử thách: bạn có sức quyến rũ và duyên gặp gỡ nhưng phải trải qua tổn thất hoặc biến động mới chín chắn, vì thế mình khuyên bạn chủ động mở rộng giao tiếp, kiên nhẫn xây dựng lòng tin và xử lý mâu thuẫn ngay khi phát sinh; hãy tận dụng điểm mạnh là trách nhiệm và khả năng thích nghi của mình để biến những thay đổi thành cơ hội, đừng để Tuần Không và Triệt Không làm bạn chùn bước, mình tin bạn sẽ có hạnh phúc nếu biết chủ động và can đảm đối mặt.",
            ],
          },
        ],
        conclusion:
          "Tình duyên của bạn như một bông hoa cần thời gian và sự chăm sóc để nở rộ. Hãy kiên nhẫn, mở lòng và chủ động trong tình yêu - hạnh phúc sẽ đến khi bạn sẵn sàng đón nhận.",
        qa: [
          {
            question: "Khi nào tôi sẽ gặp được người phù hợp?",
            answer: "Trong 2-3 năm tới, đặc biệt khi bạn mở rộng giao tiếp và tham gia nhiều hoạt động xã hội hơn.",
          },
          {
            question: "Làm thế nào để duy trì mối quan hệ lâu dài?",
            answer:
              "Hãy học cách giao tiếp thẳng thắn, xử lý mâu thuẫn kịp thời và luôn thể hiện sự quan tâm chân thành đến người bạn yêu.",
          },
          {
            question: "Tôi có nên chủ động trong tình yêu không?",
            answer:
              "Có, sự chủ động sẽ mang lại nhiều cơ hội tốt cho bạn. Đừng ngại thể hiện tình cảm một cách chân thành.",
          },
        ],
      },
      career: {
        title: "Luận về sự nghiệp",
        icon: Target,
        color: "#581c87",
        accentColor: "#7c3aed",
        bgPattern: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
        content: [
          "Bạn có năng khiếu trong lĩnh vực kinh doanh và quản lý, đặc biệt phù hợp với các công việc cần sự quyết đoán.",
          "Thời kỳ đầu sự nghiệp có thể gặp nhiều thử thách, nhưng nhờ sự kiên trì mà bạn sẽ đạt được thành công.",
          "Sau tuổi 35, sự nghiệp sẽ có những bước tiến vượt bậc, có thể đạt được địa vị cao trong xã hội.",
        ],
        conclusion:
          "Sự nghiệp của bạn sẽ phát triển theo hình kim tự tháp - khởi đầu khó khăn nhưng sẽ đạt đến đỉnh cao nhờ vào sự kiên trì và khả năng lãnh đạo xuất sắc.",
        qa: [
          {
            question: "Ngành nghề nào phù hợp với tôi nhất?",
            answer:
              "Kinh doanh, quản lý, tài chính hoặc các lĩnh vực cần khả năng ra quyết định và lãnh đạo sẽ rất phù hợp với bạn.",
          },
          {
            question: "Khi nào tôi nên khởi nghiệp?",
            answer:
              "Giai đoạn 32-35 tuổi sẽ là thời điểm lý tưởng khi bạn đã tích lũy đủ kinh nghiệm và có sự ổn định tài chính.",
          },
          {
            question: "Tôi có thể đạt được thành công lớn không?",
            answer:
              "Hoàn toàn có thể! Với khả năng lãnh đạo và sự quyết đoán, bạn có tiềm năng trở thành một nhà lãnh đạo xuất sắc.",
          },
        ],
      },
    },
  })

  const handleSave = () => {
    setIsEditMode(false)
    console.log("[v0] Saved data:", editableData)
  }

  const handleCancel = () => {
    setIsEditMode(false)
  }

  const handleExportPDF = async () => {
    const editButton = document.querySelector(".edit-controls")
    if (editButton) editButton.style.display = "none"
  
    try {
      const { default: html2pdf } = await import("html2pdf.js")
      const element = document.getElementById("destiny-report-content")
      if (!element) throw new Error("Report content not found")
  
      // Get element size in pixels
      const elementWidth = element.scrollWidth
      const elementHeight = element.scrollHeight
  
      const opt = {
        margin: 0,
        filename: `bao-cao-tu-vi-${editableData.personalInfo.name.replace(/\s+/g, "-")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        // 👇 custom format: match element size
        jsPDF: {
          unit: "px",
          format: [900, elementHeight * 1.25],
          orientation: "portrait",
        },
      }
  
      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error("Error exporting PDF:", error)
    } finally {
      if (editButton) editButton.style.display = "block"
    }
  }
  

  const updatePersonalInfo = (field, value) => {
    setEditableData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const updateSectionContent = (sectionKey, contentIndex, value) => {
    setEditableData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          content: prev.sections[sectionKey].content.map((item, index) => (index === contentIndex ? value : item)),
        },
      },
    }))
  }

  const updateSectionConclusion = (sectionKey, value) => {
    setEditableData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          conclusion: value,
        },
      },
    }))
  }

  const updateQA = (sectionKey, qaIndex, field, value) => {
    setEditableData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
          ...prev.sections[sectionKey],
          qa: prev.sections[sectionKey].qa.map((qa, index) => (index === qaIndex ? { ...qa, [field]: value } : qa)),
        },
      },
    }))
  }

  const updateLoveSectionContent = (subsectionIndex, contentIndex, value) => {
    setEditableData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        love: {
          ...prev.sections.love,
          sections: prev.sections.love.sections.map((section, sIndex) =>
            sIndex === subsectionIndex
              ? {
                  ...section,
                  content: section.content.map((item, cIndex) => (cIndex === contentIndex ? value : item)),
                }
              : section,
          ),
        },
      },
    }))
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div
        className="edit-controls"
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 50,
        }}
      >
        {!isEditMode ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleExportPDF}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Download style={{ width: "16px", height: "16px" }} />
              <span>Xuất PDF</span>
            </button>
            <button
              onClick={() => setIsEditMode(true)}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Edit3 style={{ width: "16px", height: "16px" }} />
              <span>Chỉnh sửa</span>
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Save style={{ width: "16px", height: "16px" }} />
              <span>Lưu</span>
            </button>
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: "#4b5563",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <X style={{ width: "16px", height: "16px" }} />
              <span>Hủy</span>
            </button>
          </div>
        )}
      </div>

      <div id="destiny-report-content">
        <div style={{ backgroundColor: "#000000", color: "white" }}>
          <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "64px 32px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "48px",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <h1
                    style={{
                      fontSize: "48px",
                      fontWeight: "900",
                      letterSpacing: "-0.025em",
                      margin: "0 0 8px 0",
                    }}
                  >
                    PHÂN TÍCH LÁ SỐ TỬ VI
                  </h1>
                  <p style={{ color: "#d1d5db", fontSize: "18px", margin: 0 }}>Tuvihanoi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "48px 32px" }}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ backgroundColor: "#111827", color: "white", padding: "24px", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px", margin: 0 }}>
                THÔNG TIN ĐƯƠNG SỐ
              </h2>
              <div style={{ width: "64px", height: "4px", backgroundColor: "#fbbf24" }}></div>
            </div>

            <div
              style={{ backgroundColor: "white", padding: "24px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 3fr",
                  gap: "24px",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img
                      src={editableData.personalInfo.avatar || "/placeholder.svg"}
                      alt={editableData.personalInfo.name}
                      style={{
                        width: "128px",
                        height: "128px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "4px solid #e5e7eb",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#fbbf24",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "white" }}>☯</span>
                    </div>
                  </div>
                </div>

                <div>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={editableData.personalInfo.name}
                      onChange={(e) => updatePersonalInfo("name", e.target.value)}
                      style={{
                        fontSize: "32px",
                        fontWeight: "900",
                        color: "#111827",
                        marginBottom: "16px",
                        width: "100%",
                        border: "2px solid #93c5fd",
                        borderRadius: "4px",
                        padding: "4px 8px",
                      }}
                    />
                  ) : (
                    <h3
                      style={{
                        fontSize: "32px",
                        fontWeight: "900",
                        color: "#111827",
                        marginBottom: "16px",
                        margin: "0 0 16px 0",
                      }}
                    >
                      {editableData.personalInfo.name}
                    </h3>
                  )}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "16px",
                    }}
                  >
                    <div style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <div
                          style={{ width: "12px", height: "12px", backgroundColor: "#ef4444", borderRadius: "2px" }}
                        ></div>
                        <p style={{ fontSize: "12px", color: "#4b5563", fontWeight: "500", margin: 0 }}>NGÀY SINH</p>
                      </div>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={editableData.personalInfo.birthDate}
                          onChange={(e) => updatePersonalInfo("birthDate", e.target.value)}
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "4px 8px",
                          }}
                        />
                      ) : (
                        <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
                          {editableData.personalInfo.birthDate}
                        </p>
                      )}
                    </div>

                    <div style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <div
                          style={{ width: "12px", height: "12px", backgroundColor: "#3b82f6", borderRadius: "2px" }}
                        ></div>
                        <p style={{ fontSize: "12px", color: "#4b5563", fontWeight: "500", margin: 0 }}>GIỜ SINH</p>
                      </div>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={editableData.personalInfo.birthTime}
                          onChange={(e) => updatePersonalInfo("birthTime", e.target.value)}
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "4px 8px",
                          }}
                        />
                      ) : (
                        <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
                          {editableData.personalInfo.birthTime}
                        </p>
                      )}
                    </div>

                    <div style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <div
                          style={{ width: "12px", height: "12px", backgroundColor: "#10b981", borderRadius: "2px" }}
                        ></div>
                        <p style={{ fontSize: "12px", color: "#4b5563", fontWeight: "500", margin: 0 }}>NƠI SINH</p>
                      </div>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={editableData.personalInfo.birthPlace}
                          onChange={(e) => updatePersonalInfo("birthPlace", e.target.value)}
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "4px 8px",
                          }}
                        />
                      ) : (
                        <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
                          {editableData.personalInfo.birthPlace}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            {Object.entries(editableData.sections).map(([key, section]) => (
              <ReportSection
                key={key}
                section={section}
                sectionKey={key}
                isEditMode={isEditMode}
                onUpdateContent={updateSectionContent}
                onUpdateConclusion={updateSectionConclusion}
                onUpdateQA={updateQA}
                onUpdateLoveSectionContent={updateLoveSectionContent}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: "64px",
              backgroundColor: "#000000",
              color: "white",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#fbbf24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                ☯
              </div>
              <span style={{ fontSize: "18px", fontWeight: "500" }}>tuvihanoi</span>
            </div>
            <p style={{ color: "#9ca3af", fontSize: "14px", margin: "0 0 8px 0" }}>
              Được tạo vào {new Date().toLocaleDateString("vi-VN")}
            </p>
            <p style={{ color: "#fbbf24", fontSize: "14px", margin: 0 }}>TUVIHANOI.COM</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ReportSection = ({
  section,
  sectionKey,
  isEditMode,
  onUpdateContent,
  onUpdateConclusion,
  onUpdateQA,
  onUpdateLoveSectionContent,
}) => {
  const IconComponent = section.icon

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        height: "fit-content",
      }}
    >
      <div style={{ backgroundColor: section.color, color: "white", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <IconComponent style={{ width: "24px", height: "24px" }} />
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>{section.title}</h3>
        </div>
      </div>

      <div style={{ background: section.bgPattern, padding: "32px" }}>
        {/* Nội dung chính */}
        <div style={{ marginBottom: "32px" }}>
          {section.sections ? (
            // Phần tình duyên có sections
            section.sections.map((subsection, index) => (
              <div key={index} style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: section.color,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {index + 2}
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: "bold", color: section.color, margin: 0 }}>
                    {subsection.title}
                  </h4>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {subsection.content.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: section.accentColor,
                          marginTop: "8px",
                          flexShrink: 0,
                        }}
                      ></div>
                      {isEditMode ? (
                        <textarea
                          value={item}
                          onChange={(e) => onUpdateLoveSectionContent(index, idx, e.target.value)}
                          style={{
                            color: "#374151",
                            lineHeight: "1.6",
                            width: "100%",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            padding: "8px",
                            minHeight: "80px",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                          }}
                        />
                      ) : (
                        <p style={{ color: "#374151", lineHeight: "1.6", margin: 0 }}>{item}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Các phần khác
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {section.content.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: section.accentColor,
                      marginTop: "8px",
                      flexShrink: 0,
                    }}
                  ></div>
                  {isEditMode ? (
                    <textarea
                      value={item}
                      onChange={(e) => onUpdateContent(sectionKey, index, e.target.value)}
                      style={{
                        color: "#374151",
                        lineHeight: "1.6",
                        width: "100%",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        padding: "8px",
                        minHeight: "60px",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                      }}
                    />
                  ) : (
                    <p style={{ color: "#374151", lineHeight: "1.6", margin: 0 }}>{item}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kết luận */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: section.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText style={{ width: "16px", height: "16px", color: "white" }} />
            </div>
            <h4 style={{ fontSize: "18px", fontWeight: "bold", color: section.color, margin: 0 }}>KẾT LUẬN</h4>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderLeft: "4px solid #fbbf24",
            }}
          >
            {isEditMode ? (
              <textarea
                value={section.conclusion}
                onChange={(e) => onUpdateConclusion(sectionKey, e.target.value)}
                style={{
                  color: "#1f2937",
                  lineHeight: "1.6",
                  fontWeight: "500",
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  padding: "8px",
                  minHeight: "80px",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                }}
              />
            ) : (
              <p style={{ color: "#1f2937", lineHeight: "1.6", fontWeight: "500", margin: 0 }}>{section.conclusion}</p>
            )}
          </div>
        </div>

        {/* Q&A Section */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: section.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HelpCircle style={{ width: "16px", height: "16px", color: "white" }} />
            </div>
            <h4 style={{ fontSize: "18px", fontWeight: "bold", color: section.color, margin: 0 }}>
              CÂU HỎI & GIẢI ĐÁP
            </h4>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {section.qa.map((qa, index) => (
              <div
                key={index}
                style={{ backgroundColor: "white", padding: "24px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "4px",
                    }}
                  >
                    <span style={{ color: section.color, fontSize: "14px", fontWeight: "bold" }}>Q</span>
                  </div>
                  {isEditMode ? (
                    <textarea
                      value={qa.question}
                      onChange={(e) => onUpdateQA(sectionKey, index, "question", e.target.value)}
                      style={{
                        fontWeight: "bold",
                        color: section.color,
                        lineHeight: "1.6",
                        width: "100%",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        padding: "8px",
                        minHeight: "60px",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                      }}
                    />
                  ) : (
                    <p style={{ fontWeight: "bold", color: section.color, lineHeight: "1.6", margin: 0 }}>
                      {qa.question}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginLeft: "40px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "#fbbf24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "4px",
                    }}
                  >
                    <span style={{ color: "#000000", fontSize: "14px", fontWeight: "bold" }}>A</span>
                  </div>
                  {isEditMode ? (
                    <textarea
                      value={qa.answer}
                      onChange={(e) => onUpdateQA(sectionKey, index, "answer", e.target.value)}
                      style={{
                        color: "#374151",
                        lineHeight: "1.6",
                        width: "100%",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        padding: "8px",
                        minHeight: "60px",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                      }}
                    />
                  ) : (
                    <p style={{ color: "#374151", lineHeight: "1.6", margin: 0 }}>{qa.answer}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinyReport

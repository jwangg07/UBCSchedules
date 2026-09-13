import { useEffect, useState } from "react";
import { fmtTime, DAY_LABEL } from "../util/time.js";
import { STATUS_COLORS } from "../util/status.js";
import { COLORS } from "../util/theme.js";
import { X } from "lucide-react";

export default function SectionPicker({ course, selection = {}, onToggle, onSelectAll, onSelectNone, onClose }) {
    const types = Object.keys(course.components).filter(
        (type) => course.components[type].length > 0
    );
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const visibleTypes = activeTab === "All" ? types : [activeTab];

    return (
        <div
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 32, 0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "24px" }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ width: "600px", maxWidth: "100%", maxHeight: "80vh", overflowY: "auto", background: "#fff", color: COLORS.TEXT_DARK, borderRadius: "14px", border: `1px solid ${COLORS.ACCENT}`, boxShadow: "0 20px 60px rgba(0,0,0,0.35)", padding: "24px 26px" }}
            >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "4px" }}>
                    <div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: "16px" }}>
                            {course.code}
                        </div>
                        <div style={{ fontSize: "12.5px", color: COLORS.TEXT_MEDIUM, marginTop: "2px" }}>
                            {course.title}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close section picker"
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: COLORS.TEXT_DARK, lineHeight: 1, padding: "4px" }}
                    >
                        <X size={14} strokeWidth={4} />
                    </button>
                </div>

                <div style={{ fontSize: "12px", color: COLORS.TEXT_MEDIUM, marginBottom: "16px" }}>
                    Uncheck any sections you don't want the scheduler to consider.
                </div>

                {/* Type tabs */}
                <div style={{ display: "flex", gap: "6px", borderBottom: `1px solid ${COLORS.ACCENT}`, marginBottom: "16px", flexWrap: "wrap" }}>
                    {["All", ...types].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "8px 12px",
                                background: "none",
                                border: "none",
                                borderBottom: activeTab === tab ? `2px solid ${COLORS.BLUE}` : "2px solid transparent",
                                color: activeTab === tab ? COLORS.BLUE : COLORS.TEXT_MEDIUM,
                                fontWeight: activeTab === tab ? 600 : 500,
                                fontSize: "12.5px",
                                cursor: "pointer",
                                marginBottom: "-1px",
                            }}
                        >
                            {tab === "All" ? "All Sections" : tab}
                        </button>
                    ))}
                </div>

                {visibleTypes.map((type) => {
                    const selectedIds = selection[type]; // undefined => everything allowed
                    const options = course.components[type];

                    return (
                        <div key={type} style={{ marginBottom: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", paddingBottom: "6px", borderBottom: `1px solid ${COLORS.ACCENT}` }}>
                                <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.TEXT_MEDIUM, fontWeight: 600 }}>
                                    {type}
                                </div>
                                <div style={{ display: "flex", gap: "12px" }}>
                                    <button onClick={() => onSelectAll(type)} style={linkBtnStyle}>All</button>
                                    <button onClick={() => onSelectNone(type)} style={linkBtnStyle}>None</button>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
                                {options.map((opt) => {
                                    const checked = !selectedIds || selectedIds.has(opt.label);
                                    const timeLabel =
                                        opt.days.length === 0
                                            ? "Async / online"
                                            : `${opt.days.map((d) => DAY_LABEL[d] ?? d).join(" ")} ${fmtTime(opt.start)}\u2013${fmtTime(opt.end)}`;

                                    return (
                                        <label
                                            key={opt.label}
                                            style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13px", padding: "8px 10px", cursor: "pointer", borderRadius: "8px", background: STATUS_COLORS[opt.status] + "14", border: `1px solid ${STATUS_COLORS[opt.status]}33` }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={checked}
                                                onChange={() => onToggle(type, opt.label)}
                                            />
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: "1", minWidth: 0 }}>
                                                <div style={{ minWidth: 0 }}>
                                                    <div style={{ fontWeight: 600 }}>{opt.label}</div>
                                                    <div style={{ color: COLORS.TEXT_MEDIUM, fontSize: "11.5px" }}>{timeLabel}</div>
                                                </div>
                                                <span style={{ fontSize: "10.5px", fontWeight: 600, color: STATUS_COLORS[opt.status], flexShrink: 0, marginLeft: "8px" }}>{opt.status}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const linkBtnStyle = {
    background: "none",
    border: "none",
    color: COLORS.BLUE,
    fontSize: "11.5px",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
};
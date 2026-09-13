import { COLORS } from "../util/theme";
import { ArrowLeft, ArrowRight, LayoutGrid, List } from "lucide-react";

// Move between prev / next schedules, and switch between Week / List view
export default function ScheduleNav({ index, total, totalLabel, onPrev, onNext, view, onViewChange }) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button className="nav-btn" onClick={onPrev} disabled={index === 0} style={navBtnStyle}>
                    <ArrowLeft size={14} />
                </button>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "17px", fontWeight: 600, color: COLORS.TEXT_DARK, minWidth: "150px", textAlign: "center" }}>
                    Schedule {index + 1} of {totalLabel ?? total}
                </span>
                <button className="nav-btn" onClick={onNext} disabled={index === total - 1} style={navBtnStyle}>
                    <ArrowRight size={14} />
                </button>
            </div>

            <div style={{ display: "flex", background: COLORS.BACKGROUND, border: `1px solid ${COLORS.ACCENT}`, borderRadius: "8px", padding: "3px" }}>
                <button onClick={() => onViewChange("week")} style={segBtnStyle(view === "week")}>
                    <LayoutGrid size={13} /> Week
                </button>
                <button onClick={() => onViewChange("list")} style={segBtnStyle(view === "list")}>
                    <List size={13} /> List
                </button>
            </div>
        </div>
    );
}

const navBtnStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: `1px solid ${COLORS.ACCENT}`,
    background: "#fff",
    color: COLORS.TEXT_DARK,
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const segBtnStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: active ? "#fff" : "transparent",
    color: active ? COLORS.TEXT_DARK : COLORS.TEXT_MEDIUM,
    fontWeight: active ? 600 : 500,
    fontSize: "12.5px",
    cursor: "pointer",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
});
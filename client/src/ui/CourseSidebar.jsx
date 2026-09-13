import { useState, useEffect } from "react";
import ScheduleSettings from "./ScheduleSettings.jsx";
import SectionPicker from "./SectionPicker.jsx";
import { COLORS } from "./../util/theme.js";
import { X, Settings, Plus, ChevronDown, ChevronUp } from "lucide-react";

export default function CourseSidebar({
    courses,
    onAddCourse,
    onRemoveCourse,
    addStatus,
    settings,
    onSettingsChange,
    sectionSelections,
    onToggleSection,
    onSelectAllSections,
    onSelectNoSections,
}) {
    const [dept, setDept] = useState("");
    const [courseNumber, setCourseNumber] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(true);
    const [openPickerFor, setOpenPickerFor] = useState(null);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!dept.trim() || !courseNumber.trim()) return;
        onAddCourse(dept.trim().toUpperCase(), courseNumber.trim());
        setDept("");
        setCourseNumber("");
        setShowAddForm(false);
    };

    useEffect(() => {
        if (!showAddForm) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") close();
        };
        const close = () => { setShowAddForm(false); setDept(""); setCourseNumber(""); };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showAddForm]);

    return (
        <div style={{ width: "320px", background: COLORS.PRIMARY, color: COLORS.TEXT_LIGHT, padding: "20px 18px", flexShrink: 0, display: "flex", flexDirection: "column", overflowY: "auto", overflowX: "hidden" }}>
            {/* --- Course selection --- */}
            <div style={{ fontSize: "11px", letterSpacing: "0.06em", color: COLORS.PRIMARY_LIGHT, marginBottom: "12px", fontWeight: 600 }}>
                COURSE SELECTION
            </div>

            <div style={{ marginBottom: "10px" }}>
                {courses.length === 0 && (
                    <div style={{ fontSize: "12.5px", color: COLORS.PRIMARY_LIGHT, padding: "8px 0" }}>
                        No courses added yet.
                    </div>
                )}
                {courses.map((c) => (
                    <div
                        key={c.code}
                        className="course-row"
                        onClick={() => setOpenPickerFor(c.code)}
                        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderRadius: "10px", marginBottom: "4px", background: "rgba(255,255,255,0.05)" }}
                    >
                        <div className="course-info" style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: c.color, display: "inline-block", flexShrink: 0 }} />
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600 }}>{c.code}</div>
                                <div style={{ fontSize: "11.5px", color: COLORS.PRIMARY_LIGHT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</div>
                            </div>
                        </div>

                        <div className="select-hint">
                            <span style={{ background: "rgba(11,37,69,0.92)", color: COLORS.TEXT_LIGHT, fontWeight: 600, padding: "5px 12px", borderRadius: "6px", fontSize: "11px", letterSpacing: "0.03em" }}>
                                SELECT SECTIONS
                            </span>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); onRemoveCourse(c.code); }}
                            aria-label={`Remove ${c.code}`}
                            style={{ background: "none", border: "none", color: COLORS.TEXT_LIGHT, cursor: "pointer", fontSize: "16px", lineHeight: 1, padding: "4px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "8px" }}
                        >
                            <Settings className="course-settings-button" size={12} strokeWidth={3} />
                            <X className="course-remove-button" size={12} strokeWidth={3} />
                        </button>
                    </div>
                ))}
            </div>

            {/* --- Add course --- */}
            {!showAddForm && (
                <button
                    className="btn"
                    onClick={() => setShowAddForm(true)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%", padding: "10px", borderRadius: "8px", border: `1px dashed ${COLORS.PRIMARY_DARK_ACCENT}`, background: "transparent", color: COLORS.TEXT_LIGHT, fontSize: "13px", fontWeight: 500, cursor: "pointer", marginBottom: "12px" }}
                >
                    <Plus size={14} /> Add Course
                </button>
            )}

            {showAddForm && (
                <form onSubmit={handleAdd} style={{ marginBottom: "12px", padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                        <input
                            autoFocus
                            autoComplete="off"
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                            placeholder="CPSC"
                            style={{ width: "72px", flexShrink: 0, padding: "8px 10px", borderRadius: "8px", border: `1px solid ${COLORS.PRIMARY_DARK_ACCENT}`, background: COLORS.PRIMARY_DARK, color: COLORS.TEXT_LIGHT, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}
                        />
                        <input
                            autoComplete="off"
                            value={courseNumber}
                            onChange={(e) => setCourseNumber(e.target.value)}
                            placeholder="110"
                            style={{ flex: 1, minWidth: 0, padding: "8px 10px", borderRadius: "8px", border: `1px solid ${COLORS.PRIMARY_DARK_ACCENT}`, background: COLORS.PRIMARY_DARK, color: COLORS.TEXT_LIGHT, fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button
                            type="button"
                            onClick={() => { setShowAddForm(false); setDept(""); setCourseNumber(""); }}
                            style={{ flex: 1, padding: "8px", borderRadius: "8px", border: `1px solid ${COLORS.PRIMARY_DARK_ACCENT}`, background: "transparent", color: COLORS.TEXT_LIGHT, fontSize: "12.5px", cursor: "pointer" }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn"
                            disabled={addStatus.loading}
                            style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", background: COLORS.BLUE, color: "#fff", fontWeight: 600, fontSize: "12.5px", cursor: addStatus.loading ? "wait" : "pointer" }}
                        >
                            {addStatus.loading ? "Adding…" : "Add"}
                        </button>
                    </div>
                </form>
            )}

            {addStatus.error && (
                <div style={{ fontSize: "12px", color: COLORS.ERROR, marginBottom: "12px", lineHeight: 1.4 }}>
                    {addStatus.error}
                </div>
            )}

            {openPickerFor && (
                <SectionPicker
                    course={courses.find((c) => c.code === openPickerFor)}
                    selection={sectionSelections[openPickerFor] ?? {}}
                    onToggle={(type, sectionId) => onToggleSection(openPickerFor, type, sectionId)}
                    onSelectAll={(type) => onSelectAllSections(openPickerFor, type)}
                    onSelectNone={(type) => onSelectNoSections(openPickerFor, type)}
                    onClose={() => setOpenPickerFor(null)}
                />
            )}

            {/* --- Settings --- */}
            <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: `1px solid ${COLORS.PRIMARY_DARK_ACCENT}` }}>
                <button
                    onClick={() => setSettingsOpen((o) => !o)}
                    aria-expanded={settingsOpen}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: settingsOpen ? "14px" : 0 }}
                >
                    <span style={{ fontSize: "11px", letterSpacing: "0.06em", color: COLORS.PRIMARY_LIGHT, fontWeight: 600 }}>SETTINGS</span>
                    {settingsOpen ? <ChevronUp size={14} color={COLORS.PRIMARY_LIGHT} /> : <ChevronDown size={14} color={COLORS.PRIMARY_LIGHT} />}
                </button>

                {settingsOpen && (
                    <ScheduleSettings settings={settings} onSettingsChange={onSettingsChange} />
                )}
            </div>
        </div>
    );
}
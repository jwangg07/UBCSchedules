import { DAY_START, DAY_END, fmtTime } from "../util/time.js";
import { FILTER_STATUSES, STATUS_COLORS } from "../util/status.js";
import { COLORS } from "../util/theme.js";
import ToggleSwitch from "./ToggleSwitch.jsx";
import { Clock, Filter } from "lucide-react";

const HOUR_OPTIONS = [];
for (let h = DAY_START / 60; h <= DAY_END / 60; h++) HOUR_OPTIONS.push(h);

export const DEFAULT_SETTINGS = {
    startHour: DAY_START / 60,
    endHour: DAY_END / 60,
    excludedStatuses: [],
};

const STATUS_TOGGLE_LABEL = {
    Waitlist: "Show waitlisted sections",
    Closed: "Show closed sections",
};

// Narrow down how many schedules get generated.
export default function ScheduleSettings({ settings, onSettingsChange }) {
    const handleStartChange = (e) => {
        const startHour = Number(e.target.value);
        onSettingsChange((prev) => ({
            ...prev,
            startHour,
            endHour: Math.max(prev.endHour, startHour + 1),
        }));
    };

    const handleEndChange = (e) => {
        const endHour = Number(e.target.value);
        onSettingsChange((prev) => ({
            ...prev,
            endHour,
            startHour: Math.min(prev.startHour, endHour - 1),
        }));
    };

    // A status is "shown" (toggle on) when it is NOT excluded
    const handleStatusToggle = (status) => {
        onSettingsChange((prev) => {
            const isShown = !prev.excludedStatuses.includes(status);
            return {
                ...prev,
                excludedStatuses: isShown
                    ? [...prev.excludedStatuses, status]
                    : prev.excludedStatuses.filter((s) => s !== status),
            };
        });
    };

    return (
        <div>
            <label style={sectionLabelStyle}><Clock size={12} /> TIME PREFERENCES</label>

            <div style={{ fontSize: "12px", color: COLORS.PRIMARY_LIGHT, marginBottom: "6px" }}>No classes before</div>
            <select className="select" value={settings.startHour} onChange={handleStartChange} style={selectStyle}>
                {HOUR_OPTIONS.filter((h) => h < settings.endHour).map((h) => (
                    <option key={h} value={h}>{fmtTime(h * 60)}</option>
                ))}
            </select>

            <div style={{ fontSize: "12px", color: COLORS.PRIMARY_LIGHT, margin: "12px 0 6px" }}>No classes after</div>
            <select className="select" value={settings.endHour} onChange={handleEndChange} style={selectStyle}>
                {HOUR_OPTIONS.filter((h) => h > settings.startHour).map((h) => (
                    <option key={h} value={h}>{fmtTime(h * 60)}</option>
                ))}
            </select>

            <label style={{ ...sectionLabelStyle, marginTop: "18px" }}><Filter size={12} /> FILTERS</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {FILTER_STATUSES.map((status) => (
                    <div key={status} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: STATUS_COLORS[status], flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <ToggleSwitch
                                id={`toggle-${status}`}
                                checked={!settings.excludedStatuses.includes(status)}
                                onChange={() => handleStatusToggle(status)}
                                label={STATUS_TOGGLE_LABEL[status] ?? `Show ${status.toLowerCase()} sections`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const sectionLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    letterSpacing: "0.06em",
    color: COLORS.PRIMARY_LIGHT,
    marginBottom: "10px",
};

const selectStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "8px",
    border: `1px solid ${COLORS.PRIMARY_DARK_ACCENT}`,
    borderRight: `15px solid transparent`,
    background: COLORS.PRIMARY_DARK,
    color: COLORS.BACKGROUND,
    fontSize: "13px",
};
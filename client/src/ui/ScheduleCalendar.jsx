import { DAY_ORDER, DAY_LABEL, DAY_START, DAY_END, fmtTime } from "../util/time.js";
import { STATUS_COLORS } from "../util/status.js";
import { COLORS } from "../util/theme.js";

const HEADER_HEIGHT = "34px";
const BUFFER_HEIGHT = "20px"; // keeps the last hour from being clipped

export default function ScheduleCalendar({ schedule, settings }) {
    const hours = [];
    for (let m = DAY_START; m <= DAY_END; m += 60) hours.push(m);
    const totalRange = DAY_END - DAY_START;
    const pct = (mins) => ((mins - DAY_START) / totalRange) * 100;

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", border: `1px solid ${COLORS.ACCENT}`, borderRadius: "12px", overflow: "hidden", background: "#fff" }}>
            <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
                {/* Time gutter */}
                <div style={{ width: "56px", flexShrink: 0, borderRight: `1px solid ${COLORS.ACCENT}`, display: "flex", flexDirection: "column" }}>
                    <div style={{ height: HEADER_HEIGHT, flexShrink: 0, borderBottom: `1px solid ${COLORS.ACCENT}` }} />
                    <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
                        {hours.map((h) => (
                            <div
                                key={h}
                                style={{
                                    position: "absolute", top: `${pct(h)}%`, right: "8px",
                                    transform: "translateY(-8px)",
                                    fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.TEXT_MEDIUM,
                                }}
                            >
                                {fmtTime(h)}
                            </div>
                        ))}
                    </div>
                    <div style={{ height: BUFFER_HEIGHT, flexShrink: 0 }} />
                </div>

                {/* Day columns */}
                {DAY_ORDER.map((day) => (
                    <div key={day} style={{ flex: 1, borderRight: `1px solid ${COLORS.ACCENT}`, display: "flex", flexDirection: "column" }}>
                        <div style={{ height: HEADER_HEIGHT, flexShrink: 0, borderBottom: `1px solid ${COLORS.ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12.5px", fontWeight: 600, color: COLORS.TEXT_DARK }}>
                            {DAY_LABEL[day]}
                        </div>
                        <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
                            {hours.map((h) => (
                                <div key={h} style={{ position: "absolute", top: `${pct(h)}%`, left: 0, right: 0, borderTop: `1px solid ${COLORS.ACCENT}80` }} />
                            ))}

                            {/* Start/end-of-day preference markers */}
                            <span style={{ position: "absolute", top: `${pct(settings.startHour * 60)}%`, height: "1px", left: 0, right: 0, background: COLORS.SECONDARY + "80" }} />
                            <span style={{ position: "absolute", top: `${pct(settings.endHour * 60)}%`, height: "1px", left: 0, right: 0, background: COLORS.SECONDARY + "80" }} />

                            {schedule
                                .filter((entry) => entry.slot.days.includes(day))
                                .map((entry, i) => {
                                    const top = pct(entry.slot.start);
                                    const height = ((entry.slot.end - entry.slot.start) / totalRange) * 100;
                                    return (
                                        <div
                                            key={i}
                                            title={`${entry.code} ${entry.type} ${entry.slot.label}`}
                                            style={{
                                                position: "absolute",
                                                top: `${top}%`,
                                                height: `calc(${height}% - 2px)`,
                                                left: "3px",
                                                right: "3px",
                                                background: entry.color + "1E",
                                                borderLeft: `3px solid ${entry.color}`,
                                                borderRadius: "6px",
                                                padding: "4px 6px",
                                                fontSize: "11px",
                                                overflow: "hidden",
                                                color: "#1F2A16",
                                                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                                            }}
                                        >
                                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: entry.color, fontSize: "10.5px" }}>
                                                {entry.code}
                                            </div>
                                            <div style={{ color: entry.color, fontSize: "10.5px" }}>{entry.type} {entry.slot.label}</div>
                                            <div style={{ display: "inline-flex", alignItems: "center", background: entry.color + "20", gap: "5px", marginTop: "3px", padding: "2px 5px 2px 5px", borderRadius: "10px" }}>
                                                <span
                                                    style={{
                                                        width: "6px",
                                                        height: "6px",
                                                        borderRadius: "50%",
                                                        background: STATUS_COLORS[entry.slot.status] ?? STATUS_COLORS.Other,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <div style={{ fontFamily: "'JetBrains Mono', monospace", color: entry.color, fontSize: "10.5px" }}>
                                                    {entry.slot.status}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div style={{ height: BUFFER_HEIGHT, flexShrink: 0 }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
import { DAY_ORDER, DAY_LABEL, fmtTime } from "../util/time.js";
import { STATUS_COLORS } from "../util/status.js";
import { COLORS } from "../util/theme.js";

function Row({ entry, borderTop }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", borderTop }}>
            <div style={{ width: "3px", alignSelf: "stretch", background: entry.color, borderRadius: "2px" }} />
            {entry.slot.days.length > 0 && (
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12.5px", color: COLORS.TEXT_MEDIUM, minWidth: "110px" }}>
                    {fmtTime(entry.slot.start)} – {fmtTime(entry.slot.end)}
                </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: "13px", color: entry.color }}>
                    {entry.code}
                </div>
                <div style={{ fontSize: "12px", color: COLORS.TEXT_DARK + "BF" }}>{entry.type} {entry.slot.label}</div>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: (STATUS_COLORS[entry.slot.status] ?? STATUS_COLORS.Other) + "20", padding: "3px 8px", borderRadius: "10px", flexShrink: 0 }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: STATUS_COLORS[entry.slot.status] ?? STATUS_COLORS.Other }} />
                <span style={{ fontSize: "11px", color: COLORS.TEXT_DARK }}>{entry.slot.status}</span>
            </div>
        </div>
    );
}

// Agenda-style 
export default function ScheduleList({ schedule }) {
    const byDay = DAY_ORDER
        .map((day) => ({
            day,
            entries: schedule.filter((e) => e.slot.days.includes(day)).sort((a, b) => a.slot.start - b.slot.start),
        }))
        .filter((d) => d.entries.length > 0);

    const asyncEntries = schedule.filter((e) => e.slot.days.length === 0);

    return (
        <div style={{ border: `1px solid ${COLORS.ACCENT}`, borderRadius: "10px", overflow: "hidden", background: "#fff" }}>
            {byDay.map(({ day, entries }) => (
                <div key={day} style={{ borderBottom: `1px solid ${COLORS.ACCENT}` }}>
                    <div style={{ padding: "10px 16px", background: COLORS.BACKGROUND, fontSize: "12px", fontWeight: 600, color: COLORS.TEXT_DARK, letterSpacing: "0.03em" }}>
                        {DAY_LABEL[day]}
                    </div>
                    {entries.map((entry, j) => (
                        <Row key={j} entry={entry} borderTop={j > 0 ? `1px solid ${COLORS.ACCENT}80` : "none"} />
                    ))}
                </div>
            ))}

            {asyncEntries.length > 0 && (
                <div>
                    <div style={{ padding: "10px 16px", background: COLORS.BACKGROUND, fontSize: "12px", fontWeight: 600, color: COLORS.TEXT_DARK, letterSpacing: "0.03em" }}>
                        Async / Online
                    </div>
                    {asyncEntries.map((entry, j) => (
                        <Row key={j} entry={entry} borderTop={j > 0 ? `1px solid ${COLORS.ACCENT}80` : "none"} />
                    ))}
                </div>
            )}

            {byDay.length === 0 && asyncEntries.length === 0 && (
                <div style={{ padding: "20px", fontSize: "13px", color: COLORS.TEXT_MEDIUM }}>Nothing scheduled.</div>
            )}
        </div>
    );
}
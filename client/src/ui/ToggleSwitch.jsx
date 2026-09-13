import { COLORS } from "../util/theme.js";

// Accessible toggle switch backed by a real checkbox input
export default function ToggleSwitch({ id, checked, onChange, label }) {
    return (
        <label htmlFor={id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "12px", cursor: "pointer" }}>
            {label && <span style={{ fontSize: "12.5px", color: COLORS.TEXT_LIGHT }}>{label}</span>}
            <span style={{ position: "relative", width: "36px", height: "20px", flexShrink: 0 }}>
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    style={{ position: "absolute", inset: 0, opacity: 0, margin: 0, cursor: "pointer", width: "100%", height: "100%" }}
                />
                <span style={{
                    position: "absolute", inset: 0, borderRadius: "999px",
                    background: checked ? COLORS.BLUE : COLORS.PRIMARY_DARK_ACCENT,
                    transition: "background 0.15s ease", pointerEvents: "none",
                }} />
                <span style={{
                    position: "absolute", top: "2px", left: checked ? "18px" : "2px",
                    width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
                    transition: "left 0.15s ease", pointerEvents: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
                }} />
            </span>
        </label>
    );
}
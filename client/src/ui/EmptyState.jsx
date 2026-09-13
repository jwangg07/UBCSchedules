import { COLORS } from "../util/theme";
import { Calendar, AlertCircle } from "lucide-react";

// Defaults for ungenerated / empty schedules
export default function EmptyState({ tone = "neutral", title, message }) {
    const titleColor = tone === "error" ? COLORS.ERROR : COLORS.TEXT_DARK;
    const Icon = tone === "error" ? AlertCircle : Calendar;
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", height: "100%" }}>
            <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: tone === "error" ? COLORS.ERROR + "1A" : COLORS.BLUE_LIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
            }}>
                <Icon size={20} color={titleColor} />
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: tone === "error" ? "20px" : "22px", color: titleColor, marginBottom: "8px" }}>
                {title}
            </div>
            <div style={{ fontSize: "14px", color: COLORS.TEXT_DARK + "BF", maxWidth: "420px", lineHeight: 1.6 }}>
                {message}
            </div>
        </div>
    );
}
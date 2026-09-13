import { COLORS } from "../util/theme";

// Placeholder UI shown while backend fetchTerms() is loading
export default function SkeletonLoader() {
    return (
        <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
            {/* Top bar skeleton */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 22px", background: COLORS.PRIMARY, flexShrink: 0 }}>
                <div className="skeleton-dark" style={{ width: "150px", height: "18px" }} />
                <div className="skeleton-dark" style={{ width: "110px", height: "30px", borderRadius: "8px" }} />
            </div>

            <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
                {/* Sidebar Skeleton */}
                <div style={{ width: "320px", background: COLORS.PRIMARY, padding: "20px 18px", flexShrink: 0 }}>
                    <div className="skeleton-dark" style={{ width: "120px", height: "12px", marginBottom: "14px" }} />
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="skeleton-dark" style={{ width: "100%", height: "48px", marginBottom: "6px", borderRadius: "10px" }} />
                    ))}
                    <div className="skeleton-dark" style={{ width: "100%", height: "38px", marginTop: "12px", borderRadius: "8px" }} />

                    <div style={{ marginTop: "50px", paddingTop: "18px", borderTop: `1px solid ${COLORS.PRIMARY_DARK_ACCENT}` }}>
                        <div className="skeleton-dark" style={{ width: "70px", height: "10px", marginBottom: "14px" }} />
                        <div className="skeleton-dark" style={{ width: "100%", height: "34px", marginBottom: "10px" }} />
                        <div className="skeleton-dark" style={{ width: "100%", height: "34px", marginBottom: "18px" }} />
                        <div className="skeleton-dark" style={{ width: "150px", height: "10px", marginBottom: "10px" }} />
                        <div className="skeleton-dark" style={{ width: "100%", height: "24px", marginBottom: "8px" }} />
                        <div className="skeleton-dark" style={{ width: "100%", height: "24px" }} />
                    </div>
                </div>

                {/* Main Skeleton */}
                <div style={{ flex: 1, minHeight: 0, padding: "20px 28px", background: "#fff", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexShrink: 0 }}>
                        <div className="skeleton" style={{ width: "230px", height: "50px", borderRadius: "8px" }} />
                        <div style={{ flex: 1 }} />
                        <div className="skeleton" style={{ width: "180px", height: "50px", borderRadius: "8px" }} />
                    </div>

                    <div className="skeleton" style={{ flex: 1, minHeight: 0, borderRadius: "12px" }} />
                </div>
            </div>
        </div>
    );
}
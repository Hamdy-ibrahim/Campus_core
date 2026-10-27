
import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/partner/trends";

export default function PartnerTrends() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTrends = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Trends unavailable");
      }

      const data = await response.json();

      if (!Array.isArray(data.trends)) {
        throw new Error("Unexpected trends response");
      }

      setTrends(data.trends);
    } catch {
      setError("Product trends are temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrends();
  }, [loadTrends]);

  const totalViews = trends.reduce(
    (total, item) => total + (Number(item.viewCount) || 0),
    0
  );

  const totalUnitsSold = trends.reduce(
    (total, item) => total + (Number(item.unitsSold) || 0),
    0
  );

  const styles = {
    section: {
      padding: "24px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
      color: "#172033",
      width: "100%",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
      marginBottom: "22px",
    },
    title: {
      margin: 0,
      color: "#100878",
      fontSize: "22px",
      fontWeight: 700,
    },
    subtitle: {
      margin: "6px 0 0",
      color: "#64748b",
      fontSize: "13px",
    },
    button: {
      background: "#100878",
      color: "#ffffff",
      border: "none",
      borderRadius: "7px",
      padding: "10px 16px",
      fontWeight: 600,
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
    },
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "14px",
      marginBottom: "24px",
    },
    summaryCard: {
      padding: "18px",
      background: "#f5f6ff",
      border: "1px solid #e5e7ff",
      borderRadius: "10px",
    },
    summaryLabel: {
      color: "#64748b",
      fontSize: "13px",
      margin: "0 0 8px",
    },
    summaryValue: {
      color: "#100878",
      fontSize: "26px",
      fontWeight: 700,
      margin: 0,
    },
    tableWrapper: {
      width: "100%",
      overflowX: "auto",
      border: "1px solid #e5e7eb",
      borderRadius: "9px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
      fontSize: "14px",
      minWidth: "480px",
    },
    th: {
      padding: "14px 16px",
      background: "#f1f3f9",
      color: "#334155",
      fontWeight: 700,
      borderBottom: "1px solid #e2e8f0",
    },
    td: {
      padding: "13px 16px",
      borderBottom: "1px solid #edf0f5",
      color: "#334155",
    },
    status: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      color: error ? "#b91c1c" : "#15803d",
      fontSize: "12px",
      fontWeight: 600,
      marginTop: "8px",
    },
    message: {
      padding: "18px",
      borderRadius: "8px",
      background: error ? "#fef2f2" : "#f8fafc",
      color: error ? "#991b1b" : "#475569",
      fontSize: "14px",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Team 5 — Product Trends</h2>
          <p style={styles.subtitle}>
            Live product performance from the Billing System API
          </p>
          <div style={styles.status} role="status">
            <span aria-hidden="true">
              {error ? "●" : loading ? "○" : "●"}
            </span>
            {error
              ? "Data unavailable"
              : loading
                ? "Loading live data..."
                : "Connected to partner API"}
          </div>
        </div>

        <button
          type="button"
          style={styles.button}
          onClick={loadTrends}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh data"}
        </button>
      </div>

      {error ? (
        <div style={styles.message} role="alert">
          <p style={{ margin: "0 0 12px" }}>{error}</p>
          <button
            type="button"
            style={styles.button}
            onClick={loadTrends}
            disabled={loading}
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <div style={styles.summaryGrid}>
            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Products tracked</p>
              <p style={styles.summaryValue}>
                {loading ? "—" : trends.length.toLocaleString()}
              </p>
            </div>

            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Total views</p>
              <p style={styles.summaryValue}>
                {loading ? "—" : totalViews.toLocaleString()}
              </p>
            </div>

            <div style={styles.summaryCard}>
              <p style={styles.summaryLabel}>Total units sold</p>
              <p style={styles.summaryValue}>
                {loading ? "—" : totalUnitsSold.toLocaleString()}
              </p>
            </div>
          </div>

          <h3
            style={{
              color: "#172033",
              fontSize: "16px",
              margin: "0 0 12px",
            }}
          >
            Product performance
          </h3>

          {loading ? (
            <div style={styles.message}>
              Loading product performance...
            </div>
          ) : trends.length === 0 ? (
            <div style={styles.message}>
              No product trends are available yet.
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Product name</th>
                    <th style={styles.th}>Views</th>
                    <th style={styles.th}>Units sold</th>
                  </tr>
                </thead>
                <tbody>
                  {trends.map((item, index) => (
                    <tr
                      key={item.id ?? `${item.name}-${index}`}
                      style={{
                        background: index % 2 === 0 ? "#ffffff" : "#fafbff",
                      }}
                    >
                      <td style={styles.td}>{index + 1}</td>
                      <td
                        style={{
                          ...styles.td,
                          fontWeight: 600,
                          color: "#172033",
                        }}
                      >
                        {item.name || "Unnamed product"}
                      </td>
                      <td style={styles.td}>
                        {(Number(item.viewCount) || 0).toLocaleString()}
                      </td>
                      <td style={styles.td}>
                        {(Number(item.unitsSold) || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}

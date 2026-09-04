"use client";

import type { Metadata } from "next";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        color: "#64748b",
        fontSize: "0.9rem",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "3px solid #1c2a3a",
          borderTopColor: "#3b82f6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      Loading API Documentation...
    </div>
  ),
});

export default function DocsPage() {
  return (
    <>
      <style>{`
        body { margin: 0; padding: 0; }
      `}</style>
      <SwaggerUI
                    url="/api/docs"
                    docExpansion="list"
                    defaultModelsExpandDepth={2}
                    displayRequestDuration={true}
                    filter={true}
                    tryItOutEnabled={true}
                    persistAuthorization={true}
                    withCredentials={true}
                  />
    </>
  );
}

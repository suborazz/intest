/**
 * Utility to print an ID card cleanly without popup blocker issues.
 * Uses a hidden iframe so it won't open unwanted blank tabs/popups,
 * preserves Tailwind styles, colors, and backgrounds.
 */
export function printIdCard(
  elementOrId: HTMLElement | string,
  documentTitle: string = "ID Card",
) {
  if (typeof window === "undefined") return;

  const element =
    typeof elementOrId === "string"
      ? document.getElementById(elementOrId)
      : elementOrId;

  if (!element) {
    console.error(`ID card element not found for printing:`, elementOrId);
    window.print();
    return;
  }

  // Create an invisible iframe
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    console.warn(
      "Could not access iframe document, falling back to window.print",
    );
    window.print();
    if (document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
    return;
  }

  // Collect all stylesheets and inline styles from parent document
  let styles = "";
  document.querySelectorAll("style, link[rel='stylesheet']").forEach((node) => {
    styles += node.outerHTML;
  });

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${documentTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${styles}
        <style>
          @page {
            size: auto;
            margin: 10mm;
          }
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #ffffff !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          body {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 100vh !important;
            padding: 10px !important;
            box-sizing: border-box !important;
          }
          .id-card-print-container {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: auto !important;
          }
          .id-card-print-container > * {
            transform: none !important;
            box-shadow: none !important;
            margin: 0 auto !important;
          }
          .dark {
            background-color: #ffffff !important;
            color: #09090b !important;
          }
        </style>
      </head>
      <body>
        <div class="id-card-print-container">
          ${element.outerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();

  const executePrint = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (err) {
      console.error("Iframe print execution error:", err);
      window.print();
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }
  };

  // Wait for images inside the card to load
  const images = Array.from(doc.images || []);
  if (images.length === 0) {
    setTimeout(executePrint, 250);
  } else {
    let loadedCount = 0;
    const totalImages = images.length;
    let hasTriggered = false;

    const onImageLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalImages && !hasTriggered) {
        hasTriggered = true;
        setTimeout(executePrint, 250);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onImageLoaded();
      } else {
        img.onload = onImageLoaded;
        img.onerror = onImageLoaded;
      }
    });

    // Fallback safety timeout if an image hangs
    setTimeout(() => {
      if (!hasTriggered) {
        hasTriggered = true;
        executePrint();
      }
    }, 1200);
  }
}

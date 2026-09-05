/**
 * Utility to process and automatically compress files in the browser before Base64 conversion.
 * Reduces 2MB-10MB camera photos down to ~40KB - 80KB base64 strings,
 * preventing HTTP 413 (Payload Too Large) and Axios upload timeouts.
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxPdfSizeKb?: number;
  maxImageInputSizeMb?: number;
}

export interface ProcessedFileResult {
  base64: string;
  fileName: string;
  fileSizeKb: number;
  isCompressed: boolean;
}

/**
 * Compresses an image using HTML5 Canvas.
 * Returns base64 data URL.
 */
export function compressImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.75,
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not in browser or Image not available, fallback to direct FileReader
    if (typeof window === "undefined" || !window.HTMLCanvasElement) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let width = img.width;
      let height = img.height;

      // Scale down proportionally if larger than maximum dimension
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // Fallback to direct read
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
        return;
      }

      // Draw with smooth interpolation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Export as compressed JPEG
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    img.onerror = (error) => {
      URL.revokeObjectURL(objectUrl);
      // Fallback to reading file directly
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(error);
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Handles validation and compression for user uploads (Images or PDFs).
 */
export async function processUploadedFile(
  file: File,
  options?: CompressOptions,
): Promise<ProcessedFileResult> {
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";
  const maxPdfSize = (options?.maxPdfSizeKb ?? 1024) * 1024; // 1 MB limit for PDF
  const maxImageInput = (options?.maxImageInputSizeMb ?? 10) * 1024 * 1024; // Up to 10MB input before compression

  if (isImage) {
    if (file.size > maxImageInput) {
      throw new Error(
        `छवि का साइज़ बहुत बड़ा है (अधिकतम 10 MB). कृपया छोटी फ़ाइल चुनें।`,
      );
    }

    const compressedBase64 = await compressImage(
      file,
      options?.maxWidth ?? 1200,
      options?.maxHeight ?? 1200,
      options?.quality ?? 0.72,
    );

    const sizeKb = Math.round((compressedBase64.length * 3) / 4 / 1024);

    return {
      base64: compressedBase64,
      fileName: file.name.replace(/\.[^/.]+$/, "") + ".jpg",
      fileSizeKb: sizeKb,
      isCompressed: true,
    };
  }

  if (isPdf) {
    if (file.size > maxPdfSize) {
      throw new Error(
        `PDF फ़ाइल का साइज़ 1 MB से कम होना चाहिए। (आपकी फ़ाइल: ${(file.size / 1024).toFixed(1)} KB)`,
      );
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve({
          base64,
          fileName: file.name,
          fileSizeKb: Math.round(file.size / 1024),
          isCompressed: false,
        });
      };
      reader.onerror = () => reject(new Error("PDF फ़ाइल पढ़ने में विफल।"));
      reader.readAsDataURL(file);
    });
  }

  // Fallback for any other file types
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        base64: reader.result as string,
        fileName: file.name,
        fileSizeKb: Math.round(file.size / 1024),
        isCompressed: false,
      });
    };
    reader.onerror = () => reject(new Error("फ़ाइल पढ़ने में विफल।"));
    reader.readAsDataURL(file);
  });
}

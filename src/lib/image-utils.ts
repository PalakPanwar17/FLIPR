export interface CompressedImageResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  wasCompressed: boolean;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const MAX_DIMENSION = 1080;
const INITIAL_QUALITY = 0.8;

export async function validateAndCompressImage(
  file: File
): Promise<CompressedImageResult> {
  const originalSize = file.size;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  // Validate filename (only English letters and numbers)
  const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
  if (!/^[a-zA-Z0-9_-]+$/.test(fileName)) {
    throw new Error(
      "Filename must contain only English letters, numbers, hyphens, and underscores"
    );
  }

  // If file is already under 1MB, return as is
  if (originalSize <= MAX_FILE_SIZE) {
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      wasCompressed: false,
    };
  }

  // Compress the image
  const compressedFile = await compressImage(file);

  return {
    file: compressedFile,
    originalSize,
    compressedSize: compressedFile.size,
    wasCompressed: true,
  };
}

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = async () => {
        try {
          const canvas = document.createElement("canvas");
          let { width, height } = img;

          // Resize if dimensions exceed MAX_DIMENSION
          if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            if (width > height) {
              height = (height / width) * MAX_DIMENSION;
              width = MAX_DIMENSION;
            } else {
              width = (width / height) * MAX_DIMENSION;
              height = MAX_DIMENSION;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Try to compress to WebP format with iterative quality reduction
          let quality = INITIAL_QUALITY;
          let blob: Blob | null = null;

          while (quality > 0.1) {
            blob = await new Promise<Blob | null>((res) => {
              canvas.toBlob(
                (b) => res(b),
                "image/webp",
                quality
              );
            });

            if (blob && blob.size <= MAX_FILE_SIZE) {
              break;
            }

            quality -= 0.1;
          }

          if (!blob) {
            reject(new Error("Failed to compress image"));
            return;
          }

          // If still too large, reject
          if (blob.size > MAX_FILE_SIZE) {
            reject(
              new Error(
                "Image is too large and cannot be compressed below 1MB. Please use a smaller image."
              )
            );
            return;
          }

          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, ".webp"),
            {
              type: "image/webp",
            }
          );

          resolve(compressedFile);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

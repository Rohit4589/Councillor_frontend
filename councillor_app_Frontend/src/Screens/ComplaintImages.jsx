import { X } from "lucide-react";
import { useState } from "react";

export default function ComplaintImages() {
  const images = [
    "https://picsum.photos/600/400?1",
    "https://picsum.photos/600/400?2",
    "https://picsum.photos/600/400?3",
  ];

  const [previewIndex, setPreviewIndex] = useState(null);

  return (
    <>
      {/* IMAGE GRID */}
      <div className="card">
        <div className="image-grid">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={() => setPreviewIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewIndex !== null && (
        <div
          className="image-modal-overlay"
          onClick={() => setPreviewIndex(null)}
        >
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>View Image</h5>
              <X
                className="modal-close"
                onClick={() => setPreviewIndex(null)}
              />
            </div>

            <img src={images[previewIndex]} alt="" />

            <div className="modal-actions">
              <button
                className="back"
                onClick={() =>
                  setPreviewIndex((prev) => (prev > 0 ? prev - 1 : prev))
                }
              >
                Back
              </button>

              <button
                onClick={() =>
                  setPreviewIndex((prev) =>
                    prev < images.length - 1 ? prev + 1 : prev
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { X } from "lucide-react";
import { useState } from "react";

export default function ComplaintTranslate({ complaint }) {
  const [showTranslateModal, setShowTranslateModal] = useState(false);

  const translateText = (lang) => {
    const textToTranslate = `
${complaint.summary}
${complaint.description}
Location: ${complaint.location}, ${complaint.ward}
`;

    const url = `https://translate.google.com/?sl=auto&tl=${lang}&text=${encodeURIComponent(
      textToTranslate
    )}&op=translate`;

    window.open(url, "_blank");
    setShowTranslateModal(false);
  };

  return (
    <>
      {/* QUICK ACTION */}
      <div className="card">
        <h5 style={{ fontSize: "14px" }}>Quick Actions</h5>
        <button
          className="action-btn translate-btn"
          onClick={() => setShowTranslateModal(true)}
        >
          丹/A <span>Translate</span>
        </button>
      </div>

      {/* TRANSLATE MODAL */}
      {showTranslateModal && (
        <div
          className="translate-modal-overlay"
          onClick={() => setShowTranslateModal(false)}
        >
          <div className="translate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="translate-modal-header">
              <h5>Select Language</h5>
              <X
                className="translate-modal-close"
                onClick={() => setShowTranslateModal(false)}
              />
            </div>

            <div className="translate-modal-body">
              <button
                className="translate-lang-btn"
                onClick={() => translateText("mr")}
              >
                मराठी (Marathi)
              </button>

              <button
                className="translate-lang-btn"
                onClick={() => translateText("hi")}
              >
                हिंदी (Hindi)
              </button>

              <button
                className="translate-lang-btn"
                onClick={() => translateText("ta")}
              >
                தமிழ் (Tamil)
              </button>

              <button
                className="translate-lang-btn"
                onClick={() => translateText("kn")}
              >
                ಕನ್ನಡ (Kannada)
              </button>

              <button
                className="translate-lang-btn"
                onClick={() => translateText("te")}
              >
                తెలుగు (Telugu)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

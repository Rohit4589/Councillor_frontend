import { X } from "lucide-react";
import "../Style/deleteConfirmModal.css";

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        {/* Close icon */}
        <X className="delete-close" onClick={onClose} />

        {/* Icon */}
        <div className="delete-icon">
          ❌
        </div>

        {/* Text */}
        <p className="delete-text">
          Are you sure want to delete <br /> the category?
        </p>

        {/* Buttons */}
        <div className="delete-actions">
          <button className="btn-no" onClick={onClose}>
            No
          </button>
          <button className="btn-yes" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

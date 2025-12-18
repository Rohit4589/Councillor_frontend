import { X, Save } from "lucide-react";
import "../Style/addCategoryModal.css";

export default function CategoryModal({
  open,
  onClose,
  mode = "add",
  data = {},
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <h3>{mode === "edit" ? "Edit Category" : "Add Category"}</h3>
          <X className="close-icon" onClick={onClose} />
        </div>

        {/* Body */}
        <div className="modal-body">
          <label>Category Name</label>
          <input
            type="text"
            defaultValue={data.name || ""}
            placeholder="Street Lights"
          />

          <label>Phone Number</label>
          <input
            type="text"
            defaultValue={data.phone || ""}
            placeholder="678767655756"
          />
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-save">
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

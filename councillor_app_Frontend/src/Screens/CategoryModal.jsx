import { X, Save } from "lucide-react";
import "../Style/addCategoryModal.css";
import { useEffect, useState } from "react";

export default function CategoryModal({
  open,
  onClose,
  onSave,
  mode = "add",
  data = null,
}) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  /* ================================
     PREFILL FOR EDIT
     ================================ */
  useEffect(() => {
    if (mode === "edit" && data) {
      setName(data.name || "");
      setPhone(data.phone || "");
    }

    if (mode === "add") {
      setName("");
      setPhone("");
    }
  }, [mode, data, open]);


  if (!open) return null;

  /* ================================
     SAVE
     ================================ */
 const handleSave = () => {
   if (!name || phone.length !== 10) return;
   onSave({ name, phone });
 };


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* ===== HEADER ===== */}
        <div className="modal-header">
          <h3>{mode === "edit" ? "Edit Category" : "Add Category"}</h3>
          <X className="close-icon" onClick={onClose} />
        </div>

        {/* ===== BODY ===== */}
        <div className="modal-body">
          <label>Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Street Lights"
          />

          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, "");
              if (numericValue.length <= 10) {
                setPhone(numericValue);
              }
            }}
            placeholder="9876543210"
          />
        </div>

        {/* ===== FOOTER ===== */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="btn-save" onClick={handleSave}>
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

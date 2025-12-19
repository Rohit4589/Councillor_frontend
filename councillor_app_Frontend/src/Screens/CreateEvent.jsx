import "../Style/createEvent.css";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreateEvent() {

  /* ================================
     STATE (STATIC FOR NOW)
     ================================ */

  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  /* Categories (STATIC → API READY) */
  const [categories, setCategories] = useState([
    { id: 1, name: "Cleanliness Drive" },
    { id: 2, name: "Water Supply" },
    { id: 3, name: "Road Repair" },
    { id: 4, name: "Health Camp" },
  ]);

  /* ================================
     API FETCH FOR CATEGORIES (LATER)
     ================================ */

  useEffect(() => {

    /*
    🔴 WHEN API IS READY
    -------------------
    fetch("http://localhost:5000/api/event-categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Category API Error:", err));
    */

  }, []);

  /* ================================
     HANDLERS
     ================================ */

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files.slice(0, 5)); // max 5 images
  };

  const handleSubmit = () => {

    const eventData = {
      eventName,
      category,
      description,
      photos,
    };

    console.log("EVENT DATA:", eventData);

    /*
    🔴 API VERSION (PASTE LATER)
    ---------------------------
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("category", category);
    formData.append("description", description);

    photos.forEach(photo => {
      formData.append("photos", photo);
    });

    fetch("http://localhost:5000/api/events", {
      method: "POST",
      body: formData
    });
    */

    // RESET FORM (STATIC MODE)
    setEventName("");
    setCategory("");
    setDescription("");
    setPhotos([]);
  };

  return (
    <div className="create-event-wrapper">
      <div className="create-event-card">

        {/* ===== EVENT NAME ===== */}
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            placeholder="Clean City Drive"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        {/* ===== CATEGORY ===== */}
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* ===== UPLOAD PHOTOS ===== */}
        <div className="form-group">
          <label>Photos (Optional)</label>
          <label className="upload-box">
            <Camera size={28} />
            <p>Upload Photos</p>
            <span>Max 5 images</span>
            <input
              type="file"
              multiple
              hidden
              onChange={handlePhotoUpload}
            />
          </label>

          {/* Preview count */}
          {photos.length > 0 && (
            <p className="photo-count">
              {photos.length} image(s) selected
            </p>
          )}
        </div>
      </div>

      {/* ===== FOOTER BUTTONS ===== */}
      <div className="create-event-footer">
        <button
          className="btn-cancel"
          onClick={() => {
            setEventName("");
            setCategory("");
            setDescription("");
            setPhotos([]);
          }}
        >
          Cancel
        </button>

        <button className="btn-post" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
}

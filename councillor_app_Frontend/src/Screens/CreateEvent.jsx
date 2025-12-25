import "../Style/createEvent.css";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { getEventCategories, createEvent } from "../api/eventsApi";
import { faker } from "@faker-js/faker";

export default function CreateEvent() {
  /* ================================
     STATE
  ================================ */
  const [eventName, setEventName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================================
     CATEGORY LIST (API + FAKER)
  ================================ */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getEventCategories()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {
        // ✅ Faker fallback
        setCategories(
          Array.from({ length: 2 }).map((_, i) => ({
            id: i + 1,
            name: faker.commerce.department(),
          }))
        );
      });
  }, []);

  /* ================================
     FILE HANDLING
  ================================ */
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files.slice(0, 5));
  };

  /* ================================
     SUBMIT
  ================================ */
  const handleSubmit = async () => {
    if (!eventName || !categoryId || !description) {
      alert("All required fields must be filled");
      return;
    }

    setLoading(true);

    try {
      await createEvent({
        event_name: eventName,
        category_id: categoryId,
        description,
        photos,
      });

      alert("Event created successfully");

      // reset
      setEventName("");
      setCategoryId("");
      setDescription("");
      setPhotos([]);
    } catch (err) {
      console.error("Create Event Error:", err);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-wrapper">
      <div className="create-event-card">
        {/* Event Name */}
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            placeholder="Clean City Drive"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Photos */}
        <div className="form-group">
          <label>Photos (Optional)</label>
          <label className="upload-box">
            <Camera size={28} />
            <p>Upload Photos</p>
            <span>Max 5 images</span>
            <input type="file" multiple hidden onChange={handlePhotoUpload} />
          </label>

          {photos.length > 0 && (
            <p className="photo-count">{photos.length} image(s) selected</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="create-event-footer">
        <button
          className="btn-cancel"
          onClick={() => {
            setEventName("");
            setCategoryId("");
            setDescription("");
            setPhotos([]);
          }}
        >
          Cancel
        </button>

        <button className="btn-post" onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

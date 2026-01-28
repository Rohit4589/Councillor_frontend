import "../Style/createEvent.css";
import { Camera, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getEventCategories, createEvent } from "../api/eventsApi";

export default function CreateEvent() {
  /* ================================
     STATE
  ================================ */
  const [eventName, setEventName] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  /* ================================
     CATEGORY LIST
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
        setCategories(
          Array.from({ length: 5 }).map((_, i) => ({
            id: i + 1,
          })),
        );
      });
  }, []);

  /* ================================
     EVENT NAME HANDLER
  ================================ */
  const handleEventNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9\s\-]*$/;

    if (!regex.test(value)) {
      setEventNameError("Only alphabets are allowed");
      return;
    }

    setEventNameError("");
    setEventName(value);
  };

  /* ================================
     FILE HANDLING
  ================================ */
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files.slice(0, 5));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVideo(file);
  };

  /* ================================
     RESET
  ================================ */
  const resetForm = () => {
    setEventName("");
    setEventNameError("");
    setCategoryId("");
    setDescription("");
    setPhotos([]);
    setVideo(null);

    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  /* ================================
     SUBMIT
  ================================ */
  const handleSubmit = async () => {
    if (!eventName || !categoryId || !description) {
      alert("All required fields must be filled");
      return;
    }
    console.log({
      event_name: eventName,
      category_id: categoryId,
      description,
      photosCount: photos.length,
      videoPresent: !!video,
    });


    if (eventNameError) return;

    setLoading(true);

    try {
      await createEvent({
        event_name: eventName,
        category_id: Number(categoryId),
        description,
        photos,
        video,
      });

      alert("Event created successfully");
      resetForm();
    } catch (err) {
      console.error(err);
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
            onChange={handleEventNameChange}
          />
          {eventNameError && <p className="error-text">{eventNameError}</p>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value="">Select Category</option>

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
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              ref={imageInputRef}
              onChange={handlePhotoUpload}
            />
          </label>

          {/* ✅ SELECTED IMAGES COUNT */}
          {photos.length > 0 && (
            <p style={{ marginTop: "8px", fontSize: "13px", color: "#555" }}>
              {photos.length} image{photos.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* Video */}
        <div className="form-group">
          <label>Video (Optional)</label>
          <label className="upload-box">
            <Video size={28} />
            <p>Upload Video</p>
            <span>Max 1 video</span>
            <input
              type="file"
              accept="video/*"
              hidden
              ref={videoInputRef}
              onChange={handleVideoUpload}
            />
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="create-event-footer">
        <button className="btn-cancel" onClick={resetForm}>
          Cancel
        </button>

        <button
          className="btn-post"
          onClick={handleSubmit}
          disabled={loading || eventNameError}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

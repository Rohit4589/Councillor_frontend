import "../Style/createEvent.css";
import { Camera } from "lucide-react";

export default function CreateEvent() {
  return (
    <div className="create-event-wrapper">
      <div className="create-event-card">
        {/* Event Name */}
        <div className="form-group">
          <label>Event Name</label>
          <input type="text" placeholder="Rajesh Sharma" />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select>
            <option value="">Select</option>
            <option value="cleanliness">Cleanliness Drive</option>
            <option value="water">Water Supply</option>
            <option value="road">Road Repair</option>
            <option value="health">Health Camp</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea rows="4" />
        </div>

        {/* Upload Photos */}
        <div className="form-group">
          <label>Photos (Optional)</label>
          <div className="upload-box">
            <Camera size={28} />
            <p>Upload Photos</p>
            <span>Max 5 images</span>
            <input type="file" multiple hidden />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="create-event-footer">
        <button className="btn-cancel">Cancel</button>
        <button className="btn-post">Post</button>
      </div>
    </div>
  );
}

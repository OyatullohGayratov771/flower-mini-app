
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminUploadProductPhoto } from "../../api/products";

export default function ProductUploadPhoto() {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlePhotoUpload = async () => {
    setLoading(true);
    try {
      await adminUploadProductPhoto(token, photo);
      alert("Photo uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading photo!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Product Photo</h1>
      <form>
        <input type="file" onChange={handlePhotoChange} />
        <button onClick={handlePhotoUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { toast } from "react-toastify";

export default function UploadImageAvatar() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { userId } = useAuth();
  const authToken = localStorage.getItem("authToken");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const imageUrl = URL.createObjectURL(selectedFile);
    setImagePreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile-upload",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      const responseText = await response.text();
      console.log("Response Text:", responseText);
      let result;
      try {
        result = JSON.parse(responseText);
        toast.success("آپلود عکس انجام شد");
      } catch (error) {
        console.error("Error parsing JSON", error);
        return;
      }

      console.log("File uploaded successfully", result);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full"
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <Input
          id="dropzone-file"
          type="file"
          color="primary"
          variant="bordered"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Image preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}

      <Button type="submit" fullWidth color="secondary" variant="ghost">
        آپلود عکس
      </Button>
    </form>
  );
}

"use client"; 

export const dynamic = "force-dynamic"; 

import { SetStateAction, useState } from "react"; // React hooks for managing component state.
import { faCamera } from "@fortawesome/free-solid-svg-icons"; // FontAwesome icon for the camera.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Component to render FontAwesome icons.
import { useUser } from "@clerk/nextjs"; // Hook to access the authenticated user's data.
import { UploadButton } from "~/utils/uploadthing"; // Component for handling file uploads.
import { useRouter } from "next/navigation"; // Hook for client-side navigation.
import { getLastID, posted } from "~/server/actions"; // Server actions for fetching the last post ID and submitting a post.

export default function InputModal() {
  // State to control the visibility of the upload button.
  const [showUploadButton, setShowUploadButton] = useState(true);

  // State to control the visibility of the modal.
  const [showModal, setShowModal] = useState(false);

  // State to store the text input for the post.
  const [text, setText] = useState("");

  // State to store the URL of the uploaded image.
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Hook to access the authenticated user's data.
  const { user } = useUser();

  // Hook for client-side navigation.
  const router = useRouter();

  // Handler for updating the text state when the user types in the textarea.
  const handleTextChange = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };

  // Handler for when an image upload is complete.
  const handleUploadComplete = async (res: { url: string }[]) => {
    if (res && res.length > 0) {
      const uploadedImageUrl = res[0]?.url || null;
      setImageUrl(uploadedImageUrl); // Set the uploaded image URL.
    }

    setShowUploadButton(false); // Hide the upload button after an image is uploaded.
    router.refresh(); // Refresh the page to reflect changes.
  };

  // Handler for closing the modal and resetting states.
  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal.
    setShowUploadButton(true); // Show the upload button again.
    setImageUrl(null); // Clear the uploaded image URL.
  };

  return (
    <>
      {/* Main container for the post creation UI */}
      <div className="createPost mx-4 my-6 flex max-w-md rounded-lg shadow-lg md:mx-auto md:max-w-xl" id="top">
        {/* Display the user's profile image or a fallback message */}
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="User profile"
            className="ml-3 mt-3 h-8 w-8 rounded-full"
          />
        ) : (
          <p> </p>
        )}

        {/* Button to open the modal for creating a post */}
        <button
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-3 text-left shadow-sm hover:border-blue-500 focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          {/* Input field (read-only) to prompt the user to create a post */}
          <input
            type="text"
            placeholder="Create a post"
            className="createPostInput flex-grow rounded-xl px-4 py-1 focus:outline-none"
            readOnly
          />
          {/* Camera icon */}
          <a className="icon rounded-full px-2">
            <FontAwesomeIcon icon={faCamera} />
          </a>
        </button>

        {/* Modal for creating a post */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="postBox relative rounded-xl p-6 shadow-lg">
              {/* Close button for the modal */}
              <button
                className="closeButton absolute right-2 top-1 p-2 text-white"
                onClick={handleCloseModal}
              >
                X
              </button>

              {/* Modal title */}
              <h2 className="mb-2 text-center text-lg font-semibold">
                Create post
              </h2>

              {/* Divider */}
              <hr className="mx-auto my-2 mb-6 max-w-md border-t-2 border-[#3c3c3f] md:max-w-xl" />

              {/* Modal content */}
              <div className="flex flex-col gap-2">
                {/* Textarea for the post content */}
                <textarea
                  placeholder="What's new, User?"
                  className="contentInput flex-grow rounded-xl px-4 py-2 focus:outline-none mb-4 overflow-hidden resize-none w-full h-40"
                  style={{ color: "#afaeae" }}
                  value={text}
                  onChange={handleTextChange}
                  required
                ></textarea>

                {/* Display the uploaded image (if any) */}
                {imageUrl && (
                  <div className="mt-4 relative">
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="max-w-full h-auto rounded-lg"
                    />
                    {/* Button to remove the uploaded image */}
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-red-600"
                      onClick={() => {
                        setImageUrl(null);
                        setShowUploadButton(true);
                      }}
                    >
                      X
                    </button>
                  </div>
                )}

                {/* Upload button for images (only shown if no image is uploaded) */}
                {showUploadButton && (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUploadComplete}
                  />
                )}

                {/* Form for submitting the post */}
                <form
                  action={async () => {
                    const id = await getLastID(); // Fetch the last post ID.
                    // Submit the post with the text and the last post ID.
                    await posted(id || 0, text);
                  }}
                >
                  <div className="flex justify-center">
                    {/* Submit button (disabled if no text is entered) */}
                    <button
                      className={`postButton px-4 py-2 rounded-lg text-white ${text
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300 cursor-not-allowed"
                        }`}
                      disabled={!text}
                      type="submit"
                    >
                      POST
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Divider below the post creation UI */}
      <hr className="mx-auto my-1 max-w-md border-t-2 border-[#3c3c3f] md:max-w-xl" />
    </>
  );
}
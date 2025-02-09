"use client";

export const dynamic = "force-dynamic";

import { SetStateAction, useState } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { getLastID, posted } from "~/server/actions";

export default function InputModal() {
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const handleTextChange = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };

  const handleUploadComplete = async (res: { url: string }[]) => {
    if (res && res.length > 0) {
      const uploadedImageUrl = res[0]?.url || null;
      setImageUrl(uploadedImageUrl);
    }

    setShowUploadButton(false);
    router.refresh();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowUploadButton(true);
    setImageUrl(null);
    setText("");
  };

  return (
    <>
      <div className="createPost mx-4 my-6 flex max-w-md rounded-lg shadow-lg md:mx-auto md:max-w-xl">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="User profile"
            className="ml-3 mt-3 h-8 w-8 rounded-full"
          />
        ) : (
          <p></p>
        )}

        <button
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-3 text-left shadow-sm hover:border-blue-500 focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          <input
            type="text"
            placeholder="Create a post"
            className="createPostInput flex-grow rounded-xl px-4 py-1 focus:outline-none"
            readOnly
          />
          <a className="icon rounded-full px-2">
            <FontAwesomeIcon icon={faCamera} />
          </a>
        </button>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="postBox relative rounded-xl p-6 shadow-lg">
              <button
                className="closeButton absolute right-2 top-1 p-2 text-white"
                onClick={handleCloseModal}
              >
                X
              </button>

              <h2 className="mb-2 text-center text-lg font-semibold">
                Create post
              </h2>

              <hr className="mx-auto my-2 mb-6 max-w-md border-t-2 border-[#3c3c3f] md:max-w-xl" />

              <div className="flex flex-col gap-2">
                <textarea
                  placeholder="What's new, User?"
                  className="contentInput flex-grow rounded-xl px-4 py-2 focus:outline-none mb-4 overflow-hidden resize-none w-full h-40"
                  style={{ color: "#afaeae" }}
                  value={text}
                  onChange={handleTextChange}
                  required
                ></textarea>

                {imageUrl && (
                  <div className="mt-4 relative">
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="max-w-full h-auto rounded-lg"
                    />
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

                {showUploadButton && (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUploadComplete}
                  />
                )}

                <form
                  action={async () => {
                    const id = await getLastID();
                    await posted(id || 0, text);
                  }}
                >
                  <div className="flex justify-center">
                    <button
                      className={`postButton px-4 py-2 rounded-lg text-white ${text && imageUrl
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                      disabled={!text || !imageUrl}
                      type="submit"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="mx-auto my-1 max-w-md border-t-2 border-[#3c3c3f] md:max-w-xl" />
    </>
  );
}
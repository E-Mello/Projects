import { Avatar, Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { supabase } from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";

// let myuuid = uuidv4();
export default function PersonalAvatar({ url, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      {avatarUrl ? (
        <Avatar
          size={"2xl"}
          src={avatarUrl}
          alt={"Avatar"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
      ) : (
        <Avatar
          size={"2xl"}
          src={avatarUrl}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
      )}
      <Flex>
        <Button
          size={"sm"}
          flex={1}
          mb={4}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.200",
          }}
        >
          <label className="button primary block" htmlFor="single">
            {uploading ? "Uploading..." : "Upload"}
          </label>
        </Button>

        <Input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type={"file"}
          id={"single"}
          accept="image/*"
          onChange={uploadAvatar}
        />
      </Flex>
    </>
  );
}

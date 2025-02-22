'use client'

import { SubmitHandler } from "react-hook-form";
import FormPost from "./formPost";
import { FormInputPost } from "@/types/types";

const CreatePost = () => {
  const handlerCreatePost: SubmitHandler<FormInputPost> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <FormPost submit={handlerCreatePost} isEditing={false} />
    </div>
  );
};

export default CreatePost;

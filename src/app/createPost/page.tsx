"use client";

import { SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import FormPost from "./formPost";
import { FormInputPost } from "@/types/types";


const CreatePost = () => {
  const router = useRouter();

  const { mutate: createPost, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: async (newPost: FormInputPost) => {
      const formData = new FormData();
      formData.append("file", newPost.file[0]); // Arquivo
      formData.append("title", newPost.title);
      formData.append("content", newPost.content);
      formData.append("tagId", newPost.tagId);

      return fetch("/api/posts/create", {
        method: "POST",
        body: formData,
      });
    },
    onError: (error) => {
      console.error("Erro ao criar post:", error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const handlerCreatePost: SubmitHandler<FormInputPost> = (data) => {
    createPost(data);
  };

  return (
    <div>
      <FormPost
        submit={handlerCreatePost}
        isEditing={false}
        isLoadingSubmir={isLoadingSubmit}
      />
    </div>
  );
};

export default CreatePost;

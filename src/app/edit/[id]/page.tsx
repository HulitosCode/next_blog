'use client'

import FormPost from "@/app/createPost/formPost";
import { FormInputPost } from "@/types/types";
import { SubmitHandler } from "react-hook-form";

const EditPostPage = () => {
    const handlerEditPost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data);
      };
      return (
        <div>
          <FormPost submit={handlerEditPost} isEditing={true} />
        </div>
      );
}
 
export default EditPostPage;
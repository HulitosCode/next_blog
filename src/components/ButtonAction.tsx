"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ButtonActionProps {
  id: string;
}

const ButtonAction = ({ id }: ButtonActionProps) => {
  const router = useRouter();

  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao deletar post");
    },
    onError: (error) => {
      console.error("Erro ao deletar post:", error);
      toast.error("Erro ao deletar o post.");
    },
    onSuccess: () => {
      toast.success("Post deletado com sucesso!");
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div className="flex gap-4">
      <Button className="bg-blue-600 hover:bg-blue-500 flex items-center gap-2">
        <Pencil size={16} />
        <Link href={`/edit/${id}`}>Edit</Link>
      </Button>

      <Button
        onClick={() => deletePost()}
        className="bg-red-600 hover:bg-red-500 flex items-center gap-2"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            Processando...
          </div>
        ) : (
          <>
            <Trash size={16} />
            Delete
          </>
        )}
      </Button>
    </div>
  );
};

export default ButtonAction;

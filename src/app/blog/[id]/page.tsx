import { notFound } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import ButtonAction from "@/components/ButtonAction";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/prisma";

interface BlogDetailPageProps {
  params: { id: string };
}

// Função para buscar post do banco de dados
const getPost = async (id: string) => {
  try {
    const post = await db.post.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        file: true,
        tag: true,
      },
    });
    return post;
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return null;
  }
};

// **Página agora é uma função async!**
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await getPost(params.id);

  // Redirecionar para 404 se não encontrar post
  if (!post) return notFound();

  const imageUrl = post.file
    ? post.file.startsWith("/uploads")
      ? post.file
      : `/uploads/${post.file}`
    : "/images/placeholder.png"; // Fallback se não tiver imagem

  return (
    <div className="p-20 mx-24">
      <BackButton />
      
    <div className="flex gap-12 mt-10">
    <Image
        src={imageUrl}
        width={500}
        height={500}
        alt={post.title}
        className="rounded-lg object-cover"
      />
      <div>
      <h2 className="font-bold text-2xl">{post.title}</h2>

      <p className="mt-4">{post.content}</p>
      <Badge className="bg-yellow-400">{post.tag.name}</Badge>
      <div className="py-6">
        <ButtonAction id={params.id} />
      </div>
      </div>
    </div>
    </div>
  );
}

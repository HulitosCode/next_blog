import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ContextProps {
  params: { postId: string };
}

// Função DELETE para remover o post
export async function DELETE(req: Request, context: ContextProps) {
  try {
    const { params } = context;
    await db.post.delete({
      where: {
        id: params.postId,
      },
    });
    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { message: "Could not delete post" },
      { status: 500 },
    );
  }
}

// Função PATCH para atualizar o post
export async function PATCH(req: Request, context: ContextProps) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tagId = formData.get("tagId") as string;

    // Validação de campos obrigatórios
    if (!file || !title || !content || !tagId) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    // Gerar nome de arquivo único para a imagem
    const fileName = `${Date.now()}-${file.name}`;
    const { params } = context;

    // Atualizar o post no banco
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title,
        content,
        file: `/uploads/${fileName}`, // Caminho da imagem
        tagId,
      },
    });

    return NextResponse.json({ message: "Update success" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Could not update post" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request, context: ContextProps) {
  try {
    const { params } = context;
    const post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        tag: true,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Could not fetch tags" },
      { status: 500 },
    );
  }
}

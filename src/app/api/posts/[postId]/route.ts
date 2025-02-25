import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Função DELETE para remover o post
export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
  try {
    await db.post.delete({
      where: { id: params.postId },
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
export async function PATCH(req: Request, { params }: { params: { postId: string } }) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tagId = formData.get("tagId") as string;

    if (!file || !title || !content || !tagId) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    const fileName = `${Date.now()}-${file.name}`;

    await db.post.update({
      where: { id: params.postId },
      data: {
        title,
        content,
        file: `/uploads/${fileName}`,
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

// Função GET para obter um post específico
export async function GET(req: Request, { params }: { params: { postId: string } }) {
  try {
    const post = await db.post.findFirst({
      where: { id: params.postId },
      include: { tag: true },
    });
    return NextResponse.json(post, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Could not fetch post" },
      { status: 500 },
    );
  }
}

import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
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

    // Converter File para Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Criar nome único para o arquivo
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    // Salvar o arquivo na pasta `public/uploads`
    await writeFile(filePath, buffer);

    // Criar o post no banco de dados com o caminho da imagem
    const post = await db.post.create({
      data: {
        title,
        content,
        file: `/uploads/${fileName}`, // Caminho da imagem
        tagId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { message: "Erro ao criar post" },
      { status: 500 },
    );
  }
}

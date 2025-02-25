import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tag } from "@prisma/client";
import { FC } from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    file?: string;
    tag: Tag;
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { id, title, content, file, tag } = post;

  const imageUrl = file?.startsWith("/uploads") ? file : `/uploads/${file}`;

  return (
    <div>
      <Card className="w-72 h-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image
            src={imageUrl}
            width={100}
            height={50}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="mt-5">{typeof content == 'string' ? content.slice(3, 80) : ''}</p>
        </CardContent>
        <CardFooter className="justify-between">
          <Badge className="bg-blue-600">{tag.name}</Badge>
          <Link href={`/blog/${id}`} className="hover:underline">
            Ler mais...
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;

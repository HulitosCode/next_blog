import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const PostCard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="justify-end">
          <Link href="/blog/1" className="hover:underline">
            Ler mais...
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;

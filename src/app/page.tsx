import PostCard from "@/components/PostCard";
import { db } from "@/lib/prisma";

async function getPosts() {
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      file: true,
      tag: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return response;
}

const Home = async () => {
  const posts = await getPosts();
  console.log(posts);

  return (
    <div className="p-20 mx-24">
      <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Home;

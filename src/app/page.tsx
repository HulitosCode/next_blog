import PostCard from "@/components/PostCard";

const Home = () => {
  return (
    <div className="p-20 mx-24">
      <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </main>
    </div>
  );
};

export default Home;

import BackButton from "@/components/BackButton";
import ButtonAction from "@/components/ButtonAction";

const BlogDetailPage = () => {
    return ( 
        <div className="p-20 mx-24">
                            <BackButton />

            <div className="mb-10">
                <h2 className="py-10">Post One</h2>
                <ButtonAction />
            </div>
            <p>Post one content</p>
        </div>
     );
}
 
export default BlogDetailPage;
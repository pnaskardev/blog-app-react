import { Link } from "react-router-dom";
import { DatabaseService } from "../../appwrite/database/DatabaseService";

function PostCard({
  $id,
  title,
  featuredImage,
}: {
  $id: string;
  title: string;
  featuredImage: string;
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={DatabaseService.getInstance().getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

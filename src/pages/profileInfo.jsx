import { Avatar, Chip } from "@heroui/react";
import axios from "axios";
import { useLoaderData } from "react-router";

const UserProfile = () => {
  const user = useLoaderData();
  console.log("🚀 ~ UserProfile ~ user:", user)
  return (
    <div className="max-w-5xl mx-auto min-h-screen mt-10">
      <div className="px-3 py-2">
        <div className="flex flex-col gap-5 text-center">
          <Avatar
            src={user?.profilePhoto || user?.url}
            isBordered
            size="lg"
            className="block mx-auto w-20 h-20"
            color="primary"
          />
          <h5 className=" font-semibold text-xl">{`${user?.firstName} ${user?.lastName}`}</h5>
          <Chip
            color="primary"
            variant="dot"
            className="text-center mx-auto text-xl border-none"
          >
            {user?.email}
          </Chip>

          <p className="text-sm text-gray-400 max-w-4xl mx-auto text-center">
            {user?.bio}
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <div className="font-semibold text-center mx-4">
            <p className="text-black">{user?.posts?.length}</p>
            <span className="text-gray-400">Posts Count</span>
          </div>
          <div className="font-semibold text-center mx-4">
            <p className="text-black">{ user?.followers.length }</p>
            <span className="text-gray-400">Followers</span>
          </div>
          <div className="font-semibold text-center mx-4">
            <p className="text-black">{ user?.following.length }</p>
            <span className="text-gray-400">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

export async function loader({ params }) {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.get(
    `http://localhost:5000/api/users/profile/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
}

import { Card } from "@heroui/card";
import HeroHeader from "../components/heros";
import axios from "axios";
import { Link, useLoaderData } from "react-router";
import moment from "moment";



export default function PostPage() {
  const posts = useLoaderData();
  return (
    <div className="mx-auto max-w-7xl ">
      <HeroHeader />
      <div className="w-11/12 mx-auto">
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none md:grid-cols-2 xl:grid-cols-3">
          {posts?.map((post) => (
            <Card
              as={Link}
              to={post?._id}
              key={post._id}
              className="flex flex-col items-start justify-between p-3"
              isHoverable
              isBlurred
              isPressable
            >
              <div className="relative w-full">
                <img
                  src={post?.url}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="">
                <div className="mt-8 flex items-center justify-between text-sm">
                  <a
                    href={post?.category}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post?.category}
                  </a>
                  <time dateTime={post?.createdAt} className="text-gray-500">
                    {moment(post?.createdAt).format("MMM Do YY")}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post?.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post?.cardDescription}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={
                      post?.user?.profilePhoto || post?.user?.url
                    }
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-100"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post?.user?.firstName}>
                        <span className="absolute inset-0" />
                        {`${post?.user?.firstName} ${post?.user?.lastName}`}
                      </a>
                    </p>
                    <p className="text-gray-600">{post?.user?.email}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  const authToken = localStorage.getItem("authToken");

  const resultPosts = await axios.get("http://localhost:5000/api/posts ", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const posts = resultPosts.data;

  return posts;
}

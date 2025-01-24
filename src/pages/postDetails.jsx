import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import axios from "axios";
import moment from "moment";
import { Form, useLoaderData } from "react-router";
import DOMPurify from "dompurify";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { useAuth } from "../hooks/useAuth";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
export default function PostDetailsPage() {
  const { posts, comments } = useLoaderData();
  const sanitizedHTML = DOMPurify.sanitize(posts?.description);
  const { userId } = useAuth();

  return (
    <>
      <main className="pt-12 pb-20 lg:pt-20 lg:pb-28 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between  max-w-7xl mx-auto">
          <article className="w-2/3 mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-6 lg:mb-8 not-format ">
              <div className="flex flex-col md:flex-row gap-y-4 items-center mb-8 not-italic w-full justify-between">
                <div className="inline-flex items-center gap-4 mr-4 text-sm text-gray-900 dark:text-white">
                  <Avatar
                    className=" rounded-full"
                    src={posts?.user?.profilePhoto}
                    alt={posts?.user?.email}
                    isBordered
                    color="primary"
                    size="lg"
                  />
                  <div className="flex flex-col gap-0.5">
                    <a
                      href="#"
                      rel="author"
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                      {`${posts?.user?.firstName} - ${posts?.user?.lastName}`}
                    </a>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                      {posts?.user?.email}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      <time title="February 8th, 2022">
                        {moment(posts?.updatedAt).format("MMM Do YY")}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="flex   gap-4 items-center">
                  <Form method="PUT">
                    <input type="hidden" name="postId" value={posts?._id} />
                    <Button
                      color="danger"
                      variant="bordered"
                      name="_action"
                      value="dislike"
                      type="submit"
                      endContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                          />
                        </svg>
                      }
                    >
                      {posts?.disLikes.length}
                    </Button>
                  </Form>
                  <Form method="PUT">
                    <input type="hidden" name="postId" value={posts?._id} />
                    <Button
                      color="success"
                      name="_action"
                      value="like"
                      type="submit"
                      startContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 font-sans"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                          />
                        </svg>
                      }
                      variant="bordered"
                    >
                      {posts?.likes.length}
                    </Button>
                  </Form>
                  <Button
                    color="default"
                    fullWidth
                    className="space-x-3 text-end "
                    variant="faded"
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    }
                  >
                    {posts?.numViews}
                  </Button>
                </div>
              </div>
            </header>
            <h1 className="my-12 text-4xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
              {posts?.title}
            </h1>
            <figure className="mb-8 h-[500px]">
              <img
                src={posts?.image || posts?.url}
                alt=""
                className="rounded-xl shadow-lg w-full h-full object-cover"
              />
              <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400"></figcaption>
            </figure>

            <section className="mb-8">
              <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </section>

            <section className="not-format mb-8 w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <span>نظرات</span>
                  <Chip
                    variant="dot"
                    color="primary"
                    size="sm"
                    className="text-primary border-primary"
                  >
                    {comments.length}
                  </Chip>
                </h2>
              </div>
              <Form method="POST" className="mb-8 w-full space-y-8">
                <input type="hidden" name="postId" value={posts?._id} />
                <input type="hidden" name="userId" value={posts?.user?._id} />
                <Textarea
                  disableAnimation
                  disableAutosize
                  name="description"
                  color="primary"
                  fullWidth
                  classNames={{
                    base: "max-w-full",
                    input: "resize-y min-h-[60px] w-full",
                  }}
                  label="نظرات"
                  placeholder="نظرات خود را وارد کنید"
                  variant="bordered"
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="bordered"
                  fullWidth
                >
                  ارسال نظرات
                </Button>
              </Form>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <Card className="w-full" key={comment.id}>
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          color="primary"
                          src={
                            comment?.user?.profilePhoto || comment?.user?.url
                          }
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {`${comment?.user?.firstName} ${comment?.user?.lastName}`}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            {comment?.user?.email}
                          </h5>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="px-3 py-2 text-small text-default-400 text-start">
                      <p>{comment?.description}</p>
                    </CardBody>
                    <CardFooter className="gap-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <p className=" text-default-400 text-sm">
                          تاریخ انتشار
                        </p>
                        <p className="text-default-400">
                          <Chip
                            color="primary"
                            variant="dot"
                            className="border-none text-primary"
                          >
                            {moment(comment?.createdAt)
                              .subtract(6, "days")
                              .calendar()}
                          </Chip>
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {comment?.user?._id === userId && (
                          <Tooltip color="danger" content="Delete comment">
                            <Form method="DELETE">
                              <input
                                type="hidden"
                                name="commentId"
                                value={comment?._id}
                              />
                              <Button
                                isIconOnly
                                color="danger"
                                variant="ghost"
                                size="sm"
                                className="text-md"
                                type="submit"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </Button>
                            </Form>
                          </Tooltip>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}

export async function loader({ params }) {
  const authToken = localStorage.getItem("authToken");

  const resultPosts = await axios.get(
    `http://localhost:5000/api/posts/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const posts = resultPosts.data;

  const resultComments = await axios.get(
    `http://localhost:5000/api/comments/post/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const comments = resultComments.data;
  console.log("🚀 ~ loader ~ comments:", comments);

  return { posts, comments };
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const authToken = localStorage.getItem("authToken");
  const { _action, postId, ...value } = data;

  if (_action === "dislike") {
    await axios.put(
      `http://localhost:5000/api/posts/dislikes`,
      { postId: postId }, // ارسال postId به صورت یک آبجکت
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }
  if (_action === "like") {
    await axios.put(
      `http://localhost:5000/api/posts/likes`,
      { postId: postId }, // ارسال postId به صورت یک آبجکت
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }
  if (request.method === "POST") {
    await axios.post(`http://localhost:5000/api/comments`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
  if (request.method === "DELETE") {
    await axios.delete(
      `http://localhost:5000/api/comments/delete/${data.commentId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }
  return null;
}

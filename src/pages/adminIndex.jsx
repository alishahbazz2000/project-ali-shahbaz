import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
} from "@heroui/react";

import axios from "axios";
import React from "react";
import { Form, Link, useLoaderData } from "react-router";

export const columns = [
  { name: "کاربر", uid: "userId" },
  { name: "وبلاگ", uid: "blog" },
  { name: "کامنت", uid: "comment" },
  { name: "اقدامات", uid: "actions" },
];

export const DeleteIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};
export default function AdminIndexPage() {
  const data = useLoaderData();
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "userId":
        return (
          <User
            avatarProps={{ radius: "lg", src: user?.user?.profilePhoto || user?.user?.url }}
            description={user?.user?.email}
            name={cellValue}
          >
            {user?.user?.email}
          </User>
        );
      case "blog":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user?.post?.title}
            </p>
          </div>
        );
      case "comment":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user?.description}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip color="danger" content="Delete user">
              <Form method="DELETE">
                <input type="hidden" name="commentId" value={user?._id} />
                <Button
                  isIconOnly
                  color="danger"
                  variant="ghost"
                  className="text-lg"
                  type="submit"
                >
                  <DeleteIcon />
                </Button>
              </Form>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="w-full" isFooterBlurred isHoverable>
          <CardHeader className="flex flex-col gap-3 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>

            <div className="flex flex-col">
              <p className="text-md">users</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center justify-center gap-4">
            <p>تعداد کاربران سایت</p>
            <Chip
              className="w-1/2 mx-auto border-primary text-primary *:font-bold"
              size="lg"
              color="primary"
              variant="dot"
            >
              {data.users.length}
            </Chip>
          </CardBody>
          <Divider />
          <CardFooter className="flex items-center justify-center">
            <Link
              isExternal
              showAnchorIcon
              to="/admin/user"
            >
              مشاهده کاربران
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full" isFooterBlurred isHoverable>
          <CardHeader className="flex flex-col gap-3 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>

            <div className="flex flex-col">
              <p className="text-md">Blogs</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center justify-center gap-4">
            <p>تعداد وبلاگ های سایت</p>
            <Chip
              className="w-1/2 mx-auto border-primary text-primary *:font-bold"
              size="lg"
              color="primary"
              variant="dot"
            >
              {data.posts.length}
            </Chip>
          </CardBody>
          <Divider />
          <CardFooter className="flex items-center justify-center">
            <Link
              isExternal
              showAnchorIcon
              to="/admin/post"
            >
              مشاهده بلاگ ها
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full" isFooterBlurred isHoverable>
          <CardHeader className="flex flex-col gap-3 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>

            <div className="flex flex-col">
              <p className="text-md">Events</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center justify-center gap-4">
            <p>تعداد رویدادهای سایت</p>
            <Chip
              className="w-1/2 mx-auto border-primary text-primary *:font-bold"
              size="lg"
              color="primary"
              variant="dot"
            >
              {data.events.length}
            </Chip>
          </CardBody>
          <Divider />
          <CardFooter className="flex items-center justify-center">
            <Link
              isExternal
              showAnchorIcon
              to="/admin/event"
            >
              مشاهده رویدادها
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full ">
        <div className="w-full flex items-center justify-between my-10">
          <h1 className="text-xl">لیست آخرین نظرات</h1>
          <Button size="sm" color="primary" variant="ghost">
            مشاهده همه نظرات
          </Button>
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={data.comments.slice(0,10)}>
            {(item) => (
              <TableRow key={item?._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ====================== */}
      <div className="w-full ">
        <div className="w-full flex items-center justify-between my-10">
          <h1 className="text-xl">گزارش بازخورد های وبلاگ ها</h1>
          <Button
            as={Link}
            to="/admin/post"
            size="sm"
            color="primary"
            variant="ghost"
          >
            مشاهده همه وبلاگ ها
          </Button>
        </div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>عنوان</TableColumn>
            <TableColumn>تعداد بازید</TableColumn>
            <TableColumn>تعداد لایک ها</TableColumn>
            <TableColumn>تعداد دیسلایک ها</TableColumn>
          </TableHeader>
          <TableBody>
            {data?.posts.map((post) => (
              <TableRow key={post?._id}>
                <TableCell>
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: post?.url || post?.image,
                    }}
                    description={post?.user?.email}
                    name={post?.title}
                  >
                    {post?.user?.email}
                  </User>
                </TableCell>
                <TableCell>{post?.numViews}</TableCell>
                <TableCell>{post?.likes.length}</TableCell>
                <TableCell>{post?.disLikes.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export async function loader() {
  const authToken = localStorage.getItem("authToken");

  const resultUsers = await axios.get("http://localhost:5000/api/users", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const users = resultUsers.data;
  const resultPosts = await axios.get("http://localhost:5000/api/posts ", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const posts = resultPosts.data;
  const resultEvents = await axios.get("http://localhost:5000/api/posts", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const events = resultEvents.data;
  const resultComments = await axios.get("http://localhost:5000/api/comments", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const comments = resultComments.data;

  return { users, posts, events, comments };
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const commentId = data.commentId;
  const authToken = localStorage.getItem("authToken");
  await axios.delete(`http://localhost:5000/api/comments/delete/${commentId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return null;
}

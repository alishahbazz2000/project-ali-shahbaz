import {
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
import { Form, useLoaderData } from "react-router";

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
export default function AdminCommentPage() {
  const comments = useLoaderData();
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "userId":
        return (
          <User
            avatarProps={{ radius: "lg", src: user?.user?.profilePhoto || user?.user?.profilePhoto || user?.user?.url }}
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
          <TableBody items={comments}>
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
    </div>
  );
}

export async function loader() {
  const authToken = localStorage.getItem("authToken");

  const comments = await axios.get("http://localhost:5000/api/comments", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return comments.data;
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

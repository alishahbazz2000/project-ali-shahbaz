import { useAuth } from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Card,
  Spacer,
  Textarea,
  Input,
  Chip,
} from "@heroui/react";
import {
  Form,
  Link,
  redirect,
  useFetcher,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

export const columns = [
  { name: "نام دسته بندی", uid: "name" },
  { name: "توضیحات", uid: "description" },
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

export const EditIcon = (props) => {
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
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default function AdminCategoryPage() {
  const categoryItems = useLoaderData();
  const fetcher = useFetcher();
  const { userId } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user: "",
  });
  // ===========================
  useEffect(() => {
    if (userId) {
      setFormData(() => ({
        title: "",
        description: "",
        user: userId,
      }));
    }
    if (id) {
      fetcher.load(`/admin/category/${id}/edit`);
    }
  }, [location.pathname, userId, id]);
  // =======================================
  useEffect(() => {
    if (fetcher.data && id) {
      const data = fetcher.data[0];
      console.log("🚀 ~ useEffect ~ data:", data);

      setFormData({
        title: data?.title,
        description: data?.description,
        user: data?.user?._id,
      });
    }
  }, [fetcher.data, id]);
  // =======================================

  const renderCell = React.useCallback((category, columnKey) => {
    const cellValue = category[columnKey];

    switch (columnKey) {
      case "name":
        return <div>{category.title}</div>;
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {category?.description}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center  justify-center gap-4">
            <Tooltip content="Edit user">
              <Button
                as={Link}
                to={`/admin/category/${category._id}/edit`}
                isIconOnly
                variant="light"
                color="primary"
                className="text-lg"
                size="sm"
              >
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <Form method="DELETE">
                <input type="hidden" name="categoryId" value={category._id} />
                <Button
                  isIconOnly
                  variant="light"
                  color="danger"
                  className="text-lg"
                  size="sm"
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

  // =======================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      fetcher.submit(formData, { method: "PUT" });
    } else {
      fetcher.submit(formData, { method: "POST" });
    }
  };
  // ====================================
  return (
    <div className="w-full min-h-screen grid grid-cols-1 ">
      {/* ========================================= */}
      <div className="flex items-center justify-between">
        <Chip
          variant="dot"
          className="border-none text-xl font-bold"
          color="primary"
          size="lg"
        >
          داشبورد دسته بندی
        </Chip>
        <div className="flex items-center gap-x-4">
          <span className="text-sm">تعداد دسته بندی ها:</span>
          <Chip variant="dot" color="primary" size="lg" className="text-primary border-primary font-bold">
            {categoryItems.length}
          </Chip>
        </div>
      </div>
      {/* ============================================= */}
      <div className="w-full h-full">
        <Card className="w-full h-full p-4">
          <fetcher.Form
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              isClearable
              fullWidth
              label="عنوان دسته بندی"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <Textarea
              fullWidth
              label="توضیحات"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <Button
              fullWidth
              color="primary"
              variant="solid"
              className="uppercase"
              size="lg"
              type="submit"
              disabled={fetcher.state !== "idle"}
            >
              {fetcher.state !== "idle"
                ? "درحال ارسال ..."
                : id
                ? "اپدیت دسته بندی"
                : "ساخت دسته بندی"}
            </Button>
          </fetcher.Form>
        </Card>
      </div>
      {/* ================================================== */}
      <div className="w-full h-full">
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
          <TableBody emptyContent={"No rows to display."} items={categoryItems}>
            {(item) => (
              <TableRow key={item.title}>
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

export async function action({ request, params }) {
  const result = await request.formData();
  const data = Object.fromEntries(result);
  const deleteId = data.categoryId;

  const authToken = localStorage.getItem("authToken");
  try {
    if (request.method === "POST") {
      const response = await axios.post(
        "http://localhost:5000/api/category",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(" category added successfully");
        return redirect("/admin/category");
      }
    } else if (request.method === "PUT") {
      const response = await axios.put(
        `http://localhost:5000/api/category/${params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        toast.info(" category update successfully");
        return redirect("/admin/category");
      }
    } else {
      const response = await axios.delete(
        `http://localhost:5000/api/category/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        toast.info(" category delete successfully");
        return redirect("/admin/category");
      }
    }
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
  }
}

export async function loader() {
  const authToken = localStorage.getItem("authToken");
  const data = await axios.get("http://localhost:5000/api/category", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data.data;
}

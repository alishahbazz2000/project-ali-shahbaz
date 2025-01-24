import { redirect, useFetcher, useLocation, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { Card } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Spacer } from "@heroui/spacer";
import { Button } from "@heroui/button";
import { Editor } from "@tinymce/tinymce-react";
import { DatePicker } from "@heroui/date-picker";
import moment from "moment";
import { getLocalTimeZone, today } from "@internationalized/date";
export default function AdminEventCreatePage() {
  const fetcher = useFetcher();
  const { userId, isTokenExpired, loading } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    date: "",
    cardDescription: "",
    location: "",
    user: "",
  });

  // ============================
  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        user: userId,
      }));
    }
    if (id) {
      fetcher.load(`/admin/event/${id}`);
    }
  }, [location.pathname, userId, id]);

  // ============================
  useEffect(() => {
    if (fetcher.data && id) {
      const data = fetcher.data;

      setFormData({
        ...data,
        user: data?.user?._id,
      });

      // Set the editor content to the description if available
      if (editorRef.current && data.description) {
        editorRef.current.setContent(data?.description);
      }
    }
  }, [fetcher.data, id]);
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Adding editor content to form data
    const editorContent = editorRef.current
      ? editorRef.current.getContent()
      : "";
    const updatedFormData = { ...formData, description: editorContent };

    if (id) {
      fetcher.submit(updatedFormData, { method: "PUT" }).catch((error) => {
        toast.error("Error updating Event: " + error.message);
        console.error(error);
      });
    } else {
      fetcher.submit(updatedFormData, { method: "POST" }).catch((error) => {
        toast.error("Error creating Event:" + error.message);
        console.error(error);
      });
    }
  };

  // ============================
  if (loading) return <h1>hello</h1>;
  if (isTokenExpired) {
    toast.error("Token expired. Please log in.");
    return redirect("/login");
  }

  return (
    <div className="w-full min-h-[70vh]">
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
              label="عنوان رویداد"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Spacer y={3} />
            <Textarea
              fullWidth
              label="توضیحات کارت رویداد"
              name="cardDescription"
              value={formData.cardDescription}
              onChange={handleChange}
            />
            <Spacer y={3} />
            <Input
              isClearable
              fullWidth
              label="آدرس عکس رویداد"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            <Spacer y={3} />
            <Input
              isClearable
              fullWidth
              label="آدرس"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <Spacer y={1} />
            <DatePicker
              label="تاریخ رویداد"
              variant="bordered"
              name="date"
              fullWidth
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              onChange={(value) => {
                const isoDate = moment(value, "YYYYMMDD").toISOString();
                setFormData({ ...formData, date: isoDate });
              }}
            />
            <Spacer y={5} />
            <label className="text-sm">توضیحات</label>
            <Editor
              apiKey="cmmiagsmw1gc3n3a6mmek0r5t6d24cac75l36ferf3kynubo"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="Hello welcome to home"
              init={{
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
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
                ? "در حال ارسال..."
                : id
                ? "آپدیت رویداد"
                : "ساخت رویداد"}
            </Button>
          </fetcher.Form>
        </Card>
      </div>
    </div>
  );
}
export async function action({ request, params }) {
  const result = await request.formData();
  const data = Object.fromEntries(result);
  console.log("🚀 ~ action ~ data:", data)
  const authToken = localStorage.getItem("authToken");
  try {
    if (request.method === "POST") {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(" event added successfully");
        return redirect("/admin/event");
      }
    } else {
      const response = await axios.put(
        `http://localhost:5000/api/events/update/${params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        toast.success(" event update successfully");
        return redirect("/admin/event");
      }
    }
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
  }
}

export async function loader() {
  const authToken = localStorage.getItem("authToken");
  return null;
}

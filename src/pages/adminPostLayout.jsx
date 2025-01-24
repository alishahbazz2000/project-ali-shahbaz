import { Button } from "@heroui/button";
import { Link, Outlet } from "react-router";

export default function AdminPostLayout() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">داشبورد وبلاگ ها</h1>
        <div className="flex items-center gap-4">
          <Button
            as={Link}
            to="/admin/post/create"
            color="primary"
            variant="flat"
          >
            وبلاگ جدید
          </Button>
          <Button
            as={Link}
            to="/post"
            color="primary"
            variant="faded"
          >
            نمایش صفحه وبلاگ ها
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

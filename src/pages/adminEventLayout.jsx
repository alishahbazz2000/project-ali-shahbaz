import { Button } from "@heroui/button";
import { Link, Outlet } from "react-router";

export default function AdminEventLayout() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">داشبورد رویداد ها</h1>
        <div className="flex items-center gap-4">
          <Button
            as={Link}
            to="/admin/event/create"
            color="warning"
            variant="flat"
          >
            رویداد جدید
          </Button>
          <Button as={Link} to="/event" color="warning" variant="faded" className="border-warning">
            نمایش صفحه رویداد ها
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

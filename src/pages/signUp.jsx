import { Input, Button } from "@heroui/react";
import axios from "axios";
import { Form, Link, redirect, useNavigation } from "react-router";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const navigation = useNavigation();
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4"
      dir="ltr"
    >
      <div className="w-full max-w-xl bg-white text-black rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          به سایت پیکچین خوش آمدید
        </h2>
        <p className="text-gray-600 text-center mb-6">
          امروز به ما بپیوندید! این سریع و آسان است.{" "}
        </p>
        <Form method="POST" className="space-y-6">
          {/* Username Field */}
          <div>
            <Input
              type="text"
              name="firstName"
              label="firstName"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="firstName is required"
            />
          </div>
          <div>
            <Input
              type="text"
              name="lastName"
              label="lastName"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="lastName is required"
            />
          </div>
          {/* Email Field */}
          <div>
            <Input
              type="email"
              name="email"
              label="Email Address"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="Enter a valid email address"
            />
          </div>
          {/* Password Field */}
          <div>
            <Input
              type="password"
              name="password"
              label="Password"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="Password must be at least 6 characters"
            />
          </div>
          <Button
            fullWidth
            color="secondary"
            variant="solid"
            size="lg"
            type="submit"
          >
            {navigation.state !== "idle" ? "در حال ارسال ..." : "ثبت نام"}
          </Button>
        </Form>
        <p className="text-sm text-center text-gray-600 mt-6">
          از قبل حساب کاربری دارید؟
          <Link
            to="/auth/login"
            className="text-secondary font-semibold hover:underline mx-2"
          >
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/register",
      data
    );
    console.log("🚀 ~ handleSubmit ~ response:", response.data);
    toast.success("user Registered successfully");
    return redirect("/auth/login");
  } catch (error) {
    console.log("🚀 ~ handleSubmit ~ error:", error);
    throw new Response(`signup action: ${error}`, { status: 404 });
  }
}

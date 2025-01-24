import { Input, Button } from "@heroui/react";
import axios from "axios";
import { Form, redirect, useNavigation } from "react-router";
import { toast } from "react-toastify";

export default function ForgetPasswordChange() {
  const navigation = useNavigation();
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4"
      dir="ltr"
    >
      <div className="w-full max-w-xl bg-white text-black rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          change your password
        </h2>

        <Form method="POST" className="space-y-6">
          {/* Username Field */}

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
            {navigation.state !== "idle" ? "درحال ارسال..." : "تغییر رمز عبور"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request, params }) {
  const data = Object.fromEntries(await request.formData());
  try {
    const response = await axios.put(
      "http://localhost:5000/api/users/reset-password",
      { password: data.password, token: params.id }
    );
    console.log("🚀 ~ handleSubmit ~ response:", response.data);
    toast.success("user Registered successfully");
    return redirect("/");
  } catch (error) {
    console.log("🚀 ~ handleSubmit ~ error:", error);
    throw new Response(`signup action: ${error}`, { status: 404 });
  }
}

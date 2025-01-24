import { Input, Button } from "@heroui/react";
import axios from "axios";
import { useEffect } from "react";
import {
  Form,
  Link,
  redirect,
  useLocation,
  useNavigation,
  useSubmit,
} from "react-router";
import { toast } from "react-toastify";

export default function ForgetPassWord() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      submit(null, { method: "POST" });
    }, 100000);
    return () => clearTimeout(timer);
  }, [submit, location]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4"
      dir="ltr"
    >
      <div className="w-full max-w-xl bg-white text-black rounded-lg shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forget Passwrod
        </h2>
        <p className="text-center mb-6">
          Please Forget Passwrod to your account to continue.
        </p>
        <Form method="POST" className="space-y-6">
          <div>
            <Input
              type="email"
              name="email"
              label="Email Address"
              variant="bordered"
              color="primary"
              fullWidth
              isRequired
              errorMessage="Enter a valid email address"
            />
          </div>

          <Button
            fullWidth
            color="primary"
            variant="solid"
            size="lg"
            type="submit"
          >
            {navigation.state !== "idle" ? "submitting..." : "Login"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const response = await axios.post(
    "http://localhost:5000/api/users/forget-password-token",
    data
  );
  console.log("🚀 ~ action ~ response:", response);
  if (response.status === 200) {
    return redirect("/auth/login");
  }
}

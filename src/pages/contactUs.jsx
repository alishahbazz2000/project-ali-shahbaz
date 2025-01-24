import { redirect, useLoaderData } from "react-router";
import CantactCard from "../components/contactCard";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const benefits = [
  "ساعت‌های کاری منعطف",
  "سفرهای تیمی سالانه",
  "حقوق رقابتی",
  "30 روز مرخصی سالانه",
  "مزایای ویژه برای شما و خانواده‌تان",
  "محیط کاری عالی",
];

export default function ContactUsPage() {
  const data = useLoaderData();
  return (
    <div className="">
      <main className="relative isolate">
        {/* Background */}
        <div
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
        {/* Header section */}
        <div className="">
          <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              ما به خالقان باور داریم
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-900">
              ما به قدرت خلاقیت و نوآوری ایمان داریم و در تلاشیم تا محیطی فراهم
              کنیم که در آن ایده‌های بزرگ شکل بگیرند و به دنیای بهتر و متفاوتی
              منتهی شوند. ما اینجا هستیم تا از هنرمندان، نوآوران و کارآفرینان
              حمایت کنیم و آنها را در مسیر موفقیت همراهی نماییم. اینجا جایی است
              که ذهن‌های خلاق می‌توانند با یکدیگر در تماس باشند و تأثیرات
              ماندگاری بر جامعه بگذارند.
            </p>
          </div>
        </div>
        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
            alt=""
            className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Team section */}
        <div className="mx-auto mt-10 max-w-7xl px-6 sm:mt-20 lg:px-8 space-y-10">
          <div className="w-full">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              تیم ما
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-900">
              تیم ما متشکل از افرادی با مهارت‌ها، تجربیات و علایق متنوع است که
              هرکدام از آنها به‌طور فردی در ایجاد تغییرات مثبت و پایدار سهم
              بزرگی دارند. ما یک تیم هم‌افزا هستیم که در آن هر فرد می‌تواند
              ایده‌های جدید را مطرح کرده و آنها را به واقعیت تبدیل کند. در
              اینجا، همکاری، احترام متقابل و نوآوری در اولویت قرار دارد.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full place-items-center">
            {data.map((items) => (
              <CantactCard key={items.id} cardDetails={items} />
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="relative isolate -z-10 mt-10 sm:mt-20">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <img
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
                alt=""
              />
              <div className="w-full flex-auto">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  به تیم ما بپیوندید
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-800">
                  اگر به دنبال محیطی الهام‌بخش، تیمی پویا، و فرصتی برای رشد
                  حرفه‌ای خود هستید، جای شما در کنار ما خالی است. ما در تلاشیم
                  تا بهترین‌ها را برای همکارانمان فراهم کنیم.
                </p>
                <ul
                  role="list"
                  className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-gray-900 sm:grid-cols-2"
                >
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-x-3">
                      <CheckCircleIcon
                        className="h-7 w-5 flex-none"
                        aria-hidden="true"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-indigo-400"
                  >
                    فرصت‌های شغلی ما را مشاهده کنید{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export async function loader() {
  const authToken = localStorage.getItem("authToken");

  const response = await axios.get("http://localhost:5000/api/users", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const authToken = localStorage.getItem("authToken");
  const { _action, followId, loginId, ...value } = data;
  console.log("🚀 ~ action ~ loginId:", loginId)
  console.log("🚀 ~ action ~ followId:", followId)
  console.log("🚀 ~ action ~ _action:", _action)
  if (_action === "follow") {
    await axios.put(
      `http://localhost:5000/api/users/follow`,
      { followId: followId, loginUserId: loginId },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  } else {
    await axios.put(
      `http://localhost:5000/api/users/unfollow`,
      { followId: followId, loginUserId: loginId },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }

  return redirect("/contactus");
}

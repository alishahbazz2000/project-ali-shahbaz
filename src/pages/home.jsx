import {
  ChevronLeftIcon,
  BellAlertIcon,
  ClockIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/20/solid";
import heroImage from "../assets/hero-source.svg";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Form, Link, redirect, useLoaderData, useNavigate } from "react-router";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const secondaryFeatures = [
  {
    name: "زمان‌بندی هوشمند",
    description:
      "مدیریت تاریخ و زمان انتشار مطالب و رویدادها با سیستم زمان‌بندی پیشرفته. محتواهای خود را دقیق و به موقع منتشر کنید.",
    href: "#",
    icon: ClockIcon,
  },
  {
    name: "اطلاع‌رسانی سریع و موثر",
    description:
      "با ارسال نوتیفیکیشن و ایمیل، مخاطبان خود را از آخرین مقالات و رویدادها مطلع کنید. بهترین راه برای حفظ تعامل با کاربران.",
    href: "#",
    icon: BellAlertIcon,
  },
  {
    name: " طراحی آسان صفحات وبلاگ",
    description:
      "بدون نیاز به دانش کدنویسی، صفحات وبلاگ خود را به راحتی طراحی کنید.",
    href: "#",
    icon: PresentationChartBarIcon,
  },
];

export default function HomePage() {
  const { comments, posts, events } = useLoaderData();
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data only when `id` changes
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        toast.error(`${error.message}: id=${userId} not Found`);
        navigate("/");
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="relative bg-background">
      {user === null ? null : !user.isAccountVerified ? (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-5 z-50 w-1/2
          "
        >
          <Alert
            color="warning"
            description="Upgrade to a paid plan to continue"
            endContent={
              <Form method="POST">
                <input type="hidden" name="id" value={userId} />
                <Button color="warning" size="sm" variant="flat" type="submit">
                  کلیک کنید
                </Button>
              </Form>
            }
            title="ایمیل خود را تایید کنید"
            variant="faded"
          />
        </div>
      ) : null}
      <main>
        {/* Hero section */}
        <div className="relative isolate">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
            />
          </svg>
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <div className="flex">
                <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="font-semibold text-indigo-600">پیکچین</span>
                  <span
                    className="h-4 w-px bg-gray-900/10"
                    aria-hidden="true"
                  />
                  <a href="#" className="flex items-center gap-x-3">
                    <span className="absolute inset-0" aria-hidden="true" />
                    خیلی خوش آمدید
                    <ChevronLeftIcon
                      className="-mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
              <h1 className="mt-10 max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                بهترین ایده‌ها، بهترین نوشته‌ها
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
               پیکچین پلتفرمی برای کاوش، یادگیری و به اشتراک‌گذاری دانش. از تکنولوژی
                تا هنر، از ایده‌های نوآورانه تا تجربه‌های عمیق، جایی که صداهای
                متفاوت به گوش می‌رسند و کلمات تأثیرگذار باقی می‌مانند.
              </p>
              <div className="mt-10 flex items-center gap-x-6 w-2/3 ">
                <Button
                  as={Link}
                  to="/post"
                  color="secondary"
                  fullWidth
                  variant="flat"
                >
                  پست ها
                </Button>
                <Button
                  as={Link}
                  to="/event"
                  color="primary"
                  fullWidth
                  variant="flat"
                >
                  رویدادها
                </Button>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow ">
              <img src={heroImage} alt="" className="object-cover" />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="relative mx-auto mt-16 max-w-7xl min-h-full ">
          <div className="w-full h-full flex items-center justify-between mb-8">
            <h6 className="text-lg font-semibold flex items-center gap-2 border-b">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
                />
              </svg>
              <span>جدید ترین وبلاگ ها</span>
            </h6>
            <Button as={Link} to="/post" variant="bordered">
              بیشتر
            </Button>
          </div>
          <Swiper
            slidesPerView={3}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 30,
              slideShadows: false,
            }}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 1000 }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper w-full h-full"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className="w-full h-full">
                <Card
                  as={Link}
                  to={`/post/${post.id}`}
                  key={post._id}
                  className="flex flex-col items-start justify-between p-3"
                  isHoverable
                  isBlurred
                  isPressable
                >
                  <div className="relative w-full">
                    <img
                      src={post?.url}
                      alt=""
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="">
                    <div className="mt-8 flex items-center justify-between text-sm">
                      <a
                        href={post?.category}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post?.category}
                      </a>
                      <time
                        dateTime={post?.createdAt}
                        className="text-gray-500"
                      >
                        {moment(post?.createdAt).format("MMM Do YY")}
                      </time>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post?.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post?.cardDescription}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        src={post?.user?.profilePhoto || post?.user?.url}
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-100"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={post?.user?.firstName}>
                            <span className="absolute inset-0" />
                            {`${post?.user?.firstName} ${post?.user?.lastName}`}
                          </a>
                        </p>
                        <p className="text-gray-600">{post?.user?.email}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Feature section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 lg:px-8 ">
          <div className="mx-auto max-w-4xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              قابلیت ها ما
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              هر آنچه برای مدیریت وبلاگ و رویدادها نیاز دارید
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              با ابزارهای پیشرفته، وبلاگ و رویدادهای خود را حرفه‌ای مدیریت کنید.
              از طراحی محتوا تا اطلاع‌رسانی، همه چیز در دسترس شماست.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {secondaryFeatures.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <a
                        href={feature.href}
                        className="text-sm flex items-center gap-2 font-semibold leading-6 text-primary"
                      >
                        <span>بیشتر بدانید</span>
                        <ArrowLeftIcon className="w-3 h-3 object-cover font-bold" />
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        {/*  */}
        <div className="relative mx-auto my-16 max-w-7xl min-h-full  p-10">
          <div className="w-full h-full flex items-center justify-between mb-8">
            <h6 className="text-lg font-semibold flex items-center gap-2 border-b">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
                />
              </svg>
              <span>جدید ترین رویداد ها</span>
            </h6>
            <Button as={Link} to="/event" variant="bordered">
              بیشتر
            </Button>
          </div>
          <Swiper
            slidesPerView={3}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 30,
              slideShadows: false,
            }}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 1000 }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper w-full h-full"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id} className="w-full h-full">
                <Card
                  as={Link}
                  to={`/event/${event?._id}`}
                  isFooterBlurred
                  className="w-full h-[300px]"
                  key={event?._d}
                >
                  <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      {moment(event?.date).format("MMM Do YY")}
                    </p>
                    <h4 className="text-white/90 font-medium text-xl">
                      {event?.title}
                    </h4>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover"
                    src={event?.image}
                  />
                  <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                      <Image
                        alt="Breathing app icon"
                        className="rounded-full w-10 h-11 bg-black"
                        src={event?.user?.profilePhoto || event?.user?.url}
                      />
                      <div className="flex flex-col">
                        <p className="text-tiny text-white/60">
                          {`${event?.user?.firstName} ${event?.user?.lastName}`}
                        </p>
                        <p className="text-tiny text-white/60">
                          {event?.user?.email}
                        </p>
                      </div>
                    </div>
                    <Button radius="full" size="sm">
                      بیشتر
                    </Button>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Testimonials section */}
        <div className="relative isolate mt-24 sm:mt-20 sm:pt-20">
          <svg
            className="absolute inset-0 -z-10 hidden h-full w-full stroke-slate-300 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] sm:block"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="55d3d46d-692e-45f2-becd-d8bdc9344f45"
                width={200}
                height={200}
                x="50%"
                y={0}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={0} className="overflow-visible fill-gray-50">
              <path
                d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#55d3d46d-692e-45f2-becd-d8bdc9344f45)"
            />
          </svg>
          <div className="relative">
            <div
              className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
              aria-hidden="true"
            >
              <div
                className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff006a] to-[#6c62f1]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div
              className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-8 opacity-25 blur-3xl xl:justify-end"
              aria-hidden="true"
            >
              <div
                className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#945fff] to-[#8c5eff] xl:ml-0 xl:mr-[calc(50%-12rem)]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full">
              <div className="mx-auto max-w-xl sm:text-center">
                <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  نظرات سایت
                </h2>
                <p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  هر آنچه برای استقرار برنامه خود نیاز دارید
                </p>
              </div>
              <div className=" w-full flex items-center justify-between mt-20">
                <Swiper
                  slidesPerView={3}
                  effect={"coverflow"}
                  coverflowEffect={{
                    rotate: 30,
                    slideShadows: false,
                  }}
                  spaceBetween={10}
                  loop={true}
                  autoplay={{ delay: 1000 }}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    480: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    992: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {comments.map((comment) => (
                    <SwiperSlide key={comment._id} className="h-[200px]">
                      <Card className="w-full h-full">
                        <CardHeader className="justify-between">
                          <div className="flex gap-5">
                            <Avatar
                              color="primary"
                              isBordered
                              radius="full"
                              size="lg"
                              src={
                                comment?.user?.profilePhoto ||
                                comment?.user?.url
                              }
                            />
                            <div className="flex flex-col gap-1 items-start justify-center">
                              <h4 className="text-small font-semibold leading-none text-default-600">
                                {`${comment?.user?.firstName} ${comment?.user?.lastName}`}
                              </h4>
                              <h5 className="text-small tracking-tight text-default-400">
                                {comment?.user?.email}
                              </h5>
                            </div>
                          </div>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-small text-default-400 text-start">
                          <p>{comment?.description}</p>
                        </CardBody>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32 space-y-10">
            <h2 className="mx-auto max-w-3xl text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              به ما بپیوندید و از اولین‌ها باشید!
            </h2>
            <p className="mx-auto mt-2 max-w-4xl text-center text-lg leading-8 text-gray-300">
              با عضویت در خبرنامه، جدیدترین مطالب، اخبار و پیشنهادهای ویژه را
              مستقیماً در صندوق ایمیل خود دریافت کنید.
            </p>
            <form className="mx-auto mt-10 flex flex-col md:flex-row gap-y-4 max-w-xl gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-10"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                به من اطلاع بده
              </button>
            </form>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function loader() {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    const resultPosts = await axios.get("http://localhost:5000/api/posts ", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const posts = resultPosts.data;
  const resultEvents = await axios.get("http://localhost:5000/api/events", {
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

  return { posts, events, comments };
  }
  else {
    return redirect("/auth/login")
  }
}

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  console.log("action");
  const authToken = localStorage.getItem("authToken");
  await axios.post(
    "http://localhost:5000/api/users/generate-verify-email-token",
    { token: authToken , id:data.id },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}

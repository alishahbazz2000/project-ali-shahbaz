import { Avatar, Button } from "@heroui/react";
import axios from "axios";
import moment from "moment";
import { useLoaderData } from "react-router";
import DOMPurify from "dompurify";
export default function EventDetailsPage() {
  const events = useLoaderData();
  const sanitizedHTML = DOMPurify.sanitize(events?.description);
  return (
    <>
      <main className="pt-12 pb-20 lg:pt-20 lg:pb-28 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between  max-w-7xl mx-auto">
          <article className="w-2/3 mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-6 lg:mb-8 not-format ">
              <div className="flex flex-col md:flex-row gap-y-4 items-center mb-8 not-italic w-full justify-between">
                <div className="inline-flex items-center gap-4 mr-4 text-sm text-gray-900 dark:text-white">
                  <Avatar
                    className=" rounded-full"
                    src={events?.user?.profilePhoto || events?.user?.url}
                    alt={events?.user?.email}
                    isBordered
                    color="primary"
                    size="lg"
                  />
                  <div className="flex flex-col gap-0.5">
                    <a
                      href="#"
                      rel="author"
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                      {`${events?.user?.firstName} - ${events?.user?.lastName}`}
                    </a>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                      {events?.user?.email}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      <time title="February 8th, 2022">
                        {moment(events?.updatedAt).format("MMM Do YY")}
                      </time>
                    </p>
                  </div>
                </div>
                <div className="flex items-end flex-col gap-4">
                  <div className="flex items-center gap-2 ">
                    <span>{moment(events?.date).format("MMMM Do YYYY")}</span>
                    <Button isIconOnly color="primary" variant="light">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <span>{events?.location}</span>
                    <Button isIconOnly color="primary" variant="light">
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
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </header>
            <h1 className="my-12 text-4xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white">
              {events?.title}
            </h1>
            <figure className="mb-8 h-[500px]">
              <img
                src={events?.image}
                alt=""
                className="rounded-xl shadow-lg w-full h-full object-cover"
              />
            </figure>

            <section className="mb-8">
              <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
export async function loader({ params }) {
  const authToken = localStorage.getItem("authToken");

  const event = await axios.get(
    `http://localhost:5000/api/events/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return event.data;
}

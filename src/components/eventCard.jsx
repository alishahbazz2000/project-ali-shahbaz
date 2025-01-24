import { Card, CardHeader, CardFooter, Button, Image } from "@heroui/react";
import moment from "moment";
import { Link } from "react-router";

export default function EventCard({ events }) {
  return (
    <div className="w-full h-full gap-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-2 p-8">
      {events.map((event) => (
        <Card
          as={Link}
          to={`${event?._id}`}
          isFooterBlurred
          className="w-full h-[400px]"
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
                <p className="text-tiny text-white/60">{event?.user?.email}</p>
              </div>
            </div>
            <Button radius="full" size="sm">
              بیشتر
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

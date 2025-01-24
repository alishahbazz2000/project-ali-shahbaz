import { useLoaderData } from "react-router";
import CTAComponent from "../components/CTA";
import EventCard from "../components/eventCard";
import  axios  from "axios";

export default function EventPage() {
  const events = useLoaderData()
  console.log("🚀 ~ EventPage ~ events:", events)
  return (
    <div>
      <CTAComponent />
      <EventCard events={events} />
    </div>
  );
}

export async function loader() {
  const authToken = localStorage.getItem("authToken");

  const event = await axios.get("http://localhost:5000/api/events", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return event.data;
}

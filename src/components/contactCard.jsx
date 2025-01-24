import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Chip,
  Button,
} from "@heroui/react";
import moment from "moment/moment";
import PropTypes from "prop-types";
import { Form, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CantactCard({ cardDetails }) {
  const { userId } = useAuth();
  const [users, setUsers] = useState();
  useEffect(() => {
    (async () => {
      const authToken = localStorage.getItem("authToken");

      await axios
        .get(`http://localhost:5000/api/users/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => setUsers(res.data));
    })();
  }, [userId]);
  return (
    <>
      {userId !== cardDetails._id && (
        <Card
          as={Link}
          to={`/profile/user/${cardDetails?._id}`}
          className="py-4 h-[400px] w-full"
          isHoverable
          isPressable
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{cardDetails.email}</p>
            <small className="text-default-500">
              {moment(cardDetails.createdAt).format("MMMM Do YYYY")}
            </small>
            <h4 className="font-bold text-large">{cardDetails.userName}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2  w-full h-full">
            <Image
              alt="Card background"
              className="w-full object-cover rounded-xl"
              src={`${cardDetails.url || cardDetails.profilePhoto}`}
              width={270}
            />
          </CardBody>
          <CardFooter className="flex items-center justify-between">
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
            >
              {cardDetails.isAdmin ? "Admin" : "User"}
            </Chip>
            <Form action="/contactus" method="PUT">
              <input type="hidden" name="followId" value={cardDetails._id} />
              <input type="hidden" name="loginId" value={userId} />
              {users?.following?.includes(cardDetails._id) ? (
                <Button
                  type="submit"
                  color="danger"
                  name="_action"
                  value="unfollow"
                  variant="shadow"
                  className="border-2"
                >
                  UnFollow
                </Button>
              ) : (
                <Button
                  type="submit"
                  color="primary"
                  name="_action"
                  value="follow"
                  variant="shadow"
                  className="border-2"
                >
                  Follow
                </Button>
              )}
            </Form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

CantactCard.propTypes = {
  cardDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string.isRequired,
    url: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
};

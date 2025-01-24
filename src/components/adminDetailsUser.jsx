import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Tooltip,
  Image,
} from "@heroui/react";
import moment from "moment/moment";

export default function AdminDetailsUserDrawer({ isOpen, onOpenChange, id }) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user data only when `id` changes
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        toast.error(`${error.message}: id=${id} not Found`);
        navigate("/admin/user");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Memoize user data to prevent unnecessary calculations
  const userData = useMemo(() => {
    if (!user) return null;

    return {
      fullName: `${user.firstName} ${user.lastName}`,
      profilePhoto: user.url || user.profilePhoto,
      email: user.email,
      bio: user.bio,
      createAt: user.createdAt,
      id: user?._id,
    };
  }, [user]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Drawer
      hideCloseButton
      backdrop="blur"
      classNames={{
        base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
              <Tooltip content="Close">
                <Button
                  isIconOnly
                  className="text-default-400"
                  size="sm"
                  variant="light"
                  onPress={onClose}
                >
                  <svg
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                  </svg>
                </Button>
              </Tooltip>
            </DrawerHeader>
            <DrawerBody className="pt-16">
              <div className="flex w-full justify-center items-center pt-4">
                <Image
                  isBlurred
                  isZoomed
                  alt="Event image"
                  className="aspect-square w-full hover:scale-110"
                  height={300}
                  src={userData?.profilePhoto}
                />
              </div>
              <div className="flex flex-col gap-2 py-4">
                <h1 className="text-2xl font-bold leading-7">
                  {userData.fullName}
                </h1>
                <p className="text-sm text-default-500">{userData?.email}</p>
                <p className="text-sm text-default-500">{userData?.bio}</p>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-medium text-foreground font-medium">
                        {moment(userData?.createAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-4 gap-3 items-start">
                    <span className="text-small text-default-500">
                      {userData.id}
                    </span>
                  </div>
                </div>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

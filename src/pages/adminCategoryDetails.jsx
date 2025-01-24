import axios from "axios";

export default function AdminCategoryDetials() {
  return null;
}

export async function loader({ params }) {
  const authToken = localStorage.getItem("authToken");
  const response = await axios.get(
    `http://localhost:5000/api/category/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
}

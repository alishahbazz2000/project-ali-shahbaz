import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";



export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    setLoading(true);
    const checkAuth = async () => {
      const token =
        sessionStorage.getItem("authToken") ||
        localStorage.getItem("authToken");
      setAuthentication(token)
      if (token) {
        try {
          // تجزیه توکن
          const decodedToken = await jwtDecode(token);
          // زمان فعلی برحسب ثانیه
          const currentTimeStamp = Math.floor(Date.now() / 1000);

          // استخراح تاریخ انقضای توکن
          const expireTimeStamp = decodedToken.exp;
          if (expireTimeStamp < currentTimeStamp) {
            setIsTokenExpired(true);
          } else {
            setUserId(decodedToken.id);
          }
        } catch (error) {
          console.log(`Error Decoding token: ${error}`);
          sessionStorage.removeItem("authToken");
          localStorage.removeItem("authToken");
        }
      } else {
        console.log("no found token");
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  return {
    userId,
    authentication,
    isTokenExpired,
    loading,
  };
};
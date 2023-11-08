import { useEffect, useState } from "react";

export function useUserRole() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Make an API request to fetch the user's role from your server
    fetch("/api/userRole")
      .then((response) => {
        if (response.ok) {
            console.log("Response from the server:", response); 
          return response.json();
        } else {
          throw new Error("Failed to fetch user role");
        }
      })
      .then((data) => {
        setUserRole(data.role); // Set the user's role
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return userRole;
}
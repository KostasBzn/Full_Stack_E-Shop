import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmailConfirm() {
  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const response = await axios.post(
          import.meta.env.VITE_BASE_URL + `/users/emailconfirm/${token}`
        );
        //console.log("🚀 ~ response:", response);

        if (response.data.success) navigate("/confirmeduser");
      };

      fetchData();
    }
  }, []);

  return <div>You account is comfirmed successfully!!</div>;
}

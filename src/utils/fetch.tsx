import axios from "axios";

export async function postData(url: any, payload: any, formData?: any) {
  try {
    interface Auth {
      token: string;
    }

    const auth = localStorage.getItem("auth");
    const token: string | undefined = auth ? (JSON.parse(auth) as Auth).token : undefined;
    return await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
}

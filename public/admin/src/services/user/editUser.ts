import { VITE_SERVER_URL } from "../../env/env.prod";
import { Result } from "../../shared/Result";

type EditUserBody = {
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
  ci?: string;
};

export const editUser = async (
  token: string,
  user: EditUserBody,
): Promise<Result<void>> => {
  const url = `${VITE_SERVER_URL}/api/v1/users/${user.userId}`;

  const requestOptions: RequestInit = {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    const body = await response.json();

    if (response.status !== 200) {
      return Result.fail(body.message);
    }

    return Result.ok();
  } catch (e) {
    return Result.fail("Ha ocurrido un error");
  }
};

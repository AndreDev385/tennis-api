import { VITE_SERVER_URL } from '../env/env.prod';

export async function requestClubSubscription(clubId: string, token: string) {
  try {
    const response = await fetch(`${VITE_SERVER_URL}/api/v1/club/subscribe/${clubId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', authorization: token },
    });

    if (!response.ok) {
      throw new Error('Error intentando suscribir el club');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

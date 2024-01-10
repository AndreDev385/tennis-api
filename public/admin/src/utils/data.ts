import { VITE_SERVER_URL } from '../env/env.prod';

const token: string = localStorage.getItem('authorization') || '';

export async function requestClubSubscription(clubId: string) {
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
    throw new Error(error);
  }
}

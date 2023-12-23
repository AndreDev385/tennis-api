import { VITE_SERVER_URL } from '../env/env.prod';

export async function suscribeClub(clubId: string) {
  try {
    const response = await fetch(`${VITE_SERVER_URL}/club/suscribe/${clubId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al intentar suscribir el club');
  }
}

import React from 'react'

const Stats = () => {
  const token: string = localStorage.getItem('authorization') || '';

  const getTeams = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/team/stats/teamId=7d9a3269-47e1-4a87-bb9c-b227c2be334a`
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token
      }
    };

    try{
      const response = await fetch(url, requestOptions)
      
      const data = await response.json()

      if (response.status === 200){
        console.log(data)
        // setTeams(data)
        // setFilteredTeams(data)
      } 
    } catch (error) {
    }
  }

  getTeams();
  return (
    <div>Stats</div>
  )
}

export default Stats
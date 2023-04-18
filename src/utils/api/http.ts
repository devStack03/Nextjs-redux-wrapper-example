export const getUserSettings = async (data) => {
  const res = await fetch(
    '/api/getSettings',
    { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }
  )

  return res.json();
}
export const updateUserSettings = async (data) => {
  const res = await fetch(
    '/api/updateSettings',
    { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }
  )

  return res.json();
}

export const getLogs = async (data) => {
  const res = await fetch(
    '/api/logs',
    { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }
  )

  return res.json();
}
const API_URL = 'https://api.uberchord.com/v1'

export async function GetChord({chord}) {
    const response = await fetch(`${API_URL}/chords?nameLike=${chord}`)
    return response.json();
}
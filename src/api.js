export const API_END_POINT = "https://kdt.roto.codes";

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'x-username': 'young-d'
            }
        })

        if (res.ok) {
            return res.json();
        }

        throw new Error('API 처리 중 뭔가 이상해요!');
    } catch(e) {
        alert(e.message);
    }
}

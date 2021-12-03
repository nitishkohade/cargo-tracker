export const config = (() => {
    if(process.env.NODE_ENV === 'test') {
        return {
            SERVICE_URL: ""
        }
    }

    return {
        SERVICE_URL: "http://localhost:3000/api"
    }
    
})()

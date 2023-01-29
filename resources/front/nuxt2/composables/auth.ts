export const useAuth = async () => {
    await useApi("user", {method: "POST"})
    console.log('useAuth');
}


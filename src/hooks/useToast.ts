import useToastStore from "@/store/toastStore.ts";

export const useToast = () => {
    const showToast = useToastStore((state) => state.addToast)

    return {showToast}
}
import {useRouter} from "next/router";
import NProgress from "nprogress";
import {useEffect} from "react";

export const useLoader = () => {
    const router = useRouter()



    useEffect(() => {
        const startLoading = () => NProgress.start()
        const endLoading = () => NProgress.done()

        //у роута етсь свои евенты, как у кериселектора
        router.events.on('routeChangeStart', startLoading)
        router.events.on('routeChangeComplete', endLoading)
        router.events.on('routeChangeError', endLoading)

        return () => {
            //тут то же самое что removeEventListener
            router.events.off('routeChangeStart', startLoading)
            router.events.off('routeChangeComplete', endLoading)
            router.events.off('routeChangeError', endLoading)
        }
    }, [router]);
}
import { useEffect, useState } from "react";


export function useTelegramWebApp() {
    const [tg, setTg] = useState(null);
    const [user, setUser] = useState(null);
    const [initData, setInitData] = useState("");


    useEffect(() => {
        if (window.Telegram?.WebApp) {
        const w = window.Telegram.WebApp;
        w.ready();
        setTg(w);
        setUser(w.initDataUnsafe?.user || null);
        setInitData(w.initData || "");
        // Optional theme hint
        w.expand();
        }
    }, []);


return { tg, user, initData };
}
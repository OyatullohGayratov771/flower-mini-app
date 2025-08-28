// src/telegram/init.js
export function getInitData() {
  const tg = window?.Telegram?.WebApp
  return tg?.initData || "" // backend middleware tekshiradi
}

export function ready() {
  const tg = window?.Telegram?.WebApp
  tg?.ready?.()
}

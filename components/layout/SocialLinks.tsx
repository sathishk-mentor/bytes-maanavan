export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/maanavanlearncode/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/showcase/maanavan' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCZN9jOlj8Dm1nYidAGJuA-w/featured' },
  { label: 'Instagram', href: 'https://www.instagram.com/maanavan_learn_code/' },
  { label: 'X', href: 'https://x.com/maanavan_code' },
  { label: 'Telegram', href: 'https://t.me/Maanavansoftwarecourse' },
] as const;

export function SocialIcon({label}:{label:(typeof socialLinks)[number]['label']}) {
  if(label==='Facebook') return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.2 8.2V6.5c0-.8.5-1 1-1h2.6V2.1L14.7 2C11.6 2 10 3.9 10 6.1v2.1H7v3.9h3V22h4.2v-9.9h3.2l.6-3.9h-3.8Z"/></svg>;
  if(label==='LinkedIn') return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5.3 3.5A2.3 2.3 0 1 1 5.3 8a2.3 2.3 0 0 1 0-4.5ZM3.4 9.4h3.8v11.2H3.4V9.4Zm6.1 0h3.6v1.5h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8v5.8h-3.8v-5.1c0-1.2 0-2.8-1.8-2.8s-2 1.3-2 2.7v5.2H9.5V9.4Z"/></svg>;
  if(label==='YouTube') return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M22 12s0-3.3-.4-4.9a2.6 2.6 0 0 0-1.8-1.8C18.2 4.9 12 4.9 12 4.9s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.9a2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15.3 22 12 22 12Zm-12 3.1V8.9l5.4 3.1-5.4 3.1Z"/></svg>;
  if(label==='Instagram') return <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M7 2.8h10A4.2 4.2 0 0 1 21.2 7v10a4.2 4.2 0 0 1-4.2 4.2H7A4.2 4.2 0 0 1 2.8 17V7A4.2 4.2 0 0 1 7 2.8Z"/><circle fill="none" stroke="currentColor" strokeWidth="2" cx="12" cy="12" r="4"/><circle cx="17.6" cy="6.4" r="1.2"/></svg>;
  if(label==='Telegram') return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m21.6 3.1-3.3 17c-.2 1.2-.9 1.5-1.9.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L5.7 13.6.8 12.1c-1.1-.3-1.1-1.1.2-1.6L20 3.2c.9-.3 1.7.2 1.6-.1Z"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 3h4.8l4.4 6.3L18.7 3H21l-6.7 7.9L22 21h-4.8l-4.8-6.8L6.5 21H4.1l7.2-8.4L4 3Zm3.5 2 10.8 14h1.2L8.7 5H7.5Z"/></svg>;
}

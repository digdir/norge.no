import styles from './style.module.css';

const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export function ChatPopup() {
  return (
    <a
      href="/chat"
      className={styles.chatPopup}
      aria-label="Start en samtale"
    >
      <div className={styles.iconContainer}>
        <ChatIcon />
      </div>
    </a>
  );
}
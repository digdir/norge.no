import * as DesignSystem from '@digdir/designsystemet-react';
import {Avatar, Paragraph} from '@digdir/designsystemet-react';
import {PersonIcon, PersonChatIcon, PaperplaneIcon} from '@navikt/aksel-icons';
import {createElement} from 'react';
import type {FC} from 'react';
import cn from 'classnames';
import styles from './style.module.css';

import type {Citation} from '@packages/data-access/react-query/hooks';

export type Message = string | ComponentNode;
export type Sender = 'ai' | 'user';

export interface ComponentNode {
  component: keyof typeof DesignSystem;
  props?: {[key: string]: any};
  children?: (ComponentNode | string)[];
}

export interface ChatMessageProps {
  id?: string;
  message: Message;
  sender: Sender;
  avatar?: React.ReactNode;
  pending?: boolean;
  citations?: Citation[];
}

export const createChatMessage = (
  message: Message,
  sender: Sender,
  citations?: Citation[],
): ChatMessageProps => {
  return {
    id: Date.now().toString(),
    message: message,
    sender: sender,
    avatar: sender === 'ai' ? <PersonIcon /> : <PaperplaneIcon />,
    citations: citations,
  };
};

const DynamicRenderer: FC<{node: ComponentNode}> = ({node}) => {
  if (!node || typeof node !== 'object' || !node.component) {
    return null;
  }
  const Component = DesignSystem[node.component];
  if (!Component) {
    return <div>Error: Component &apos;{node.component}&apos; not found.</div>;
  }
  return createElement(
    Component as any,
    node.props,
    node.children?.map((child, index) =>
      typeof child === 'string' ? (
        child
      ) : (
        <DynamicRenderer
          key={index}
          node={child}
        />
      ),
    ),
  );
};

const ChatAvatar = ({sender}: Partial<ChatMessageProps>) => {
  return (
    <Avatar
      aria-label={sender === 'user' ? 'User' : 'AI Assistant'}
      className={sender === 'user' ? styles.userAvatar : styles.aiAvatar}
    >
      {sender === 'user' ? (
        <PersonIcon title="User icon" />
      ) : (
        <PersonChatIcon title="AI Assistant icon" />
      )}
    </Avatar>
  );
};

export const ChatMessage = ({
  id,
  message,
  sender,
  pending = false,
  citations,
}: ChatMessageProps) => {
  return (
    <div
      key={id}
      className={cn(
        styles.message,
        sender === 'user' ? styles.userMessage : styles.aiMessage,
        pending && styles.pendingMessage,
      )}
    >
      <ChatAvatar sender={sender} />
      <div
        className={
          sender === 'ai' ? styles.aiMessageBubble : styles.userMessageBubble
        }
      >
        {typeof message === 'string' ? (
          <Paragraph>{message}</Paragraph>
        ) : (
          <DynamicRenderer node={message} />
        )}

        {citations && citations.length > 0 && (
          <div className={styles.citationsContainer}>
            <p className={styles.citationsTitle}>Kilder:</p>
            <ul className={styles.citationsList}>
              {citations.map((citation, idx) => (
                <li
                  key={idx}
                  className={styles.citationItem}
                >
                  <span className={styles.citationDocType}>
                    {citation.type}:{' '}
                  </span>
                  {citation.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

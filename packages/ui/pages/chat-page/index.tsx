import {useEffect, useRef, useState} from 'react';
import type {ChangeEvent, KeyboardEvent} from 'react';
import cn from 'classnames';
import {Button, Input, Switch} from '@digdir/designsystemet-react';
import {PaperplaneIcon} from '@navikt/aksel-icons';
import {
  type IApiResponse,
  useChatMutation,
} from '@packages/data-access/react-query/hooks';
import {
  ChatMessage,
  createChatMessage,
} from '../../components/chat-message/index.tsx';
import type {ChatMessageProps} from '../../components/chat-message/index.tsx';
import {QueryProvider} from '@packages/data-access/react-query/provider';
import styles from './style.module.css';
type Structure = 'structured' | 'unstructured';

interface IChatPageProps {
  assistantApiUrl: string;
}

export function ChatPageContent({assistantApiUrl}: IChatPageProps) {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    createChatMessage('Hei! Hvordan kan jeg hjelpe deg i dag?', 'ai'),
  ]);
  const [input, setInput] = useState<string>('');
  const [structure, setStructure] = useState<Structure>('unstructured');
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const mutation = useChatMutation();

  const handleSendMessage = (): void => {
    if (!input.trim()) return;

    submitMessage(input);
  };

  const submitMessage = (msgText: string): void => {
    const userMessage: ChatMessageProps = createChatMessage(msgText, 'user');
    setMessages((prev) => [...prev, userMessage]);

    mutation.mutate(
      {question: msgText, structure, assistantApiUrl, sessionId},
      {
        onSuccess: (data: IApiResponse) => {
          if (data.session_id) {
            setSessionId(data.session_id);
          }
          const aiMessage: ChatMessageProps = createChatMessage(
            data.response,
            'ai',
            data.citations,
          );
          setMessages((prev) => [...prev, aiMessage]);
        },
        onError: (error: Error) => {
          console.error('Failed to fetch response:', error);
          const errorMessage: ChatMessageProps = createChatMessage(
            error.message || 'Beklager, jeg støtte på en feil. Vennligst prøv igjen.',
            'ai',
          );
          setMessages((prev) => [...prev, errorMessage]);
        },
      },
    );
    setInput('');
  };

  return (
    <div className={styles.pageLayout}>
      <div className={styles.pageContainer}>
        <section className={cn(styles.baseContainer, styles.chatContainer)}>
          <div className={styles.messageList}>
            {messages.map((chatMessage) => (
              <ChatMessage
                key={chatMessage.id}
                id={chatMessage.id}
                message={chatMessage.message}
                sender={chatMessage.sender}
                citations={chatMessage.citations}
              />
            ))}
            {mutation.isPending && (
              <ChatMessage
                message="Tenker..."
                sender="ai"
                pending
              />
            )}
            <div ref={chatEndRef} />
          </div>
        </section>

        <section className={cn(styles.baseContainer, styles.inputContainer)}>
          <Input
            aria-label="input"
            name="inputs"
            type="text"
            placeholder="Spør meg om noe ..."
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Enter' && handleSendMessage()
            }
            disabled={mutation.isPending}
          />
          <Button
            icon
            aria-label="Send message"
            onClick={handleSendMessage}
            disabled={mutation.isPending}
          >
            <PaperplaneIcon aria-hidden />
          </Button>
        </section>

        <section className={cn(styles.baseContainer, styles.profileContainer)}>
          <span className={styles.contolItemsContainer}>
            <Switch
              label="Styled Response"
              checked={structure === 'structured'}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStructure(e.target.checked ? 'structured' : 'unstructured')
              }
              data-size="sm"
            />
          </span>
        </section>
      </div>
    </div>
  );
}

export function ChatPage({assistantApiUrl}: IChatPageProps) {
  return (
    <QueryProvider>
      <ChatPageContent assistantApiUrl={assistantApiUrl} />
    </QueryProvider>
  );
}

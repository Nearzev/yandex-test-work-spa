import './PrivatePage.css';

import { ChangeEvent, FormEvent, useState } from 'react';

const PrivatePage = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Отправка данных:', name, email, message);
    };

    return (
        <>
            <div className="source-container">
                <div className="video-section">
                    {/* Ваше видео */}
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/ВАШ_КОД_ВИДЕО"
                        title="Ваше видео"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="repository-link">
                    {/* Ссылка на ваш репозиторий */}
                    <a
                        href="ССЫЛКА_НА_ВАШ_РЕПОЗИТОРИЙ"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Публичный репозиторий с исходниками
                    </a>
                </div>
            </div>
            <div className="feedback-form">
                <h2>Обратная связь</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Ваше имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label htmlFor="message">Сообщение</label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setMessage(e.target.value)
                        }
                        rows={4}
                        required
                    />

                    <button type="submit">Отправить</button>
                </form>
            </div>
        </>
    );
};

export default PrivatePage;

import React from 'react';
import { FaReddit, FaTelegram } from 'react-icons/fa';

const FollowUs = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {/* Reddit */}
      <a
        href="https://www.reddit.com/r/GameGrasper" // Replace with your actual subreddit URL
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Reddit"
        style={{ color: '#FF4500' }}
      >
        <FaReddit size={30} />
      </a>

      {/* Telegram */}
      <a
        href="https://t.me/Gamegrasper" // Replace with your actual Telegram channel URL
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Telegram"
        style={{ color: '#0088cc' }}
      >
        <FaTelegram size={30} />
      </a>
    </div>
  );
};

export default FollowUs;

import React from 'react';
import { FaFacebook, FaReddit, FaTwitter, FaLinkedin } from 'react-icons/fa';

const SocialShare = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        style={{ color: '#1877F2' }}
      >
        <FaFacebook size={30} />
      </a>

      {/* Reddit */}
      <a
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Reddit"
        style={{ color: '#FF4500' }}
      >
        <FaReddit size={30} />
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"

      >
        <FaTwitter size={30} />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        style={{ color: '#0A66C2' }}
      >
        <FaLinkedin size={30} />
      </a>
    </div>
  );
};

export default SocialShare;

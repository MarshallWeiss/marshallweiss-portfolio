'use client';
import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
export default function GetInTouchButton() {
  const [status, setStatus] = useState('');
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('marshallweiss94@gmail.com');
      setStatus('Email copied.');
    } catch {
      setStatus('Couldn’t copy. You can select the email address below.');
    }
  }
  return (
    <div className="contact-actions">
      <a href="mailto:marshallweiss94@gmail.com" className="primary-button">
        Send me an email <ArrowUpRight size={19} aria-hidden="true" />
      </a>
      <button className="copy-email" onClick={copyEmail}>
        {status === 'Email copied.' ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}{' '}
        Copy email
      </button>
      <span role="status" className="copy-status">
        {status}
      </span>
    </div>
  );
}

import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * TagInput — type text, press Enter to add a chip. Click X to remove.
 */
const TagInput = ({ tags, onAdd, onRemove, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = input.trim();
            if (val && !tags.includes(val)) {
                onAdd(val);
            }
            setInput('');
        }
        if (e.key === 'Backspace' && !input && tags.length > 0) {
            onRemove(tags[tags.length - 1]);
        }
    };

    return (
        <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            padding: '6px 8px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            alignItems: 'center',
            backgroundColor: '#fff',
            minHeight: '38px',
            cursor: 'text'
        }}
            onClick={(e) => {
                const inp = e.currentTarget.querySelector('input');
                if (inp) inp.focus();
            }}
        >
            {tags.map(tag => (
                <span key={tag} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '100px',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: '1.2'
                }}>
                    {tag}
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(tag); }}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#999',
                            borderRadius: '0'
                        }}
                    >
                        <X size={12} />
                    </button>
                </span>
            ))}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? (placeholder || 'Type and press Enter') : ''}
                style={{
                    border: 'none',
                    outline: 'none',
                    flex: 1,
                    minWidth: '80px',
                    padding: '2px 0',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: 'transparent'
                }}
            />
        </div>
    );
};

export default TagInput;

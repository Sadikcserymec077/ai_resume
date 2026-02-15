import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Check } from 'lucide-react';

const TEMPLATES = [
    { id: 'classic', label: 'Classic', desc: 'Serif, single-column, ruled' },
    { id: 'modern', label: 'Modern', desc: 'Two-column, colored sidebar' },
    { id: 'minimal', label: 'Minimal', desc: 'Clean, spacious, sans-serif' }
];

const COLORS = [
    { value: 'hsl(168, 60%, 40%)', label: 'Teal' },
    { value: 'hsl(220, 60%, 35%)', label: 'Navy' },
    { value: 'hsl(345, 60%, 35%)', label: 'Burgundy' },
    { value: 'hsl(150, 50%, 30%)', label: 'Forest' },
    { value: 'hsl(0, 0%, 25%)', label: 'Charcoal' }
];

/* Mini SVG layout sketch for each template */
const ClassicSketch = ({ color }) => (
    <svg width="100" height="68" viewBox="0 0 100 68" fill="none">
        <rect width="100" height="68" rx="2" fill="#fafafa" />
        {/* Name centered */}
        <rect x="28" y="6" width="44" height="5" rx="1" fill={color} />
        {/* Contact row */}
        <rect x="20" y="14" width="60" height="2" rx="1" fill="#ccc" />
        {/* Horizontal rule */}
        <line x1="10" y1="20" x2="90" y2="20" stroke="#ddd" strokeWidth="0.5" />
        {/* Section blocks */}
        <rect x="10" y="24" width="30" height="3" rx="1" fill={color} />
        <rect x="10" y="30" width="80" height="2" rx="1" fill="#ddd" />
        <rect x="10" y="34" width="72" height="2" rx="1" fill="#ddd" />
        <line x1="10" y1="40" x2="90" y2="40" stroke="#ddd" strokeWidth="0.5" />
        <rect x="10" y="44" width="26" height="3" rx="1" fill={color} />
        <rect x="10" y="50" width="80" height="2" rx="1" fill="#ddd" />
        <rect x="10" y="54" width="65" height="2" rx="1" fill="#ddd" />
        <rect x="10" y="58" width="75" height="2" rx="1" fill="#ddd" />
    </svg>
);

const ModernSketch = ({ color }) => (
    <svg width="100" height="68" viewBox="0 0 100 68" fill="none">
        <rect width="100" height="68" rx="2" fill="#fafafa" />
        {/* Sidebar */}
        <rect x="0" y="0" width="32" height="68" rx="2" fill={color} opacity="0.9" />
        {/* Sidebar content */}
        <rect x="5" y="8" width="22" height="3" rx="1" fill="#fff" opacity="0.9" />
        <rect x="5" y="14" width="18" height="2" rx="1" fill="#fff" opacity="0.5" />
        <rect x="5" y="18" width="20" height="2" rx="1" fill="#fff" opacity="0.5" />
        <rect x="5" y="26" width="16" height="2" rx="1" fill="#fff" opacity="0.7" />
        <rect x="5" y="31" width="22" height="2" rx="1" fill="#fff" opacity="0.4" />
        <rect x="5" y="35" width="18" height="2" rx="1" fill="#fff" opacity="0.4" />
        <rect x="5" y="39" width="20" height="2" rx="1" fill="#fff" opacity="0.4" />
        {/* Main content */}
        <rect x="38" y="8" width="50" height="5" rx="1" fill="#333" />
        <rect x="38" y="16" width="55" height="2" rx="1" fill="#ddd" />
        <rect x="38" y="20" width="48" height="2" rx="1" fill="#ddd" />
        <rect x="38" y="28" width="30" height="3" rx="1" fill={color} />
        <rect x="38" y="34" width="52" height="2" rx="1" fill="#ddd" />
        <rect x="38" y="38" width="46" height="2" rx="1" fill="#ddd" />
        <rect x="38" y="46" width="28" height="3" rx="1" fill={color} />
        <rect x="38" y="52" width="52" height="2" rx="1" fill="#ddd" />
        <rect x="38" y="56" width="42" height="2" rx="1" fill="#ddd" />
    </svg>
);

const MinimalSketch = ({ color }) => (
    <svg width="100" height="68" viewBox="0 0 100 68" fill="none">
        <rect width="100" height="68" rx="2" fill="#fafafa" />
        {/* Name centered */}
        <rect x="30" y="8" width="40" height="4" rx="1" fill="#333" />
        {/* Contact */}
        <rect x="24" y="15" width="52" height="2" rx="1" fill="#bbb" />
        {/* Spacious sections */}
        <rect x="14" y="24" width="22" height="2" rx="1" fill={color} opacity="0.7" />
        <rect x="14" y="29" width="72" height="2" rx="1" fill="#e5e5e5" />
        <rect x="14" y="33" width="60" height="2" rx="1" fill="#e5e5e5" />
        <rect x="14" y="42" width="20" height="2" rx="1" fill={color} opacity="0.7" />
        <rect x="14" y="47" width="72" height="2" rx="1" fill="#e5e5e5" />
        <rect x="14" y="51" width="55" height="2" rx="1" fill="#e5e5e5" />
        <rect x="14" y="58" width="18" height="2" rx="1" fill={color} opacity="0.7" />
        <rect x="14" y="63" width="65" height="2" rx="1" fill="#e5e5e5" />
    </svg>
);

const SKETCH_MAP = { classic: ClassicSketch, modern: ModernSketch, minimal: MinimalSketch };

const TemplateTabs = () => {
    const { template, setTemplate, accentColor, setAccentColor } = useResume();

    return (
        <div className="template-tabs" style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid var(--color-border)',
            padding: '20px 24px 16px'
        }}>
            {/* Template thumbnails */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
                {TEMPLATES.map(t => {
                    const isActive = template === t.id;
                    const Sketch = SKETCH_MAP[t.id];
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTemplate(t.id)}
                            style={{
                                position: 'relative',
                                width: '120px',
                                padding: '8px',
                                borderRadius: '8px',
                                border: isActive ? `2px solid hsl(220, 70%, 55%)` : '2px solid #e8e8e8',
                                backgroundColor: isActive ? '#f0f4ff' : '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            {/* Checkmark */}
                            {isActive && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    backgroundColor: 'hsl(220, 70%, 55%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Check size={12} color="#fff" strokeWidth={3} />
                                </div>
                            )}

                            <Sketch color={accentColor} />

                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: isActive ? 'hsl(220, 70%, 45%)' : 'var(--color-text)',
                                    fontFamily: 'var(--font-sans)',
                                    lineHeight: '1.2'
                                }}>
                                    {t.label}
                                </div>
                                <div style={{
                                    fontSize: '10px',
                                    color: '#999',
                                    fontFamily: 'var(--font-sans)',
                                    marginTop: '1px'
                                }}>
                                    {t.desc}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Color circles */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#999', fontFamily: 'var(--font-sans)', marginRight: '4px' }}>
                    Color
                </span>
                {COLORS.map(c => {
                    const isActive = accentColor === c.value;
                    return (
                        <button
                            key={c.value}
                            title={c.label}
                            onClick={() => setAccentColor(c.value)}
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: c.value,
                                border: isActive ? '3px solid hsl(220, 70%, 55%)' : '3px solid transparent',
                                outline: isActive ? 'none' : '1px solid #ddd',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {isActive && <Check size={12} color="#fff" strokeWidth={3} />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TemplateTabs;

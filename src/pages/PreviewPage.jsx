import React, { useState, useCallback } from 'react';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateTabs from '../components/resume/TemplateTabs';
import { useResume } from '../contexts/ResumeContext';
import { resumeToPlainText, getExportWarnings } from '../utils/resumeExport';
import { Printer, Copy, Check, AlertTriangle } from 'lucide-react';

const PreviewPage = () => {
    const { resumeData } = useResume();
    const [copied, setCopied] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [warningAction, setWarningAction] = useState(null);

    const warning = getExportWarnings(resumeData);

    const handlePrint = useCallback(() => {
        if (warning) {
            setWarningAction('print');
            setShowWarning(true);
            return;
        }
        window.print();
    }, [warning]);

    const handleCopy = useCallback(async () => {
        if (warning) {
            setWarningAction('copy');
            setShowWarning(true);
            return;
        }
        await doCopy();
    }, [resumeData, warning]);

    const doCopy = async () => {
        try {
            const text = resumeToPlainText(resumeData);
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            // Fallback
            const text = resumeToPlainText(resumeData);
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const proceedWithAction = () => {
        setShowWarning(false);
        if (warningAction === 'print') {
            window.print();
        } else if (warningAction === 'copy') {
            doCopy();
        }
        setWarningAction(null);
    };

    const dismissWarning = () => {
        setShowWarning(false);
        setWarningAction(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
            {/* Template Tabs */}
            <TemplateTabs />

            {/* Export Toolbar */}
            <div className="export-toolbar" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px 24px',
                backgroundColor: '#fff',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <button
                    onClick={handlePrint}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        fontSize: '13px',
                        fontWeight: '500',
                        fontFamily: 'var(--font-sans)',
                        backgroundColor: 'var(--color-text)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s ease'
                    }}
                >
                    <Printer size={16} />
                    Print / Save as PDF
                </button>

                <button
                    onClick={handleCopy}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        fontSize: '13px',
                        fontWeight: '500',
                        fontFamily: 'var(--font-sans)',
                        backgroundColor: '#fff',
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    {copied ? <Check size={16} style={{ color: '#2E7D32' }} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Resume as Text'}
                </button>
            </div>

            {/* Warning Banner */}
            {showWarning && (
                <div className="export-warning" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    padding: '12px 24px',
                    backgroundColor: '#FFF8E1',
                    borderBottom: '1px solid #FFE082'
                }}>
                    <AlertTriangle size={16} style={{ color: '#E65100', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: '#5D4037' }}>
                        {warning}
                    </span>
                    <button
                        onClick={proceedWithAction}
                        style={{
                            padding: '6px 16px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: 'var(--color-text)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-sans)'
                        }}
                    >
                        Continue Anyway
                    </button>
                    <button
                        onClick={dismissWarning}
                        style={{
                            padding: '6px 16px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: 'transparent',
                            color: '#666',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-sans)'
                        }}
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Full Preview */}
            <div className="preview-page" style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '64px',
                backgroundColor: 'var(--color-bg)',
                flex: 1
            }}>
                <ResumePreview />
            </div>
        </div>
    );
};

export default PreviewPage;

import React, { useState, useCallback } from 'react';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateTabs from '../components/resume/TemplateTabs';
import ATSScore from '../components/resume/ATSScore';
import { useResume } from '../contexts/ResumeContext';
import { resumeToPlainText, getExportWarnings } from '../utils/resumeExport';
import { Printer, Copy, Check, AlertTriangle, Download } from 'lucide-react';

const PreviewPage = () => {
    const { resumeData } = useResume();
    const [copied, setCopied] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [warningAction, setWarningAction] = useState(null);
    const [toast, setToast] = useState(null);

    const warning = getExportWarnings(resumeData);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handlePrint = useCallback(() => {
        if (warning) {
            setWarningAction('print');
            setShowWarning(true);
            return;
        }
        window.print();
    }, [warning]);

    const handleDownloadPDF = useCallback(() => {
        if (warning) {
            setWarningAction('pdf');
            setShowWarning(true);
            return;
        }
        window.print();
        showToast('PDF export ready! Check your downloads.');
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
        } else if (warningAction === 'pdf') {
            window.print();
            showToast('PDF export ready! Check your downloads.');
        }
        setWarningAction(null);
    };

    const dismissWarning = () => {
        setShowWarning(false);
        setWarningAction(null);
    };

    const btnBase = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        fontSize: '13px',
        fontWeight: '500',
        fontFamily: 'var(--font-sans)',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: 'none'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
            {/* Template + Color Picker */}
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
                <button onClick={handlePrint} style={{ ...btnBase, backgroundColor: 'var(--color-text)', color: '#fff' }}>
                    <Printer size={16} />
                    Print / Save as PDF
                </button>

                <button onClick={handleDownloadPDF} style={{ ...btnBase, backgroundColor: 'hsl(220, 70%, 55%)', color: '#fff' }}>
                    <Download size={16} />
                    Download PDF
                </button>

                <button onClick={handleCopy} style={{
                    ...btnBase,
                    backgroundColor: '#fff',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)'
                }}>
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
                    <span style={{ fontSize: '13px', color: '#5D4037' }}>{warning}</span>
                    <button onClick={proceedWithAction} style={{
                        padding: '6px 16px', fontSize: '12px', fontWeight: '600',
                        backgroundColor: 'var(--color-text)', color: '#fff',
                        border: 'none', borderRadius: '4px', cursor: 'pointer',
                        fontFamily: 'var(--font-sans)'
                    }}>Continue Anyway</button>
                    <button onClick={dismissWarning} style={{
                        padding: '6px 16px', fontSize: '12px', fontWeight: '500',
                        backgroundColor: 'transparent', color: '#666',
                        border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer',
                        fontFamily: 'var(--font-sans)'
                    }}>Dismiss</button>
                </div>
            )}

            {/* Toast notification */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <Check size={16} style={{ color: '#4caf50' }} />
                    {toast}
                </div>
            )}

            {/* Full Preview + ATS Score */}
            <div className="preview-page" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '32px',
                padding: '48px 32px',
                backgroundColor: 'var(--color-bg)',
                flex: 1,
                alignItems: 'flex-start',
                flexWrap: 'wrap'
            }}>
                <ResumePreview />
                <div className="no-print" style={{ width: '300px', flexShrink: 0 }}>
                    <ATSScore />
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;

/**
 * Template style definitions for Classic, Modern, Minimal.
 * Accepts accentColor for color customization.
 *
 * Modern template returns layout: 'two-column' — ResumePreview
 * must handle this by rendering a sidebar + main area.
 */

export const getTemplateStyles = (template, accentColor = 'hsl(168, 60%, 40%)') => {

    // ── Classic ──────────────────────────────────────
    if (template === 'classic') {
        return {
            layout: 'single',
            container: {
                fontFamily: "'Playfair Display', serif",
                color: '#000',
                backgroundColor: '#fff',
                padding: '40px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                minHeight: '800px',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.4'
            },
            header: {
                textAlign: 'center',
                marginBottom: '24px',
                borderBottom: `2px solid ${accentColor}`,
                paddingBottom: '16px'
            },
            name: {
                fontSize: '32px',
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                color: accentColor
            },
            contactRow: {
                fontSize: '12px',
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                flexWrap: 'wrap'
            },
            sectionTitle: {
                fontSize: '14px',
                textTransform: 'uppercase',
                borderBottom: `1px solid ${accentColor}`,
                marginTop: '24px',
                marginBottom: '8px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                color: accentColor
            },
            entryHeader: {
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '13px',
                fontWeight: 'bold'
            },
            entrySubtitle: {
                fontSize: '12px',
                fontStyle: 'italic',
                marginBottom: '4px'
            },
            bodyText: {
                fontSize: '12px'
            },
            pill: {
                display: 'inline-block',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: '500',
                borderRadius: '100px',
                border: `1px solid ${accentColor}40`,
                color: accentColor,
                backgroundColor: `${accentColor}10`,
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.4'
            }
        };
    }

    // ── Modern (two-column) ──────────────────────────
    if (template === 'modern') {
        return {
            layout: 'two-column',
            container: {
                fontFamily: "'Inter', sans-serif",
                color: '#000',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                minHeight: '800px',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.4',
                display: 'flex',
                overflow: 'hidden'
            },
            sidebar: {
                width: '240px',
                flexShrink: 0,
                backgroundColor: accentColor,
                color: '#fff',
                padding: '32px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            },
            sidebarName: {
                fontSize: '20px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '4px',
                wordBreak: 'break-word'
            },
            sidebarLabel: {
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '6px'
            },
            sidebarText: {
                fontSize: '12px',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: '1.5'
            },
            sidebarPill: {
                display: 'inline-block',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: '500',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.15)',
                lineHeight: '1.4'
            },
            main: {
                flex: 1,
                padding: '32px 28px'
            },
            header: {
                marginBottom: '20px'
            },
            name: {
                fontSize: '28px',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                color: '#1a1a1a',
                margin: 0
            },
            sectionTitle: {
                fontSize: '13px',
                textTransform: 'uppercase',
                borderBottom: `2px solid ${accentColor}`,
                marginTop: '22px',
                marginBottom: '8px',
                fontWeight: '600',
                letterSpacing: '2px',
                paddingBottom: '4px',
                color: accentColor
            },
            entryHeader: {
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '13px',
                fontWeight: 'bold'
            },
            entrySubtitle: {
                fontSize: '12px',
                fontStyle: 'italic',
                marginBottom: '4px'
            },
            bodyText: {
                fontSize: '12px'
            },
            pill: {
                display: 'inline-block',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: '500',
                borderRadius: '100px',
                border: `1px solid ${accentColor}40`,
                color: accentColor,
                backgroundColor: `${accentColor}10`,
                lineHeight: '1.4'
            }
        };
    }

    // ── Minimal ──────────────────────────────────────
    return {
        layout: 'single',
        container: {
            fontFamily: "'Inter', sans-serif",
            color: '#000',
            backgroundColor: '#fff',
            padding: '48px 56px',
            boxShadow: 'none',
            border: '1px solid #e0e0e0',
            minHeight: '800px',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.5'
        },
        header: {
            textAlign: 'center',
            paddingBottom: '8px',
            marginBottom: '8px'
        },
        name: {
            fontSize: '28px',
            textTransform: 'none',
            fontWeight: '600',
            letterSpacing: '0.05em',
            color: accentColor,
            margin: 0
        },
        contactRow: {
            fontSize: '11px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            color: '#555'
        },
        sectionTitle: {
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginTop: '20px',
            marginBottom: '6px',
            color: accentColor,
            fontWeight: '600',
            borderBottom: 'none'
        },
        entryHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            fontWeight: 'bold'
        },
        entrySubtitle: {
            fontSize: '12px',
            fontStyle: 'normal',
            color: '#666',
            marginBottom: '4px'
        },
        bodyText: {
            fontSize: '11px',
            color: '#333'
        },
        pill: {
            display: 'inline-block',
            padding: '2px 8px',
            fontSize: '10px',
            fontWeight: '500',
            borderRadius: '100px',
            border: '1px solid #ddd',
            color: '#555',
            backgroundColor: '#fafafa',
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.4'
        }
    };
};

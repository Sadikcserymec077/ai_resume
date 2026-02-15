/**
 * Template style definitions for Classic, Modern, Minimal.
 * Returns style objects for different parts of the resume.
 * All templates use black + white only — layout changes only.
 */

export const getTemplateStyles = (template) => {
    const base = {
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
            borderBottom: '1px solid #000',
            paddingBottom: '16px'
        },
        name: {
            fontSize: '32px',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            fontWeight: 'bold'
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
            borderBottom: '1px solid #000',
            marginTop: '24px',
            marginBottom: '8px',
            fontWeight: 'bold',
            letterSpacing: '1px'
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
        }
    };

    if (template === 'modern') {
        return {
            ...base,
            container: {
                ...base.container,
                fontFamily: "'Inter', sans-serif",
                padding: '48px 40px',
                borderLeft: '4px solid #000'
            },
            header: {
                ...base.header,
                textAlign: 'left',
                borderBottom: 'none',
                paddingBottom: '8px',
                marginBottom: '16px'
            },
            name: {
                ...base.name,
                fontSize: '36px',
                textTransform: 'none',
                letterSpacing: '-0.02em'
            },
            contactRow: {
                ...base.contactRow,
                justifyContent: 'flex-start'
            },
            sectionTitle: {
                ...base.sectionTitle,
                borderBottom: '2px solid #000',
                fontSize: '13px',
                letterSpacing: '2px',
                paddingBottom: '4px'
            }
        };
    }

    if (template === 'minimal') {
        return {
            ...base,
            container: {
                ...base.container,
                fontFamily: "'Inter', sans-serif",
                padding: '48px 56px',
                boxShadow: 'none',
                border: '1px solid #e0e0e0'
            },
            header: {
                ...base.header,
                textAlign: 'center',
                borderBottom: 'none',
                paddingBottom: '8px',
                marginBottom: '8px'
            },
            name: {
                ...base.name,
                fontSize: '28px',
                textTransform: 'none',
                fontWeight: '600',
                letterSpacing: '0.05em'
            },
            contactRow: {
                ...base.contactRow,
                fontSize: '11px',
                gap: '12px',
                color: '#555'
            },
            sectionTitle: {
                ...base.sectionTitle,
                borderBottom: 'none',
                fontSize: '11px',
                letterSpacing: '3px',
                marginTop: '20px',
                marginBottom: '6px',
                color: '#555'
            },
            entryHeader: {
                ...base.entryHeader,
                fontSize: '12px'
            },
            entrySubtitle: {
                ...base.entrySubtitle,
                fontStyle: 'normal',
                color: '#666'
            },
            bodyText: {
                ...base.bodyText,
                fontSize: '11px',
                color: '#333'
            }
        };
    }

    // Default: classic
    return base;
};

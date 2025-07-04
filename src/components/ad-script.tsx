'use client';

import Script from 'next/script';
import { cn } from '@/lib/utils';

interface AdScriptProps {
    adKey: string;
    format: 'iframe';
    height: number;
    width: number;
    className?: string;
}

export function AdScript({ adKey, format, height, width, className }: AdScriptProps) {
    const optionsId = `ad-options-${adKey}-${Math.random()}`;
    const scriptId = `ad-script-${adKey}-${Math.random()}`;
    
    return (
        <div className={cn("flex items-center justify-center", className)} style={{ width: `${width}px`, height: `${height}px` }}>
            <Script id={optionsId} strategy="afterInteractive">
                {`
                    atOptions = {
                        'key' : '${adKey}',
                        'format' : '${format}',
                        'height' : ${height},
                        'width' : ${width},
                        'params' : {}
                    };
                `}
            </Script>
            <Script id={scriptId} strategy="afterInteractive" src={`//unhealthyirreparable.com/${adKey}/invoke.js`} />
        </div>
    );
}

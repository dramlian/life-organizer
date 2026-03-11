'use client';

import { SkewLoader } from 'react-spinners';

export default function LoadingSpinner() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <SkewLoader color="#ffffff" size={30} />
        </div>
    );
}

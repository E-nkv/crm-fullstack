import { useState, useEffect } from 'react';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

interface Status {
    icon: JSX.Element | string;
    msg: string;
    color: string;
}

interface Response {
    ok: boolean;
    msg: string;
}

interface RequestStatusProps {
    isLoading: boolean;
    response: Response | null;
    isLoadingMsg : string
}

const RequestStatus = ({ isLoading, response, isLoadingMsg }: RequestStatusProps) => {
    const [status, setStatus] = useState<Status | null>(null);

    useEffect(() => {
        if (isLoading) {
            setStatus({ icon: <span className="inline-block h-5 w-5 border-4 border-t-transparent border-indigo-400 rounded-full animate-spin"></span>, msg: isLoadingMsg, color: 'text-indigo-400' });
        } else if (response) {
            if (response.ok) {
                setStatus({
                    icon: <CheckIcon />,
                    msg: response.msg,
                    color: 'text-green-500'
                });
            } else {
                setStatus({
                    icon: <Cross1Icon />,
                    msg: response.msg,
                    color: 'text-red-500'
                });
            }
        } else {
            setStatus(null);
        }
    }, [isLoading, response]);

    return (
        <div className={`inline-flex items-center ${status?.color}`}>
            {status?.icon && <span className="mr-2">{status.icon}</span>}
            {status?.msg && <span >{status.msg}</span>}
        </div>
    );
};

export default RequestStatus;
export type {Response}
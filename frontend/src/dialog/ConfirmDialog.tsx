import React from 'react';
import { BaseDialog } from './BaseDialog';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    children?: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    children,
}) => {
    return (
        <BaseDialog
            open={open}
            onCancel={onCancel}
            title={title}
            closeAnimationDuration={200}
        >
            <p>{message}</p>
            { children }
            <div className="flex justify-end gap-2 mt-4">
                <button
                    className="bg-rich_black-300 text-white border border-oxford_blue-200 rounded-md px-4 py-2 mr-2 hover:bg-oxford_blue-200 transition-colors"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="bg-rose-900 text-white rounded-md px-4 py-2 hover:bg-red-800 transition-colors"
                    type="submit"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
            </div>
        </BaseDialog>
    );
};

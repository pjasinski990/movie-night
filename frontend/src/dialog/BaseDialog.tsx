import React, { useEffect, useState } from "react";

interface BaseDialogProps {
    open: boolean;
    title: string;
    description?: string;
    children: React.ReactNode;
    onSubmit?: () => void;
    submitOnCtrlEnter?: boolean;
    closeOnEscape?: boolean;
    onCancel: () => void;
    closeAnimationDuration?: number;
}

export const BaseDialog: React.FC<BaseDialogProps> = ({
                                                          open,
                                                          onCancel,
                                                          title,
                                                          description,
                                                          children,
                                                          onSubmit,
                                                          submitOnCtrlEnter = false,
                                                          closeOnEscape = true,
                                                          closeAnimationDuration = 500,
                                                      }) => {
    const [visibleTitle, setVisibleTitle] = useState<string | undefined>(title);
    const [visibleDescription, setVisibleDescription] = useState<string | undefined>(description);
    const [visibleChildren, setVisibleChildren] = useState<React.ReactNode>(children);

    useEffect(() => {
        if (open) {
            setVisibleTitle(title);
            setVisibleDescription(description);
            setVisibleChildren(children);
        } else {
            const timer = setTimeout(() => {
                setVisibleTitle(undefined);
                setVisibleDescription(undefined);
                setVisibleChildren(null);
            }, closeAnimationDuration);
            return () => clearTimeout(timer);
        }
    }, [open, description, children, closeAnimationDuration, title]);

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if (submitOnCtrlEnter && event.ctrlKey && event.key === "Enter") {
                event.preventDefault();
                if (onSubmit) onSubmit();
            } else if (closeOnEscape && event.key === "Escape") {
                event.preventDefault();
                onCancel();
            }
        };

        if (open) {
            document.addEventListener("keydown", handleGlobalKeyDown);
        } else {
            document.removeEventListener("keydown", handleGlobalKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, [open, submitOnCtrlEnter, closeOnEscape, onSubmit, onCancel]);

    if (!visibleDescription && !visibleChildren) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center"
        >
            <div
                className={`bg-oxford_blue rounded-md shadow-lg p-6 w-full max-w-md transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    transitionDuration: `${closeAnimationDuration}ms`,
                }}
            >
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">{visibleTitle}</h2>
                </div>
                {visibleDescription && (
                    <p className="text-sm text-gray-600 mb-4">{visibleDescription}</p>
                )}
                <div>{visibleChildren}</div>
            </div>
        </div>
    );
};
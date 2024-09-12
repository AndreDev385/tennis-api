import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: React.PropsWithChildren) {
	const elRef = useRef<HTMLDivElement | null>(null);
	if (!elRef.current) {
		elRef.current = document.createElement("div");
	}

	useEffect(() => {
		const modalRoot = document.getElementById("modal-portal");
		modalRoot?.appendChild(elRef.current!);

		return () => {
			modalRoot!.removeChild(elRef.current as Node);
		};
	}, []);

	return createPortal(<div>{children}</div>, elRef.current);
}

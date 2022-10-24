import {ButtonHTMLAttributes, forwardRef, PropsWithChildren, Ref} from 'react';

type Props = {};
type NativeAttrs = Omit<ButtonHTMLAttributes<any>, keyof Props>;
export type ButtonProps = Props & NativeAttrs;

export const Button = forwardRef<
	HTMLButtonElement,
	PropsWithChildren<ButtonProps>
>((btnProps: ButtonProps, ref?: Ref<HTMLButtonElement>): JSX.Element => {
	const {children, className, ...props} = btnProps;
	return (
		<button
			ref={ref}
			type='button'
			className={`flex h-fit w-fit items-center justify-center rounded-xl px-4 py-2 transition hover:scale-[0.96] hover:bg-dark-gray hover:text-cream hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-lg disabled:hover:scale-100 bg-white text-slate-700 font-medium ${className}`}
			{...props}
		>
			{children}
		</button>
	);
});

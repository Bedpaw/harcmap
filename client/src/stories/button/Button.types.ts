export interface ButtonProps {
    variant: 'primary' | 'secondary';
    label: string;
    type: 'button' | 'submit' | 'reset';
    disabled: boolean;
}

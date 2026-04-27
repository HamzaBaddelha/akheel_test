type FieldLabelProps = {
  htmlFor: string;
  children: string;
};

export default function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground/80">
      {children}
    </label>
  );
}

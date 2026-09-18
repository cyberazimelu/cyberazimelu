type SectionHeadingProps = { label: string; title: string; description: string; id?: string; tone?: "light" | "dark" };

export function SectionHeading({ label, title, description, id, tone = "dark" }: SectionHeadingProps) {
  return <div className={`section-heading section-heading-${tone}`}><p className="eyebrow"><span className="eyebrow-line" /> {label}</p><h2 id={id}>{title}</h2><p className="section-description">{description}</p></div>;
}

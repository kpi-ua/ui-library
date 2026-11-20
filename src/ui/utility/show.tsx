interface ShowProps {
  children: React.ReactNode | (() => React.ReactNode);
  when: boolean | (() => boolean);
  fallback?: React.ReactNode;
}

export const Show = ({ children, when, fallback }: ShowProps) => {
  const condition = typeof when === 'function' ? when() : when;

  return condition ? (typeof children === 'function' ? children() : children) : fallback || null;
};

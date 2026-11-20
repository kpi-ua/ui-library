interface ShowProps {
  /** Content to render when `when` is truthy. A function is called only in that case, so it can defer expensive work. */
  children: React.ReactNode | (() => React.ReactNode);
  /** Condition to check. A function is called on every render. */
  when: boolean | (() => boolean);
  /** Content to render when `when` is falsy. Defaults to nothing. */
  fallback?: React.ReactNode;
}

/**
 * Conditionally renders `children`, or `fallback` otherwise.
 *
 * @example
 * <Show when={isLoggedIn} fallback={<LoginButton />}>
 *   {() => <Profile user={user} />}
 * </Show>
 */
export const Show = ({ children, when, fallback }: ShowProps) => {
  const condition = typeof when === 'function' ? when() : when;

  return condition ? (typeof children === 'function' ? children() : children) : fallback || null;
};

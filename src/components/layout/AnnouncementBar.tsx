interface AnnouncementBarProps {
  message?: string;
}

/**
 * Static for now. Once the announcements feature exists (milestone 5), this
 * gets replaced by a feature component that fetches active announcements
 * and hides itself entirely when there's nothing to show.
 */
export function AnnouncementBar({ message = 'Welcome to the AASTU Gibigubae website.' }: AnnouncementBarProps) {
  return (
    <div className="bg-accent py-1.5 text-center text-xs font-body text-primary-dark">
      {message}
    </div>
  );
}

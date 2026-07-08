const BookIllustration = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <circle cx="40" cy="40" r="40" fill="#4EC3C9" />
    <path d="M26 26h24a4 4 0 0 1 4 4v22l-8-4-8 4V26H26Z" fill="#FFD24C" />
    <path d="M26 26a4 4 0 0 0-4 4v22a4 4 0 0 0 4 4h12V26H26Z" fill="#F4B942" />
    <path d="M38 26h12a4 4 0 0 1 4 4v22l-8-4-8 4V26Z" fill="#FFE082" />
    <rect x="22" y="52" width="32" height="4" rx="2" fill="#E6A93B" />
  </svg>
)

interface NoDataProps {
  message: string
}

export const NoData = ({ message }: NoDataProps) => (
  <div className="flex flex-col items-center gap-3 py-24">
    <BookIllustration />
    <p className="text-caption text-text-secondary">{message}</p>
  </div>
)

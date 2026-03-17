import Image from "next/image";
import Link from "next/link";

function BackArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 5 7.5 10l5 5M8 10h6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PasskeyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.25 10.25a3.75 3.75 0 10-2.39 3.49l1.39 1.39h1.5v-1.5h1.5v-1.5h1.5l1.25-1.25-2.88-2.88-1.87 1.87z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="8" fill="currentColor" r="1.1" />
    </svg>
  );
}

export default function AccountLoginPage() {
  return (
    <div className="-mb-20 min-h-[calc(100vh-7rem)] bg-[var(--canvas)]">
      <div className="grid min-h-[calc(100vh-7rem)] lg:grid-cols-2">
        <section className="relative min-h-[420px] overflow-hidden bg-[#2d1812]">
          <Image
            alt="RetailNext membership community"
            className="object-cover"
            fill
            priority
            sizes="50vw"
            src="https://images.lululemon.com/is/image/lululemon/NA_Feb26_Wk1_M_Pants_AllFranchise_Alpine_2_3Up_FeatureContentCard_MensCasualPants?wid=2644&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(152,109,54,0.42),transparent_28%),linear-gradient(180deg,rgba(20,14,12,0.08)_0%,rgba(16,11,10,0.62)_100%)]" />

          <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
            <Link
              aria-label="Back to home"
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--ink)] transition-transform hover:scale-[1.02]"
              href="/"
            >
              <BackArrowIcon />
            </Link>

            <div className="max-w-[30rem] text-white">
              <p className="meta-kicker !text-white/80">Membership</p>
              <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.06em] md:text-7xl">
                Membership you can feel.
              </h1>
              <p className="mt-6 max-w-md text-base leading-8 text-white/84 md:text-lg">
                Sign in to track orders, save your favorites, and pick up right
                where you left off.
              </p>
              <Link
                className="mt-8 inline-flex items-center gap-3 text-base font-semibold text-white underline underline-offset-4"
                href="/"
              >
                Explore what&apos;s new
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="flex items-center bg-[var(--surface-solid)] px-6 py-14 md:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-[31rem]">
            <p className="meta-kicker">Account</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-[2.85rem]">
              Sign in or create an account
            </h2>
            <div className="mt-5 h-1 w-8 rounded-full bg-[var(--accent)]" />

            <form className="mt-10 space-y-6">
              <label className="block">
                <span className="mb-3 block text-base font-medium">Email address</span>
                <input
                  className="w-full rounded-[1rem] border border-[var(--ink)]/18 bg-white px-5 py-4 outline-none transition-colors focus:border-[var(--accent)]"
                  placeholder="name@email.com"
                  type="email"
                />
              </label>

              <button className="w-full rounded-[0.95rem] bg-[var(--accent)] px-5 py-4 text-base font-semibold tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent-strong)]">
                CONTINUE
              </button>

              <div className="flex items-center gap-4 text-sm uppercase tracking-[0.16em] text-[var(--muted)]">
                <span className="h-px flex-1 bg-[var(--border)]" />
                <span>Or</span>
                <span className="h-px flex-1 bg-[var(--border)]" />
              </div>

              <button
                className="inline-flex w-full items-center justify-center gap-3 rounded-[0.95rem] border border-[var(--ink)]/20 bg-white px-5 py-4 text-base font-semibold tracking-[0.12em] text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
                type="button"
              >
                <PasskeyIcon />
                USE A PASSKEY
              </button>
            </form>

            <button
              className="mt-6 inline-flex text-base text-[var(--ink)] underline underline-offset-4"
              type="button"
            >
              What is a passkey?
            </button>

            <p className="mt-8 max-w-md text-sm leading-7 text-[var(--muted)]">
              By signing in or creating an account, you agree to the Terms of
              Use and acknowledge the Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
